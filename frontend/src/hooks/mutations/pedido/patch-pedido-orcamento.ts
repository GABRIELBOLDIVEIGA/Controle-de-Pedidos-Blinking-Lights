import { DetathlesDoPedidoFormType } from "@/components/Editar-Pedido-Orcamento/EditarDetalhesForm/form/validator/detalhes";
import { useKmbApi } from "@/lib/axios/useKmbApi";
import { PedidoValidator } from "@/utils/validators/Pedido";
import { useMutation } from "@tanstack/react-query";

export function useEditarPedidoOrcamento() {
  const { kmbApi } = useKmbApi();

  async function patchPedidoOrcamento(
    form: DetathlesDoPedidoFormType,
  ): Promise<PedidoValidator> {
    const { data } = await kmbApi.patch<PedidoValidator>(
      `/pedido/editar/${form._id}`,
      form,
    );

    return data;
  }

  const editarPedidoOrcamento = useMutation({
    mutationKey: ["editar-pedido-orcamento"],
    mutationFn: patchPedidoOrcamento,
  });

  return { editarPedidoOrcamento };
}
