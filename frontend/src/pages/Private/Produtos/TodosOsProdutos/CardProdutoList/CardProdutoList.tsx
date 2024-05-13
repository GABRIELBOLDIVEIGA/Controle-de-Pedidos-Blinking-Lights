import { ImgagemProduto } from "@/components/ImgagemProduto/ImgagemProduto";
import { TooltipComponent } from "@/components/TooltipComponent/TooltipComponent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useProdutosStore } from "@/store/useProdutosStore";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
import { ProdutoValidator } from "@/utils/validators/Produto";
import { Check, ShoppingCart } from "lucide-react";

export function CardProdutoList(produto: ProdutoValidator) {
  const produtos = useProdutosStore((state) => state.produtos);
  const addProduto = useProdutosStore((state) => state.addProduto);
  const removeProduto = useProdutosStore((state) => state.removeProduto);

  const produtoNoCarrinho = () => {
    return !!produtos.find((obj) => obj.item._id === produto._id);
  };

  return (
    <Card
      className={cn(
        "flex h-24 cursor-pointer justify-start gap-4 p-4 transition delay-75 ease-in-out hover:scale-[101%] mobile:h-fit",
        {
          "shadow-md shadow-muted-foreground ring-1 ring-primary":
            produtoNoCarrinho(),
        },
      )}
      onClick={() => {
        produtoNoCarrinho() ? removeProduto(produto) : addProduto(produto);
      }}
    >
      <ImgagemProduto
        src={produto.urlImg}
        className="h-16 min-h-16 w-16 min-w-16 max-w-16 p-0"
      />

      <div className="flex w-full justify-between">
        <div className="flex w-full gap-10">
          <div className="min-w-1/5 flex w-1/5 flex-col justify-between font-semibold mobile:w-2/3">
            <p>Descrição: {produto.descricao}</p>
            <p className="text-sm text-muted-foreground">
              Código: {produto.codigo}
            </p>
          </div>

          <div className="mobile:sr-only">
            <Separator orientation="vertical" />
          </div>

          <div className="flex flex-col gap-4 font-semibold mobile:sr-only">
            <p
              className={cn("", {
                hidden: !produto.promocao_ativa,
              })}
            >
              Preço Promocional:{" "}
              <span>{currencyFormt(produto.preco_promocional)}</span>
            </p>

            <p className={cn("text-muted-foreground")}>
              Preço: {currencyFormt(produto.preco)}
            </p>
          </div>
        </div>

        <TooltipComponent
          title={
            produtoNoCarrinho() ? "Remova do carrinho" : "Adicione ao carrinho"
          }
        >
          <Button
            className={cn({
              "bg-muted": produtoNoCarrinho(),
            })}
            variant="ghost"
            size="icon"
          >
            {produtoNoCarrinho() ? (
              <Check className={cn("cursor-pointer")} />
            ) : (
              <ShoppingCart size={20} className={cn("cursor-pointer")} />
            )}
          </Button>
        </TooltipComponent>
      </div>
    </Card>
  );
}
