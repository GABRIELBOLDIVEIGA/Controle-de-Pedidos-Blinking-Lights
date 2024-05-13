import { criarProduto } from "@/service/produto/admin/post/criar-produto";
import { useMutation } from "@tanstack/react-query";

export const useCriarProdutoMutation = () => {
  const { data, mutate, isPending } = useMutation({
    mutationKey: ["criar_produto"],
    mutationFn: criarProduto,
  });

  return { data, mutate, isPending };
};
