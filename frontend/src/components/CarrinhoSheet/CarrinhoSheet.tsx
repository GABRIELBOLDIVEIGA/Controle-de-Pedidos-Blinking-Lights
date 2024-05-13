import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useProdutosStore } from "@/store/useProdutosStore";
import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { TooltipComponent } from "../TooltipComponent/TooltipComponent";
import { cn } from "@/lib/utils";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
import { ImgagemProduto } from "../ImgagemProduto/ImgagemProduto";
import { Separator } from "../ui/separator";

interface ICarrinhoSheet {
  children: React.ReactElement;
}

export const CarrinhoSheet = ({ children }: ICarrinhoSheet) => {
  const produtos = useProdutosStore((state) => state.produtos);
  const removeProduto = useProdutosStore((state) => state.removeProduto);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          {children}
          {produtos.length > 0 && (
            <span className="absolute h-2 w-2 -translate-x-3 translate-y-1 rounded-full bg-red-600" />
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <div className="h-[90%]">
          <SheetHeader>
            <SheetTitle>Minha Cesta</SheetTitle>
            <SheetDescription>
              A lista de produtos selecionados aparece abaixo.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[89%]">
            <div className="h-[90%] space-y-2 pr-3 pt-5">
              {produtos.length === 0 && (
                <Card>
                  <CardHeader>
                    <CardDescription>
                      <SheetClose asChild>
                        <Link
                          to="/produto/todos-produtos"
                          className="text-center leading-6 underline"
                        >
                          Sua cesta esta vazia, adicione produtos nela antes de
                          fazer um novo pedido.
                        </Link>
                      </SheetClose>
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}

              {produtos.map((produto) => (
                <Card key={produto.item._id} className="p-2">
                  <div className="relative">
                    <div
                      className="absolute right-0 cursor-pointer"
                      onClick={() => removeProduto(produto.item)}
                    >
                      <TooltipComponent title="Remover item da lista">
                        <X className="  text-muted-foreground" size={14} />
                      </TooltipComponent>
                    </div>
                    <div className="flex">
                      <ImgagemProduto
                        src={produto.item.urlImg}
                        className="h-[70px] min-h-[70px] w-[70px] object-contain"
                      />
                      <div>
                        <p className="font-semibold">
                          {produto.item.descricao}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {produto.item.codigo}
                        </p>
                        <div className="flex gap-4 pt-[6px] mobile:sr-only">
                          <p
                            className={cn("w-fit text-xs", {
                              "underline underline-offset-2":
                                !produto.item.promocao_ativa,
                            })}
                          >
                            {currencyFormt(produto.item.preco)}
                          </p>

                          <p
                            className={cn(
                              "w-fit text-xs underline underline-offset-2",
                              {
                                hidden: !produto.item.promocao_ativa,
                              },
                            )}
                          >
                            {currencyFormt(produto.item.preco_promocional)}
                          </p>
                        </div>
                        <p className="w-fit pt-2 text-xs mobile:sr-only">
                          Quantidade: {produto.quantidade}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
        <Separator />
        <SheetFooter>
          <div className="flex w-full items-start justify-between">
            <SheetClose asChild>
              <Link to="/pedido/novo-pedido">
                <Button
                  className="flex gap-2"
                  type="button"
                  title="Redireciona para o formulário antes de gerar um Pedido."
                >
                  <p>pedido</p>
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link to="/orcamento/novo-orcamento">
                <Button
                  className="flex gap-2"
                  type="button"
                  title="Redireciona para o formulário antes de gerar um Orçamento."
                >
                  <p>orçamento</p>
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
