import { SkeletonTable } from "@/components/SkeletonTable/SkeletonTable";
import { TabelaUsuarios } from "@/components/TabelaDeUsuarios/TabelaDeUsuarios";
import { columns } from "@/components/TabelaDeUsuarios/columns";
import { useTodosUsuariosQuery } from "@/hooks/queries/usuario/admin/useTodosUsuariosQuery";

export const TodosUsuarios = () => {
  const { todosUsuariosQuery } = useTodosUsuariosQuery();

  return (
    <section className="mb-10 h-full pt-6 mobile:w-screen mobile:overflow-x-scroll">
      {todosUsuariosQuery.data ? (
        <TabelaUsuarios columns={columns} data={todosUsuariosQuery.data} />
      ) : (
        <SkeletonTable />
      )}
    </section>
  );
};
