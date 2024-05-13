import kmbApi from "@/lib/axios/useKmbApi";
import { PedidoValidator, pedidoSchema } from "@/utils/validators/Pedido";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

export const useTodosOrcamentosQuery = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1000);

  const fetchTodosOrcamentos = async (page: number, limit: number) => {
    const { data } = await kmbApi.get<PedidoValidator[]>(
      `/pedido/admin?etapa=ORCAMENTO&page=${page}&limit=${limit}`,
    );

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
  };

  const query = useQuery({
    queryKey: ["todos-orcamentos", page, limit],
    queryFn: () => fetchTodosOrcamentos(page, limit),
    placeholderData: keepPreviousData,
  });

  return { ...query, limit, setLimit, page, setPage };
};
