import { SkeletonTable } from "@/components/SkeletonTable/SkeletonTable";
import { TabelaPedidosV2 } from "@/components/Tabelas/TabelaDePedidos/TabelaDePedidos";
import { columns } from "@/components/Tabelas/TabelaDePedidos/columns";
import { usePedidosDoUsuarioTable } from "@/hooks/queries/tables/pedidos/pedidos-do-usuario/usePedidosDoUsuario";

export const PedidosDoUsuario = () => {
  const { pedidosDoUsuarioTable } = usePedidosDoUsuarioTable();

  return (
    <section className="mb-10 h-full pt-6 mobile:w-screen mobile:overflow-x-scroll">
      {pedidosDoUsuarioTable.data ? (
        <TabelaPedidosV2 data={pedidosDoUsuarioTable.data} columns={columns} />
      ) : (
        <SkeletonTable />
      )}
    </section>
  );
};
