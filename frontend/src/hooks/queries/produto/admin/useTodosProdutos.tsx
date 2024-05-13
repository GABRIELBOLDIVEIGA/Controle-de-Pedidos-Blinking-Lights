import { useKmbApi } from "@/lib/axios/useKmbApi";
import { ProdutoValidator, produtoSchema } from "@/utils/validators/Produto";
import { useQuery } from "@tanstack/react-query";

export const useTodosProdutosQuery = () => {
  const { kmbApi } = useKmbApi();

  const fetchTodosProdutos = async (): Promise<ProdutoValidator[]> => {
    const { data } = await kmbApi.get<ProdutoValidator[]>(
      "/produto?limit=5000",
    );

    const filter = data.filter((produto) => {
      if (produtoSchema.safeParse(produto).success) {
        return true;
      } else {
        console.warn("[Error] => ", produtoSchema.safeParse(produto));
        return false;
      }
    });

    return filter;
  };

  const todosProdutosQuery = useQuery<ProdutoValidator[]>({
    queryKey: ["todos-produtos-admin-query"],
    queryFn: fetchTodosProdutos,
  });

  return { todosProdutosQuery };
};
