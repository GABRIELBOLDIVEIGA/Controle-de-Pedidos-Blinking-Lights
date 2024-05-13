import { TooltipComponent } from "@/components/TooltipComponent/TooltipComponent";
import { Card } from "@/components/ui/card";
import { ProdutoValidator } from "@/utils/validators/Produto";
import { Check, ShoppingCart } from "lucide-react";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
import { cn } from "@/lib/utils";
import { useProdutosStore } from "@/store/useProdutosStore";
import { ImgagemProduto } from "@/components/ImgagemProduto/ImgagemProduto";
import { Button } from "@/components/ui/button";

export const CardProdutoGrid = (produto: ProdutoValidator) => {
  const produtos = useProdutosStore((state) => state.produtos);
  const addProduto = useProdutosStore((state) => state.addProduto);
  const removeProduto = useProdutosStore((state) => state.removeProduto);

  const produtoNoCarrinho = () => {
    return !!produtos.find((obj) => obj.item._id === produto._id);
  };

  return (
    <Card
      key={produto._id}
      className={cn(
        "mb-4 grid w-[200px] max-w-[200px] place-self-center p-2 transition delay-0 ease-in-out hover:scale-[101%] mobile:w-[180px]",
        {
          "shadow-3xl shadow-muted-foreground ring-1 ring-primary":
            produtoNoCarrinho(),
        },
      )}
    >
      <div className="flex items-center justify-between px-2">
        <div>
          <p className="font-semibold">{produto.descricao}</p>
          <p className="text-xs text-muted-foreground">{produto.codigo}</p>
        </div>
      </div>
      <div>
        <ImgagemProduto src={produto.urlImg} />
      </div>

      <div className="flex items-center justify-between px-2 pb-1">
        <div className="flex gap-4">
          <p className={cn("w-fit text-xs")}>{currencyFormt(produto.preco)}</p>

          <p
            className={cn("w-fit rounded-lg px-1 text-xs font-extrabold", {
              hidden: !produto.promocao_ativa,
            })}
          >
            {currencyFormt(produto.preco_promocional)}
          </p>
        </div>
        <TooltipComponent title="Adicione ao carrinho">
          <Button
            className={cn({
              "bg-muted": produtoNoCarrinho(),
            })}
            variant="ghost"
            size="icon"
            onClick={() => {
              produtoNoCarrinho()
                ? removeProduto(produto)
                : addProduto(produto);
            }}
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
};
