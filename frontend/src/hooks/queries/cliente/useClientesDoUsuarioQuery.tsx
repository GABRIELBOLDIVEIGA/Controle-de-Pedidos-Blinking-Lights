import { useContext, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchClientesByUsuarioID } from "@/service/cliente/get/clientes-by-usuario-id";
import { AuthContext } from "@/context/Auth/AuthContext";

export const useClientesDoUsuarioQuery = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1000);
  const { user } = useContext(AuthContext);

  const clientesDoUsuarioQuery = useQuery({
    queryKey: ["clientes_do_usuario", page, limit, user?.user_id],
    queryFn: () => fetchClientesByUsuarioID(page, limit),
    placeholderData: keepPreviousData,
  });

  return { clientesDoUsuarioQuery, limit, setLimit, page, setPage };
};
