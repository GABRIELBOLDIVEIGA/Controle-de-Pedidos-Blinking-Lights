import { SkeletonTable } from "@/components/SkeletonTable/SkeletonTable";
import { columns } from "@/components/Tabelas/Clientes/columns";
import { TabelaClientesV2 } from "@/components/Tabelas/Clientes/tabela-cliente";
import { useClientesTable } from "@/hooks/queries/tables/clientes/useClientesTable";

export const TodosOsClientes = () => {
  const { clientesTable } = useClientesTable();

  return (
    <section className="mb-10 h-full pt-6 mobile:w-screen mobile:overflow-x-scroll">
      {clientesTable.data ? (
        <TabelaClientesV2 columns={columns} data={clientesTable.data} />
      ) : (
        <SkeletonTable />
      )}
    </section>
  );
};
