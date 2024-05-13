import { SkeletonTable } from "@/components/SkeletonTable/SkeletonTable";
import { TabelaPedidosV2 } from "@/components/Tabelas/TabelaDePedidos/TabelaDePedidos";
import { columns } from "@/components/Tabelas/TabelaDePedidos/columns";
import { useTodosOrcamentosTable } from "@/hooks/queries/tables/orcamentos/admin/useTodoOrcamentosTable";

export const TodosOrcamentos = () => {
  const { todosOrcamentosTable } = useTodosOrcamentosTable();

  return (
    <section className="mb-10 h-full pt-6 mobile:w-screen mobile:overflow-x-scroll">
      {todosOrcamentosTable.data ? (
        <TabelaPedidosV2 data={todosOrcamentosTable.data} columns={columns} />
      ) : (
        <SkeletonTable />
      )}
    </section>
  );
};
