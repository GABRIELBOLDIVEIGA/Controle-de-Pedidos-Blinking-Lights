import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { fetchTodosUsuario } from "@/service/usuario/admin/get/todos-usuarios";
import { AuthContext } from "@/context/Auth/AuthContext";
import { permissaoSchema } from "@/utils/enums/Permicao";

export const useTodosUsuariosQuery = () => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);

  const todosUsuariosQuery = useQuery({
    queryKey: ["todos_usuario", page, limit],

    queryFn: () => fetchTodosUsuario({ page, limit }),
    placeholderData: keepPreviousData,
    enabled:
      user?.permissao === permissaoSchema.Enum.ADM ||
      user?.permissao === permissaoSchema.Enum.DEV,
  });

  return { todosUsuariosQuery, limit, setLimit, page, setPage };
};
