import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LayoutGrid,
  List,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PesquisaProdutos } from "./PesquisaProdutos/PesquisaProdutos";
import { useProdutosLayout } from "@/store/useProdutosLayout.store";
import { cn } from "@/lib/utils";
import { CardProdutoGrid } from "./CardProdutoGrid/CardProdutoGrid";
import { CardProdutoList } from "./CardProdutoList/CardProdutoList";
import { TooltipComponent } from "@/components/TooltipComponent/TooltipComponent";
import { useProdutosQuery } from "@/hooks/queries/produto/useProdutosQuery";

export const TodosOsProdutos = () => {
  const {
    produtosQuery,
    page,
    setPage,
    setFilter,
    promocaoAtiva,
    setPromocaoAtiva,
  } = useProdutosQuery();
  const layout = useProdutosLayout((state) => state.layout);
  const changeLayout = useProdutosLayout((state) => state.changeLayout);

  return (
    <section className="pt-4">
      <div className="p-4">
        <div className="flex items-center justify-between gap-4 mobile:items-start">
          <PesquisaProdutos
            query={produtosQuery}
            setFilter={setFilter}
            setPage={setPage}
            promocaoAtiva={promocaoAtiva}
            setPromocaoAtiva={setPromocaoAtiva}
            className="mobile:w-full mobile:min-w-0"
          />

          <TooltipComponent title="Mude a forma de exibição produtos">
            <Button size="icon" variant="outline" onClick={changeLayout}>
              {layout === "list" && <LayoutGrid />}
              {layout === "grid" && <List />}
            </Button>
          </TooltipComponent>
        </div>

        <div
          className={cn("content-center gap-4", {
            "flex flex-col": layout === "list",
            "grid grid-cols-3 content-center gap-4 2xl:grid-cols-5 mobile:grid-cols-2":
              layout === "grid",
          })}
        >
          {produtosQuery.data &&
            produtosQuery.data.map((produto) =>
              layout === "grid"
                ? produto.ativo === true && (
                    <CardProdutoGrid {...produto} key={produto._id} />
                  )
                : produto.ativo === true && (
                    <CardProdutoList {...produto} key={produto._id} />
                  ),
            )}

          {produtosQuery.isFetching && (
            <>
              {layout === "list" ? (
                <SkeletonProdutosList repeticoes={9} />
              ) : (
                <SkeletonProdutosGrid repeticoes={9} />
              )}
            </>
          )}
        </div>
        {produtosQuery.data?.length === 0 && !produtosQuery.isFetching && (
          <div className="text-center">Nem um produto encontrado...</div>
        )}
        <Pagination className="pt-6">
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPage((old) => Math.max(old - 10, 0))}
                disabled={page === 0}
              >
                <ChevronsLeft />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 0}
              >
                <ChevronLeft />
              </Button>
            </PaginationItem>
            <PaginationItem className="px-8">{page + 1}</PaginationItem>

            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (!produtosQuery.isPlaceholderData) {
                    setPage((old) => old + 1);
                  }
                }}
              >
                <ChevronRight />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (!produtosQuery.isPlaceholderData) {
                    setPage((old) => old + 10);
                  }
                }}
              >
                <ChevronsRight />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

interface ISkeletonProdutosGrid {
  repeticoes: number;
}

export function SkeletonProdutosGrid({ repeticoes }: ISkeletonProdutosGrid) {
  const arr = new Array(repeticoes).fill(repeticoes);

  return arr.map((_, i) => (
    <Card
      className={cn(
        "grid w-[200px] max-w-[200px] space-y-2 place-self-center p-2",
      )}
      key={i}
    >
      <Skeleton className="h-6" />
      <Skeleton className="h-[182px]" />
      <Skeleton className="h-4" />
    </Card>
  ));
}

export function SkeletonProdutosList({ repeticoes }: ISkeletonProdutosGrid) {
  const arr = new Array(repeticoes).fill(repeticoes);

  return arr.map((_, i) => (
    <Card className={cn("flex h-24 gap-4 p-4")} key={i}>
      <Skeleton className="min-w-1/5 flex w-2/5" />
      <Skeleton className="min-w-1/5 flex w-2/5" />
      <Skeleton className="min-w-1/5 flex w-1/5" />
    </Card>
  ));
}
