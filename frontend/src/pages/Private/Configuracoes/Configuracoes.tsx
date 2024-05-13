import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailsParaNotificacao } from "./TabsContent/Emails-para-notificacao/Emails-para-notificacao";
import { CondicoesDePagamento } from "./TabsContent/Condicoes-de-pagamento/Condicoes-de-pagamento";

export function Configuracoes() {
  return (
    <section className="my-6">
      <Tabs defaultValue="EMAILS_DE_NOTIFICACAO">
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="EMAILS_DE_NOTIFICACAO">
            E-mails para notificação
          </TabsTrigger>
          <TabsTrigger value="CONDICOES_DE_PAGAMENTO">
            Condições de pagamento
          </TabsTrigger>
        </TabsList>

        <EmailsParaNotificacao />

        <CondicoesDePagamento />
      </Tabs>
    </section>
  );
}
