import { useContext, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchTodosClientes } from "@/service/cliente/admin/get/todos-clientes";
import { AuthContext } from "@/context/Auth/AuthContext";
import { permissaoSchema } from "@/utils/enums/Permicao";

export const useTodosClientesQuery = () => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(15000);

  const todosClientesQuery = useQuery({
    queryKey: ["todos_clientes", page, limit],
    queryFn: () => fetchTodosClientes(page, limit),
    placeholderData: keepPreviousData,
    enabled:
      user?.permissao === permissaoSchema.Enum.ADM ||
      user?.permissao === permissaoSchema.Enum.DEV,
  });

  return { todosClientesQuery, limit, setLimit, page, setPage };
};
