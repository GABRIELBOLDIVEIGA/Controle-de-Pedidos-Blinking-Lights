import { AuthContext } from "@/context/Auth/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  EditarPerfilFormType,
  editarPerfilFormSchema,
} from "./validator/editarPerfil.schema";
import { StatusResponse } from "@/lib/axios/statusResponse";
import { errorHandler } from "@/lib/axios/axiosErrorHandler";
import { queryClient } from "@/lib/react-query/queryClient";
import { permissaoSchema } from "@/utils/enums/Permicao";
import { useUsuarioQuery } from "@/hooks/queries/usuario/useUsuarioQuery";
import { useEditarPerfilMutation } from "@/hooks/mutations/usuario/useEditarPerfilMutation";
import { useViaCepQuery } from "@/hooks/queries/via-cep/useViaCepQuery";
import { useUploadAvatarMutation } from "@/hooks/mutations/usuario/useUploadAvatarMutation";
import { Toaster, toast } from "sonner";

export const useFormEditarPerfil = () => {
  const [statusResponse, setStatusResponse] = useState<StatusResponse>(null);
  const { user } = useContext(AuthContext);
  const { editarPerfilMutation, setUsuarioID: setUsuarioIdMutation } =
    useEditarPerfilMutation();
  const { usuarioQuery, setUsuarioID: setUsuarioIdQuery } = useUsuarioQuery();
  const {
    data: viaCepData,
    isLoading: isLoadingCep,
    setCep,
  } = useViaCepQuery();

  const form = useForm<EditarPerfilFormType>({
    resolver: zodResolver(editarPerfilFormSchema),
  });

  useEffect(() => {
    if (user) {
      setUsuarioIdQuery(user.user_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (usuarioQuery.data) {
      form.setValue("nome", usuarioQuery.data.nome);
      form.setValue("email", usuarioQuery.data.email);
      form.setValue("documento", usuarioQuery.data.documento);
      form.setValue("razao_social", usuarioQuery.data.razao_social);
      form.setValue("telefone", usuarioQuery.data.telefone);

      form.setValue("endereco.cep", usuarioQuery.data.endereco.cep);
      form.setValue("endereco.bairro", usuarioQuery.data.endereco.bairro);
      form.setValue(
        "endereco.complemento",
        usuarioQuery.data.endereco.complemento,
      );
      form.setValue(
        "endereco.localidade",
        usuarioQuery.data.endereco.localidade,
      );
      form.setValue(
        "endereco.logradouro",
        usuarioQuery.data.endereco.logradouro,
      );
      form.setValue("endereco.numero", usuarioQuery.data.endereco.numero);
      form.setValue("endereco.uf", usuarioQuery.data.endereco.uf);
      setUsuarioIdMutation(usuarioQuery.data._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioQuery.data]);

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

      setUsuarioIdMutation(usuarioQuery.data._id);
    }
  };

  const { uploadAvatarMutation } = useUploadAvatarMutation();
  const submit = (data: EditarPerfilFormType) => {
    if (data.file && user) {
      uploadAvatarMutation.mutate(
        { id: user.user_id, file: data.file },
        {
          onSuccess: () => {
            toast.success(
              "Imagens podem demorar um pouco para serem atualizadas.",
              { duration: 3000 },
            );
          },
          onError: (error) => {
            toast.error(`Erro ao atualizar imagem. ${error.message}`, {
              duration: 6000,
            });
          },
        },
      );
    }
    if (user)
      editarPerfilMutation.mutate(
        { id: user.user_id, ...data },
        {
          onSuccess: () => {
            if (user.permissao === permissaoSchema.Enum.ADM) {
              queryClient.invalidateQueries({
                predicate: (query) =>
                  query.queryKey[0] === "todos_usuario" ||
                  query.queryKey[0] === "usuario",
              });
            } else {
              queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "usuario",
              });
            }
            setStatusResponse({
              isSuccess: true,
              title: "Dados do usuário atualizados com sucesso.",
              description: "",
            });
          },
          onError: (error) => {
            setStatusResponse(errorHandler(error));
          },
        },
      );
  };

  const resetStatus = () => {
    setStatusResponse(null);
  };

  return {
    form,
    submit,
    resetStatus,
    statusResponse,
    reset,
    fetchCEP,
    isLoadingCep,
    editarPerfilMutation,
    user,
    Toaster,
  };
};
