import { editarUsuario } from "@/service/usuario/patch/editar-usuario";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useEditarUsuarioMutation = () => {
  const [, setUsuarioID] = useState<string>();

  const editarUsuarioMutation = useMutation({
    mutationKey: ["editar_usuario_mutation"],
    mutationFn: editarUsuario,
  });

  return { editarUsuarioMutation, setUsuarioID };
};
