import { fetchTodosProdutos } from "@/service/produto/get/todos-produtos";
import { ProdutoValidator } from "@/utils/validators/Produto";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useProdutosQuery = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(25);
  const [filter, setFilter] = useState("");
  const [promocaoAtiva, setPromocaoAtiva] = useState<boolean | undefined>(
    undefined,
  );

  const produtosQuery = useQuery<ProdutoValidator[]>({
    queryKey: ["todos-produtos-query", page, limit, filter, promocaoAtiva],
    queryFn: () => fetchTodosProdutos(page, limit, filter, promocaoAtiva),
    placeholderData: keepPreviousData,
  });

  return {
    produtosQuery,
    page,
    setPage,
    limit,
    setLimit,
    filter,
    setFilter,
    promocaoAtiva,
    setPromocaoAtiva,
  };
};
