import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CriarProdutoFormType,
  criarProdutoFormSchema,
} from "./validator/cadastrarProduto";
import { StatusResponse } from "@/lib/axios/statusResponse";
import { useState } from "react";
import { errorHandler } from "@/lib/axios/axiosErrorHandler";
import { useCriarProdutoMutation } from "@/hooks/mutations/produto/admin/useCriarProdutoMutation";
import { queryClient } from "@/lib/react-query/queryClient";

export const useFormCriarProduto = () => {
  const form = useForm<CriarProdutoFormType>({
    resolver: zodResolver(criarProdutoFormSchema),
    defaultValues: {
      promocao_ativa: false,
      ativo: false,
      favorito: false,
    },
  });
  const [statusResponse, setStatusResponse] = useState<StatusResponse>(null);
  const { mutate, isPending } = useCriarProdutoMutation();

  const submit = (data: CriarProdutoFormType) => {
    mutate(data, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === "todos-produtos-admin-query",
        }),
          setStatusResponse({
            isSuccess: true,
            title: "Produto cadastrado com sucesso.",
            description: `O produto ${data.descricao} foi cadastrado com sucesso.`,
          });
      },
      onError: (err) => {
        setStatusResponse(errorHandler(err));
      },
    });
  };

  const resetStatus = () => {
    setStatusResponse(null);
  };

  return { form, submit, resetStatus, statusResponse, isPending };
};
