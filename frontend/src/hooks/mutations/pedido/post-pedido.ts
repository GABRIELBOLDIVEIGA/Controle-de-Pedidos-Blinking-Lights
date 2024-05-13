import { postPedido } from "@/service/pedidos/post/criar-pedido";
import { useMutation } from "@tanstack/react-query";

export function useCriarPedido() {
  const criarPedido = useMutation({
    mutationKey: ["criar-pedido"],
    mutationFn: postPedido,
  });

  return { criarPedido };
}
