import { useKmbApi } from "@/lib/axios/useKmbApi";
import { PedidoValidator } from "@/utils/validators/Pedido";
import { useMutation } from "@tanstack/react-query";

export function useDeletePedidoOrcamento() {
  const { kmbApi } = useKmbApi();

  const deletePedidoOrcamento = useMutation({
    mutationKey: ["delte-pedido-orcamento"],
    mutationFn: async (id: string): Promise<PedidoValidator> => {
      const { data } = await kmbApi.delete<PedidoValidator>(
        `/pedido/delete/${id}`,
      );

      return data;
    },
  });

  return { deletePedidoOrcamento };
}
