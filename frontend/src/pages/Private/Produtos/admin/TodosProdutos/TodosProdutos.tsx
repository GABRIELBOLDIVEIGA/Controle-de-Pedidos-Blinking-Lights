import { SkeletonTable } from "@/components/SkeletonTable/SkeletonTable";
import { TabelaProdutos } from "@/components/TabelaProdutos/TabelaProdutos";
import { columns } from "@/components/TabelaProdutos/columns";
import { useTodosProdutosQuery } from "@/hooks/queries/produto/admin/useTodosProdutos";

export const TodosProdutosAdmin = () => {
  const { todosProdutosQuery } = useTodosProdutosQuery();

  return (
    <section className="mb-10 h-full pt-6 mobile:w-screen mobile:overflow-x-scroll">
      {todosProdutosQuery.data ? (
        <TabelaProdutos data={todosProdutosQuery.data} columns={columns} />
      ) : (
        <SkeletonTable />
      )}
    </section>
  );
};
