import { criarUsuario } from "@/service/usuario/admin/post/criar-usuario";
import { useMutation } from "@tanstack/react-query";

export const useCriarUsuarioMutation = () => {
  const { data, mutate, isPending } = useMutation({
    mutationKey: ["criar_usuario"],
    mutationFn: criarUsuario,
  });

  return { data, mutate, isPending };
};
