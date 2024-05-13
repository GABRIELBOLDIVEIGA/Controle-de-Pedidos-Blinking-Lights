import { useQuery } from "@tanstack/react-query";

import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
// import { calculaTotalDoPedido } from "@/utils/helpers/calculosProduto/calculaTotalDoPedido";
import { useOrcamentosDoUsuarioQuery } from "./../../../orcamento/useOrcamentosDoUsuarioQuery";
import { OrcamentoTable } from "../orcamento-table";
import { totalDoPedidoV2 } from "@/utils/helpers/calculosProduto/v2/total-pedido-v2";

export const useOrcamentosDoUsuarioTable = () => {
  const { orcamentosDoUsuarioQuery } = useOrcamentosDoUsuarioQuery();

  const orcamentosDoUsuarioTable = useQuery({
    queryKey: ["orcamentos-do-usuario-table", orcamentosDoUsuarioQuery.data],
    queryFn: async (): Promise<OrcamentoTable[]> => {
      const orcamentos_do_usuario_table: OrcamentoTable[] = [];

      orcamentosDoUsuarioQuery.data?.forEach((pedido) => {
        orcamentos_do_usuario_table.push({
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

      return orcamentos_do_usuario_table;
    },
    enabled: !!orcamentosDoUsuarioQuery.data,
  });

  return { orcamentosDoUsuarioTable };
};
