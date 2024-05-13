import { useQuery } from "@tanstack/react-query";
import { useTodosPedidosQuery } from "../../../pedido/admin/useTodosPedidosQuery";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
import { PedidoTable } from "../pedido-table";
import { totalDoPedidoV2 } from "@/utils/helpers/calculosProduto/v2/total-pedido-v2";

export const useTodosPedidosTable = () => {
  const { todosPedidosQuery } = useTodosPedidosQuery();

  const todosPedidosTable = useQuery({
    queryKey: ["pedidos-table", todosPedidosQuery.data],
    queryFn: async (): Promise<PedidoTable[]> => {
      const pedidos_table: PedidoTable[] = [];

      todosPedidosQuery.data?.forEach((pedido) => {
        pedidos_table.push({
          _id: pedido._id,
          codigo: pedido.codigo,
          cliente: pedido.cliente.nome,
          cnpj: pedido.cliente.documento,
          usuario: pedido.usuario.nome,
          etapa: pedido.etapa,
          observacoes: pedido.observacoes,
          createdAt: pedido.createdAt,
          utilizado_como_orcamento: pedido.utilizado_como_orcamento ?? false,
          total: currencyFormt(totalDoPedidoV2(pedido.produtos)),
        });
      });

      return pedidos_table;
    },
    enabled: !!todosPedidosQuery.data,
  });

  return { todosPedidosTable };
};
