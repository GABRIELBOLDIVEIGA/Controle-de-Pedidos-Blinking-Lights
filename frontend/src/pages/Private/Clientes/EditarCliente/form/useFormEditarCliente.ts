import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  EditarClienteFormType,
  editarClienteFormSchema,
} from "./validator/editarCliente";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StatusResponse } from "@/lib/axios/statusResponse";
import { errorHandler } from "@/lib/axios/axiosErrorHandler";
import { AuthContext } from "@/context/Auth/AuthContext";
import { permissaoSchema } from "@/utils/enums/Permicao";
import { queryClient } from "@/lib/react-query/queryClient";
import { useEditarClienteMutation } from "@/hooks/mutations/cliente/useEditarClienteMutation";
import { useClientesDoUsuarioQuery } from "@/hooks/queries/cliente/useClientesDoUsuarioQuery";
import { useTodosClientesQuery } from "@/hooks/queries/cliente/admin/useTodosClientesQuery";
import { useViaCepQuery } from "@/hooks/queries/via-cep/useViaCepQuery";

export const useFormEditarCliente = () => {
  const { editarClienteMutation, setClienteID } = useEditarClienteMutation();
  const [statusResponse, setStatusResponse] = useState<StatusResponse>(null);
  const params = useParams<{ id: string }>();
  const { clientesDoUsuarioQuery } = useClientesDoUsuarioQuery();
  const { todosClientesQuery } = useTodosClientesQuery();
  const { user } = useContext(AuthContext);
  const form = useForm<EditarClienteFormType>({
    resolver: zodResolver(editarClienteFormSchema),
  });
  const { data, isLoading: isLoadingCep, setCep } = useViaCepQuery();

  useEffect(() => {
    if (data) {
      form.setValue("endereco.logradouro", data.logradouro);
      form.setValue("endereco.localidade", data.localidade);
      form.setValue("endereco.bairro", data.bairro);
      form.setValue("endereco.uf", data.uf);
      form.setValue("endereco.complemento", data.complemento);
    }
  }, [data, form]);

  const fetchCEP = () => {
    const cep = form.getValues("endereco.cep");
    setCep(cep);
  };

  useEffect(() => {
    let cliente = undefined;

    if (
      user?.permissao === permissaoSchema.enum.ADM ||
      user?.permissao === permissaoSchema.enum.DEV
    ) {
      cliente = todosClientesQuery.data?.find((cli) => cli._id === params.id);
    } else {
      cliente = clientesDoUsuarioQuery.data?.find(
        (cli) => cli._id === params.id,
      );
    }

    if (cliente) {
      form.setValue("usuario_responsavel", cliente.usuario_responsavel);
      form.setValue("nome", cliente.nome);
      form.setValue("email", cliente.email);
      form.setValue("documento", cliente.documento);
      form.setValue("inscricao_estadual", cliente.inscricao_estadual);
      form.setValue("razao_social", cliente.razao_social);
      form.setValue("observacoes", cliente.observacoes);
      form.setValue("endereco", cliente.endereco);
      form.setValue("telefone", cliente.telefone);
      form.setValue("_id", cliente._id);
      setClienteID(cliente._id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, clientesDoUsuarioQuery.data, todosClientesQuery.data]);

  const reset = () => {
    const cliente = clientesDoUsuarioQuery.data?.find(
      (cli) => cli._id === params.id,
    );

    if (cliente) {
      form.setValue("usuario_responsavel", cliente.usuario_responsavel);
      form.setValue("nome", cliente.nome);
      form.setValue("email", cliente.email);
      form.setValue("documento", cliente.documento);
      form.setValue("inscricao_estadual", cliente.inscricao_estadual);
      form.setValue("razao_social", cliente.razao_social);
      form.setValue("observacoes", cliente.observacoes);
      form.setValue("endereco", cliente.endereco);
      form.setValue("_id", cliente._id);
      setClienteID(cliente._id);
    }
  };

  // const updater = (data: ClienteValidator) => {
  //   const clientes_filtrados = todosClientesQuery.data?.filter(
  //     (cliente) => cliente._id != params.id,
  //   );

  //   const prods: ClienteValidator[] = clientes_filtrados
  //     ? clientes_filtrados
  //     : [];

  //   return [...prods, data];
  // };

  const submit = (data: EditarClienteFormType) => {
    editarClienteMutation.mutate(data, {
      onSuccess: () => {
        if (
          user?.permissao === permissaoSchema.Enum.ADM ||
          user?.permissao === permissaoSchema.Enum.DEV
        ) {
          queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey[0] === "todos_clientes" ||
              query.queryKey[0] === "clientes-table",
          });
        } else {
          queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === "clientes_do_usuario",
          });
        }

        setStatusResponse({
          isSuccess: true,
          title: "Dados do cliente atualizados com sucesso.",
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
    form,
    submit,
    fetchCEP,
    isLoadingCep,
    resetStatus,
    reset,
    statusResponse,
    editarClienteMutation,
  };
};
