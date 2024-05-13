import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StatusResponse } from "@/lib/axios/statusResponse";
import { useEffect, useState } from "react";
import { errorHandler } from "@/lib/axios/axiosErrorHandler";
import {
  EditarProdutoFormType,
  editarProdutoFormSchema,
} from "./validator/cadastrarProduto";
import { useEditarProdutoMutation } from "@/hooks/mutations/produto/admin/useEditarProdutoMutation";
import { useParams } from "react-router-dom";
import { useTodosProdutosQuery } from "@/hooks/queries/produto/admin/useTodosProdutos";
import { queryClient } from "@/lib/react-query/queryClient";
import { ProdutoValidator } from "@/utils/validators/Produto";
import { useUploadProdutoImageMutation } from "@/hooks/mutations/produto/admin/useUploadImageMutation";
import { Toaster, toast } from "sonner";

export const useFormEditarProduto = () => {
  const params = useParams<{ id: string }>();
  const form = useForm<EditarProdutoFormType>({
    resolver: zodResolver(editarProdutoFormSchema),
  });
  const { todosProdutosQuery } = useTodosProdutosQuery();

  useEffect(() => {
    const produto = todosProdutosQuery.data?.find(
      (produto) => produto._id === params.id,
    );
    if (produto) {
      form.setValue("codigo", produto.codigo);
      form.setValue("descricao", produto.descricao);
      form.setValue("preco", produto.preco);
      form.setValue("preco_promocional", produto.preco_promocional);
      form.setValue("ativo", produto.ativo);
      form.setValue("promocao_ativa", produto.promocao_ativa);
      form.setValue("favorito", produto.favorito);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todosProdutosQuery.data]);

  const [statusResponse, setStatusResponse] = useState<StatusResponse>(null);
  const { mutate, isPending } = useEditarProdutoMutation();

  const updater = (data: ProdutoValidator) => {
    const produtos_filtrados = todosProdutosQuery.data?.filter(
      (produto) => produto._id != params.id,
    );

    const prods: ProdutoValidator[] = produtos_filtrados
      ? produtos_filtrados
      : [];

    return [...prods, data];
  };

  const { uploadProdutoImageMutation } = useUploadProdutoImageMutation();

  const submit = (data: EditarProdutoFormType) => {
    if (!params.id) {
      setStatusResponse({
        isSuccess: true,
        title: "Erro ao receber ID do produto.",
        description: `Volte para a tabela e tente novamento.`,
      });
    } else {
      if (data.file) {
        uploadProdutoImageMutation.mutate(
          { id: params.id, file: data.file },
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

      mutate(
        { id: params.id, produto: data },
        {
          onSuccess: (data) => {
            queryClient.setQueryData(
              ["todos-produtos-admin-query"],
              updater(data),
            );
            setStatusResponse({
              isSuccess: true,
              title: "Produto atualizado com sucesso.",
              description: `O produto ${data.descricao} foi atualizado com sucesso.`,
            });
          },
          onError: (err) => {
            setStatusResponse(errorHandler(err));
          },
        },
      );
    }
  };

  const resetStatus = () => {
    setStatusResponse(null);
  };

  return { form, submit, resetStatus, statusResponse, isPending, Toaster };
};
