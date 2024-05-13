import { StatusResponse } from "@/lib/axios/statusResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  EditarUsuarioFormType,
  editarUsuarioFormSchema,
} from "./validator/editarUsuario.schema";
import { errorHandler } from "@/lib/axios/axiosErrorHandler";
import { queryClient } from "@/lib/react-query/queryClient.tsx";
import { useUsuarioQuery } from "@/hooks/queries/usuario/useUsuarioQuery";
import { useEditarUsuarioMutation } from "@/hooks/mutations/usuario/admin/useEditarUsuarioMutation";
import { useViaCepQuery } from "@/hooks/queries/via-cep/useViaCepQuery";

export const useFormEditarUsuario = () => {
  const [statusResponse, setStatusResponse] = useState<StatusResponse>(null);
  const params = useParams<{ id: string }>();
  const form = useForm<EditarUsuarioFormType>({
    resolver: zodResolver(editarUsuarioFormSchema),
  });
  const { usuarioQuery, setUsuarioID: setUsuarioIdQuery } = useUsuarioQuery();

  const { editarUsuarioMutation, setUsuarioID: setUsuarioIdMutation } =
    useEditarUsuarioMutation();
  const {
    data: viaCepData,
    isLoading: isLoadingCep,
    setCep,
  } = useViaCepQuery();

  useEffect(() => {
    if (params.id) {
      form.setValue("id", params.id);
      setUsuarioIdQuery(params.id);
    }

    if (usuarioQuery.data) {
      form.setValue("nome", usuarioQuery.data.nome);
      form.setValue("email", usuarioQuery.data.email);
      form.setValue("documento", usuarioQuery.data.documento);
      form.setValue("razao_social", usuarioQuery.data.razao_social);
      form.setValue("telefone", usuarioQuery.data.telefone);
      form.setValue("observacoes", usuarioQuery.data.observacoes);
      form.setValue("endereco.cep", usuarioQuery.data.endereco.cep);
      form.setValue(
        "endereco.logradouro",
        usuarioQuery.data.endereco.logradouro,
      );
      form.setValue(
        "endereco.localidade",
        usuarioQuery.data.endereco.localidade,
      );
      form.setValue("endereco.bairro", usuarioQuery.data.endereco.bairro);
      form.setValue("endereco.numero", usuarioQuery.data.endereco.numero);
      form.setValue("endereco.uf", usuarioQuery.data.endereco.uf);
      form.setValue(
        "endereco.complemento",
        usuarioQuery.data.endereco.complemento,
      );
      form.setValue("ativo", usuarioQuery.data.ativo);
      setUsuarioIdMutation(usuarioQuery.data._id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, usuarioQuery.data]);

  useEffect(() => {
    if (viaCepData) {
      form.setValue("endereco.logradouro", viaCepData.logradouro);
      form.setValue("endereco.localidade", viaCepData.localidade);
      form.setValue("endereco.bairro", viaCepData.bairro);
      form.setValue("endereco.uf", viaCepData.uf);
      form.setValue("endereco.complemento", viaCepData.complemento);
    }
  }, [viaCepData, form]);

  const fetchCEP = () => {
    const cep = form.getValues("endereco.cep");
    setCep(cep);
  };

  const reset = () => {
    if (usuarioQuery.data) {
      form.setValue("nome", usuarioQuery.data.nome);
      form.setValue("email", usuarioQuery.data.email);
      form.setValue("documento", usuarioQuery.data.documento);
      form.setValue("razao_social", usuarioQuery.data.razao_social);
      form.setValue("telefone", usuarioQuery.data.telefone);
      form.setValue("observacoes", usuarioQuery.data.observacoes);
      form.setValue("endereco.cep", usuarioQuery.data.endereco.cep);
      form.setValue(
        "endereco.logradouro",
        usuarioQuery.data.endereco.logradouro,
      );
      form.setValue(
        "endereco.localidade",
        usuarioQuery.data.endereco.localidade,
      );
      form.setValue("endereco.bairro", usuarioQuery.data.endereco.bairro);
      form.setValue("endereco.numero", usuarioQuery.data.endereco.numero);
      form.setValue("endereco.uf", usuarioQuery.data.endereco.uf);
      form.setValue(
        "endereco.complemento",
        usuarioQuery.data.endereco.complemento,
      );
      form.setValue("ativo", usuarioQuery.data.ativo);
      setUsuarioIdMutation(usuarioQuery.data._id);
    }
  };

  const submit = (data: EditarUsuarioFormType) => {
    editarUsuarioMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === "todos_usuario" ||
            query.queryKey[0] === "usuario",
        }),
          setStatusResponse({
            isSuccess: true,
            title: "Dados do usuário atualizados com sucesso.",
            description: "",
          });
      },
      onError: (error) => {
        setStatusResponse(errorHandler(error));
      },
    });
  };

  const resetStatus = () => {
    setStatusResponse(null);
  };

  return {
    editarUsuarioMutation,
    form,
    fetchCEP,
    isLoadingCep,
    resetStatus,
    submit,
    reset,
    statusResponse,
  };
};
