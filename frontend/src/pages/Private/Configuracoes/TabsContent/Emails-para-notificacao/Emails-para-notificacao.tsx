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
import { SkeletonLista } from "../skeletons";
import { CircleFadingPlus, SquarePen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEmailNotificacao } from "@/hooks/queries/email-notificacao/email-notificacao";
import { EditarEmailModal } from "./modal-editar";
import { CriarEmailModal } from "./modal-criar";

export const EmailsParaNotificacao = () => {
  const { todosEmails } = useEmailNotificacao();

  return (
    <TabsContent value="EMAILS_DE_NOTIFICACAO">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>E-mails para notificação</CardTitle>
            <CriarEmailModal>
              <Button variant="ghost" size="icon">
                <CircleFadingPlus size={18} />
              </Button>
            </CriarEmailModal>
          </div>

          <CardDescription>
            E-mails cadastrados irão receber notificações quando novos pedidos
            forem gerados.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-h-[600px] space-y-2 pr-0">
          <ScrollArea className="h-[600px]">
            <div className="space-y-2 pb-6">
              {todosEmails.isLoading && <SkeletonLista />}

              {todosEmails.data?.map((data) => (
                <div className="mr-4 rounded-md hover:bg-muted">
                  <div
                    key={data._id}
                    className="flex items-center justify-between"
                  >
                    <p>
                      {data.nome} - {data.email}
                    </p>
                    <EditarEmailModal data={data}>
                      <Button variant="ghost" size="icon">
                        <SquarePen size={18} />
                      </Button>
                    </EditarEmailModal>
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
