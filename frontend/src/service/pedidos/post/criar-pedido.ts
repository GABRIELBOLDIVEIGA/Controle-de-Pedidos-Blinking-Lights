import kmbApi from "@/lib/axios/useKmbApi";
import { PostPedido } from "./post-pedido.schema";
import { PedidoValidator } from "@/utils/validators/Pedido";

export async function postPedido(
  orcamento: PostPedido,
): Promise<PedidoValidator> {
  const { data } = await kmbApi.post<PedidoValidator>("/pedido", orcamento);

  return data;
}
