import { useKmbApi } from "@/lib/axios/useKmbApi";
import { PedidoValidator, pedidoSchema } from "@/utils/validators/Pedido";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const usePedidoDetalhadoQuery = () => {
  const params = useParams<{ id: string }>();
  const { kmbApi } = useKmbApi();

  const getDetalhePedido = async (): Promise<PedidoValidator> => {
    const { data } = await kmbApi.get<PedidoValidator>(`/pedido/${params.id}`);

    if (pedidoSchema.safeParse(data).success) {
      return data;
    } else {
      console.warn("[Data] => ", data);
      console.warn("[Error] => ", pedidoSchema.safeParse(data));
      throw new Error();
    }
  };

  const pedidoDetalhadoQuery = useQuery({
    queryKey: ["pedido-detalhes", params.id],
    queryFn: getDetalhePedido,
    enabled: !!params.id,
  });

  return { pedidoDetalhadoQuery };
};
