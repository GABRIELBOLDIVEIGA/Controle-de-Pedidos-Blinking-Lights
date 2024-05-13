import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNovoPedidoStepStore } from "@/store/useStepNovoPedido";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ProdutosStep } from "@/components/MultStep-Pedido-Orcamento/ProdutosStep/ProdutosStep";
import { DetalhesStep } from "@/components/MultStep-Pedido-Orcamento/DetalhesStep/DetalhesStep";

export function NovoPedido() {
  const steps = [<ProdutosStep />, <DetalhesStep />];
  const setLength = useNovoPedidoStepStore((state) => state.setLength);
  const step = useNovoPedidoStepStore((state) => state.step);
  const back = useNovoPedidoStepStore((state) => state.back);
  const navigate = useNavigate();

  useEffect(() => {
    setLength(steps.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const descriptions = [
    "Confira as informações dos produtos antes de prosseguir para o próximo passo.",
    "Finalize o formulário para gerar um novo PEDIDO.",
  ];

  return (
    <section className="h-full pt-6 mobile:px-2">
      <Card className=" mobile:w-full">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  step === 0 ? navigate(-1) : back();
                }}
              >
                <ArrowLeftCircle />
              </Button>
              Novo Pedido
            </div>
          </CardTitle>

          <CardDescription>{descriptions[step]}</CardDescription>
        </CardHeader>
        <Separator />
        {steps[step]}
      </Card>
    </section>
  );
}
