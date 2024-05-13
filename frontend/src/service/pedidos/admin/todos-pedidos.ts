import kmbApi from "@/lib/axios/useKmbApi";
import { PedidoValidator, pedidoSchema } from "@/utils/validators/Pedido";

export async function getTodosPedidos(): Promise<PedidoValidator[]> {
  const { data } = await kmbApi.get<PedidoValidator[]>("/pedido/admin");

  const data_filtrada: PedidoValidator[] = [];

  data.forEach((pedido) => {
    if (pedidoSchema.safeParse(pedido).success) {
      data_filtrada.push(pedido);
    } else {
      console.warn("[Data] => ", pedido);
      console.warn("[Error] => ", pedidoSchema.safeParse(pedido));
    }
  });

  return data_filtrada;
}
