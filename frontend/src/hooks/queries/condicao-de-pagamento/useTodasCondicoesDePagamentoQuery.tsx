import { fetchTodasCondicoesDePagamento } from "@/service/condicao-de-pagamento/todas-condicoes-de-pagamento";
import { useQuery } from "@tanstack/react-query";

export const useTodasCondicoesDePagamentoQuery = () => {
  const todasCondicoesDePagamentoQuery = useQuery({
    queryKey: ["todas-condicoes-de-pagamento"],
    queryFn: fetchTodasCondicoesDePagamento,
  });

  return { todasCondicoesDePagamentoQuery };
};
