import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProdutosStore } from "@/store/useProdutosStore";
import { ArrowRight, X } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNovoPedidoStepStore } from "@/store/useStepNovoPedido";
import { DetalhesStep } from "../DetalhesStep/DetalhesStep";
import { Produto } from "./Produto/Produto";
import { Card, CardContent } from "@/components/ui/card";
import { totalDoPedidoV2 } from "@/utils/helpers/calculosProduto/v2/total-pedido-v2";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";

export const ProdutosStep = () => {
  const produtos = useProdutosStore((state) => state.produtos);
  const reset = useProdutosStore((state) => state.reset);
  const steps = [<ProdutosStep />, <DetalhesStep />];
  const setLength = useNovoPedidoStepStore((state) => state.setLength);
  const length = useNovoPedidoStepStore((state) => state.length);
  const step = useNovoPedidoStepStore((state) => state.step);
  const next = useNovoPedidoStepStore((state) => state.next);

  useEffect(() => {
    setLength(steps.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="min-h-[250px]">
      <div className="space-y-4 pb-4 mobile:space-y-6">
        {!produtos.length && (
          <div className="pt-4">
            <p className="text-center">
              Sua cesta esta vazia, adicione{" "}
              <span>
                <Link to="/produto/todos-produtos" className="underline">
                  produtos
                </Link>
              </span>{" "}
              nela antes de fazer um novo pedido.
            </p>
          </div>
        )}
        {produtos.map((produto) => (
          <div key={produto.item._id}>
            <Produto key={produto.item._id} {...produto} />
            {/* <Separator /> */}
          </div>
        ))}

        <Card className="mx-8 border-none shadow-none mobile:mx-2">
          <CardContent className="pt-4 mobile:px-2">
            <div className="pb-4 text-center">
              <p className="text-lg font-bold tracking-wider">
                Total:{" "}
                <span className="text-base font-semibold">
                  {currencyFormt(totalDoPedidoV2(produtos))}
                </span>
              </p>
            </div>
            <div>
              {produtos.length > 0 && (
                <div className="flex items-center justify-between align-middle">
                  <Button
                    className="space-x-2"
                    disabled={step + 1 == length}
                    variant="destructive"
                    onClick={() => reset()}
                  >
                    <span>excluir todos</span> <X size={18} />
                  </Button>

                  <Badge className="h-fit rounded-full">
                    {step + 1} / {length}
                  </Badge>

                  <Button
                    className="space-x-2"
                    disabled={step + 1 == length}
                    onClick={() => next()}
                  >
                    <span>próximo</span> <ArrowRight size={18} />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
