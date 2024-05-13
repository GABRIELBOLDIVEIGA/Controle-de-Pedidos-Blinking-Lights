import { useQuery } from "@tanstack/react-query";
import { useTodosOrcamentosQuery } from "../../../orcamento/admin/useTodosOrcamentosQuery";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
// import { calculaTotalDoPedido } from "@/utils/helpers/calculosProduto/calculaTotalDoPedido";
import { OrcamentoTable } from "../orcamento-table";
import { totalDoPedidoV2 } from "@/utils/helpers/calculosProduto/v2/total-pedido-v2";

export const useTodosOrcamentosTable = () => {
  const { data } = useTodosOrcamentosQuery();

  const todosOrcamentosTable = useQuery({
    queryKey: ["todos-orcamentos-table", data],
    queryFn: async (): Promise<OrcamentoTable[]> => {
      const todos_orcamentos_table: OrcamentoTable[] = [];

      data?.forEach((pedido) => {
        todos_orcamentos_table.push({
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

      return todos_orcamentos_table;
    },
    enabled: !!data,
  });

  return { todosOrcamentosTable };
};
