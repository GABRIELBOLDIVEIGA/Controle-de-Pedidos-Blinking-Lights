import kmbApi from "@/lib/axios/useKmbApi";
import { PedidoValidator, pedidoSchema } from "@/utils/validators/Pedido";

export async function getOrcamentosDoUsuario(user_id: string | undefined) {
  const { data } = await kmbApi.get<PedidoValidator[]>(
    `/pedido/orcamentos_do_usuario/${user_id}`,
  );

  const data_filtrada: PedidoValidator[] = [];

  data.forEach((orcamento) => {
    if (pedidoSchema.safeParse(orcamento).success) {
      data_filtrada.push(orcamento);
    } else {
      console.warn("[Data] => ", orcamento);
      console.warn("[Error] => ", pedidoSchema.safeParse(orcamento));
    }
  });

  return data_filtrada;
}
