import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader, Loader2, Search, Square, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { ProdutoValidator } from "@/utils/validators/Produto";
import { useProdutosQuery } from "@/hooks/queries/produto/useProdutosQuery";
import { useInView } from "react-intersection-observer";
import { useEditarPedidoStore } from "@/store/useEditarPedidoStore";

interface IModal {
  children: JSX.Element;
}

export function ModalProdutos({ children }: IModal) {
  const { produtosQuery, page, setPage, setFilter, filter } =
    useProdutosQuery();
  const [ref, inView] = useInView();
  const [produtos, setProdutos] = useState<typeof produtosQuery.data>();
  const addProduto = useEditarPedidoStore((state) => state.addProduto);
  const removeProduto = useEditarPedidoStore((state) => state.removeProduto);
  const produtosLista = useEditarPedidoStore((state) => state.produtos);

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    if (produtos && produtosQuery.data) {
      setProdutos([...produtos, ...produtosQuery.data]);
    } else {
      setProdutos(produtosQuery.data);
    }

    if (filter && filter != "") {
      if (page === 0) {
        setProdutos(produtosQuery.data);
      } else {
        if (produtos && produtosQuery.data)
          setProdutos([...produtos, ...produtosQuery.data]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produtosQuery.data]);

  const produtoNaLista = (produto: ProdutoValidator) => {
    return !!produtosLista.find((obj) => obj.item._id === produto._id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex h-4/5 w-4/5 flex-col gap-0 mobile:w-[95%]">
        <DialogHeader>
          <DialogTitle>Adicione Produtos</DialogTitle>
          <DialogDescription>
            Após adicionar os produtos desejados você pode modificar preços e
            descontos.
          </DialogDescription>
          <PesquisaProdutos
            query={produtosQuery}
            setFilter={setFilter}
            setPage={setPage}
          />
        </DialogHeader>
        <div className="h-[82%]">
          <ScrollArea className="h-full">
            {produtos?.map((produto) => (
              <div key={produto._id} className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    produtoNaLista(produto)
                      ? removeProduto(produto)
                      : addProduto(produto);
                  }}
                >
                  {!produtoNaLista(produto) ? <Square /> : <Check />}
                </Button>
                {produto.descricao} - {produto.codigo}
              </div>
            ))}

            <div ref={ref} className="flex h-[18px] justify-center">
              {produtosQuery.isFetching && (
                <Loader size={18} className="animate-spin" />
              )}
            </div>
            {produtosQuery.data?.length === 0 && (
              <p className="text-center">Sem resultados adicionais...</p>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface IProps {
  query: UseQueryResult<ProdutoValidator[], Error>;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
export const PesquisaProdutos = ({ ...props }: IProps) => {
  const [search, setSearch] = useState("");

  return (
    <form
      className="flex min-w-[300px] items-center space-x-2 py-4"
      onSubmit={(ev) => {
        ev.preventDefault();
        props.setPage(0);
        props.setFilter(search);
      }}
    >
      <Input
        placeholder="Pesquise por Código ou Descrição..."
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
        className=" bg-popover py-2"
      />
      <Button disabled={props.query.isFetching} size="icon" type="submit">
        {props.query.isFetching ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Search size={20} />
        )}
      </Button>
    </form>
  );
};
