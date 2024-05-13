import { usePedidosDoUsuarioQuery } from "@/hooks/queries/pedido/usePedidosDoUsuarioQuery";
import { useQuery } from "@tanstack/react-query";
import { PedidoTable } from "../pedido-table";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
// import { calculaTotalDoPedido } from "@/utils/helpers/calculosProduto/calculaTotalDoPedido";
import { totalDoPedidoV2 } from "@/utils/helpers/calculosProduto/v2/total-pedido-v2";

export const usePedidosDoUsuarioTable = () => {
  const { pedidosDoUsuarioQuery } = usePedidosDoUsuarioQuery();

  const pedidosDoUsuarioTable = useQuery({
    queryKey: ["pedidos-do-usuario-table", pedidosDoUsuarioQuery.data],
    queryFn: async (): Promise<PedidoTable[]> => {
      const pedidos_table: PedidoTable[] = [];

      pedidosDoUsuarioQuery.data?.forEach((pedido) => {
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
          // total: currencyFormt(calculaTotalDoPedido(pedido.produtos)),
        });
      });

      return pedidos_table;
    },
    enabled: !!pedidosDoUsuarioQuery.data,
  });

  return { pedidosDoUsuarioTable };
};
