import { AuthContext } from "@/context/Auth/AuthContext";
import { getOrcamentosDoUsuario } from "@/service/pedidos/get/get-orcamentos-do-usuario";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export const useOrcamentosDoUsuarioQuery = () => {
  const { user } = useContext(AuthContext);

  const orcamentosDoUsuarioQuery = useQuery({
    queryKey: ["orcamentos-do-usuario", user],
    queryFn: () => getOrcamentosDoUsuario(user!.user_id),
    enabled: !!user,
  });

  return { orcamentosDoUsuarioQuery };
};
