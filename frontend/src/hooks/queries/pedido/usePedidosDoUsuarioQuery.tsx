import { AuthContext } from "@/context/Auth/AuthContext";
import { getPedidosDoUsuario } from "@/service/pedidos/get/get-pedidos-do-usuario";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export const usePedidosDoUsuarioQuery = () => {
  const { user } = useContext(AuthContext);

  const pedidosDoUsuarioQuery = useQuery({
    queryKey: ["pedidos-do-usuario", user],
    queryFn: () => getPedidosDoUsuario(user!.user_id),
    enabled: !!user,
  });

  return { pedidosDoUsuarioQuery };
};
