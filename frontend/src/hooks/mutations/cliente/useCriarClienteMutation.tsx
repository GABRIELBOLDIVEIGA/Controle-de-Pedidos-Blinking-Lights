import { criarCliente } from "@/service/cliente/post/criar-cliente";
import { useMutation } from "@tanstack/react-query";

export const useCriarClienteMutation = () => {
  const { data, mutate, isPending } = useMutation({
    mutationKey: ["criar_cliente"],
    mutationFn: criarCliente,
  });

  return { data, mutate, isPending };
};
