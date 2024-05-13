import { TabelaPedidosV2 } from "@/components/Tabelas/TabelaDePedidos/TabelaDePedidos";
import { SkeletonTable } from "@/components/SkeletonTable/SkeletonTable";
import { useTodosPedidosTable } from "@/hooks/queries/tables/pedidos/admin/useTodosPedidosTable";
import { columns } from "@/components/Tabelas/TabelaDePedidos/columns";

export const TodosPedidos = () => {
  const { todosPedidosTable } = useTodosPedidosTable();

  return (
    <section className="mb-10 h-full pt-6 mobile:w-screen mobile:overflow-x-scroll">
      {todosPedidosTable.data ? (
        <TabelaPedidosV2 data={todosPedidosTable.data} columns={columns} />
      ) : (
        <SkeletonTable />
      )}
    </section>
  );
};
