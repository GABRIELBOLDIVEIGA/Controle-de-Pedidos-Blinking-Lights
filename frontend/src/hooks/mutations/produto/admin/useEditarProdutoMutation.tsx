import { useKmbApi } from "@/lib/axios/useKmbApi";
import { EditarProdutoFormType } from "@/pages/Private/Produtos/admin/EditarProduto/form/validator/cadastrarProduto";
import { ProdutoValidator } from "@/utils/validators/Produto";
import { useMutation } from "@tanstack/react-query";

export const useEditarProdutoMutation = () => {
  const { kmbApi } = useKmbApi();

  const patchProduto = async ({
    id,
    produto,
  }: {
    id: string;
    produto: EditarProdutoFormType;
  }): Promise<ProdutoValidator> => {
    const { data } = await kmbApi.patch<ProdutoValidator>(
      `/produto/admin/update/${id}`,
      produto,
    );

    return data;
  };

  const { data, mutate, isPending } = useMutation({
    mutationKey: ["atualizar-produto"],
    mutationFn: patchProduto,
  });

  return { data, mutate, isPending };
};
