import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { useTodasCondicoesDePagamentoQuery } from "@/hooks/queries/condicao-de-pagamento/useTodasCondicoesDePagamentoQuery";
import { EditarCondicaoModal } from "./modal-editar";
import { CircleFadingPlus, SquarePen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CriarCondicaoModal } from "./modal-criar";
import { SkeletonLista } from "../skeletons";

export const CondicoesDePagamento = () => {
  const { todasCondicoesDePagamentoQuery: condicoes } =
    useTodasCondicoesDePagamentoQuery();

  return (
    <TabsContent value="CONDICOES_DE_PAGAMENTO" className="">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Condições de pagamento</CardTitle>
            <CriarCondicaoModal>
              <Button variant="ghost" size="icon">
                <CircleFadingPlus size={18} />
              </Button>
            </CriarCondicaoModal>
          </div>
          <CardDescription>
            Selecione uma Condições de Pagamento para editar.
          </CardDescription>
        </CardHeader>

        <CardContent className="max-h-[600px] space-y-2 pr-0">
          <ScrollArea className="h-[600px]">
            <div className="space-y-2 pb-6">
              {condicoes.isLoading && <SkeletonLista />}

              {condicoes.data?.map((condicao) => (
                <div className="mr-4 rounded-md hover:bg-muted">
                  <div
                    key={condicao._id}
                    className="flex items-center justify-between"
                  >
                    <p>{condicao.descricao}</p>
                    <EditarCondicaoModal condicao={condicao}>
                      <Button variant="ghost" size="icon">
                        <SquarePen size={18} />
                      </Button>
                    </EditarCondicaoModal>
                  </div>
                  <Separator className="mr-4" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
