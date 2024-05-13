import { useKmbApi } from "@/lib/axios/useKmbApi";
import { useMutation } from "@tanstack/react-query";

export const useClonePedido = () => {
  const { kmbApi } = useKmbApi();

  const clonarPedidoOuOrcamento = useMutation({
    mutationKey: ["clonar-pedido-ou-orcamento"],
    mutationFn: async (id: string) => {
      const { data } = await kmbApi.post(`/pedido/clonar/${id}`);

      return data;
    },
  });

  return { clonarPedidoOuOrcamento, ...clonarPedidoOuOrcamento };
};
