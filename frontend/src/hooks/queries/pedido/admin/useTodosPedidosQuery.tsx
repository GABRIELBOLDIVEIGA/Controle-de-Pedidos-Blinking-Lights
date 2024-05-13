import { useKmbApi } from "@/lib/axios/useKmbApi";
import { PedidoValidator, pedidoSchema } from "@/utils/validators/Pedido";
import { useQuery } from "@tanstack/react-query";

export const useTodosPedidosQuery = () => {
  const { kmbApi } = useKmbApi();

  const getTodosPedidos = async (): Promise<PedidoValidator[]> => {
    const { data } = await kmbApi.get<PedidoValidator[]>("/pedido/admin");

    const filter = data.filter((pedido) => {
      if (pedidoSchema.safeParse(pedido).success) {
        return true;
      } else {
        console.warn("[Data] => ", pedido);
        console.warn("[Error] => ", pedidoSchema.safeParse(pedido));
        return false;
      }
    });

    return filter;
  };
  const todosPedidosQuery = useQuery({
    queryKey: ["todos-pedidos"],
    queryFn: getTodosPedidos,
  });

  return { todosPedidosQuery };
};
