import { editarUsuario } from "@/service/usuario/patch/editar-usuario";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useEditarPerfilMutation = () => {
  const [, setUsuarioID] = useState<string>();

  const editarPerfilMutation = useMutation({
    mutationKey: ["editar_perfil_mutation"],
    mutationFn: editarUsuario,
  });

  return { editarPerfilMutation, setUsuarioID };
};
