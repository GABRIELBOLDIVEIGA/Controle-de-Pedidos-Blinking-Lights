import { SkeletonTable } from "@/components/SkeletonTable/SkeletonTable";
import { TabelaPedidosV2 } from "@/components/Tabelas/TabelaDePedidos/TabelaDePedidos";
import { columns } from "@/components/Tabelas/TabelaDePedidos/columns";
import { useOrcamentosDoUsuarioTable } from "@/hooks/queries/tables/orcamentos/useOrcamentosDoUsuario/useOrcamentosDoUsuario";

export const MeusOrcamentos = () => {
  const { orcamentosDoUsuarioTable } = useOrcamentosDoUsuarioTable();

  return (
    <section className="mb-10 h-full pt-6 mobile:w-screen mobile:overflow-x-scroll">
      {orcamentosDoUsuarioTable.data ? (
        <TabelaPedidosV2
          data={orcamentosDoUsuarioTable.data}
          columns={columns}
        />
      ) : (
        <SkeletonTable />
      )}
    </section>
  );
};
