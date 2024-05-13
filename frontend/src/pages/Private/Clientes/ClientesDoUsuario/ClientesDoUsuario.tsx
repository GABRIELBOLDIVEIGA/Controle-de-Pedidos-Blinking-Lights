import { SkeletonTable } from "@/components/SkeletonTable/SkeletonTable";
import { TabelaDeClientes } from "@/components/TabelaDeClientes/TabelaDeClientes";
import { columns } from "@/components/TabelaDeClientes/columns";
import { useClientesDoUsuarioQuery } from "@/hooks/queries/cliente/useClientesDoUsuarioQuery";

export const ClientesDoUsuario = () => {
  const { clientesDoUsuarioQuery } = useClientesDoUsuarioQuery();

  return (
    <section className="mb-10 h-full pt-6 mobile:w-screen mobile:overflow-x-scroll">
      {clientesDoUsuarioQuery.data ? (
        <TabelaDeClientes
          columns={columns}
          data={clientesDoUsuarioQuery.data}
        />
      ) : (
        <SkeletonTable />
      )}
    </section>
  );
};
