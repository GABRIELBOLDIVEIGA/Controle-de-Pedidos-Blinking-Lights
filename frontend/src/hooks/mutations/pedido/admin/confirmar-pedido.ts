import { DetathlesDoPedidoFormType } from "@/components/Editar-Pedido-Orcamento/EditarDetalhesForm/form/validator/detalhes";
import { useKmbApi } from "@/lib/axios/useKmbApi";
import { PedidoValidator } from "@/utils/validators/Pedido";
import { useMutation } from "@tanstack/react-query";

export function useConfirmarPedido() {
  const { kmbApi } = useKmbApi();

  async function patchConfirmarPedido(
    form: DetathlesDoPedidoFormType,
  ): Promise<PedidoValidator> {
    const { data } = await kmbApi.patch<PedidoValidator>(
      `/pedido/admin/confirmar/${form._id}`,
      form,
    );

    return data;
  }

  const confirmarPedido = useMutation({
    mutationKey: ["confirmar-pedido"],
    mutationFn: patchConfirmarPedido,
  });

  return { confirmarPedido };
}
