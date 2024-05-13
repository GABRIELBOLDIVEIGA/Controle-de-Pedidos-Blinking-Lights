import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <section className="flex flex-col items-center pt-6">
      <h1>Ops... Parece que um erro o correu...</h1>

      <Button variant="link" className="text-secondary-foreground underline">
        <Link to="/pedido/meus-pedidos">Voltar para a aplicação</Link>
      </Button>
    </section>
  );
};
