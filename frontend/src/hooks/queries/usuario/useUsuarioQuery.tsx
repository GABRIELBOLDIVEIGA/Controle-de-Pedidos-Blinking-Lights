import { fetchUsuarioByID } from "@/service/usuario/get/usuario-by-id";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useUsuarioQuery = () => {
  const [usuarioID, setUsuarioID] = useState<string | undefined>();

  const usuarioQuery = useQuery({
    queryKey: ["usuario", usuarioID],
    queryFn: () => fetchUsuarioByID(usuarioID),
    enabled: !!usuarioID,
  });

  return { usuarioQuery, setUsuarioID };
};
