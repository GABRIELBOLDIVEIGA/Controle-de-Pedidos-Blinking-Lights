import kmbApi from "@/lib/axios/useKmbApi";
import {
  CondicaoDePagamentoValidator,
  consicaoDePagamentoValidator,
} from "@/utils/validators/CondicaoDePagamento";

export async function fetchTodasCondicoesDePagamento(): Promise<
  CondicaoDePagamentoValidator[]
> {
  const { data } = await kmbApi.get<CondicaoDePagamentoValidator[]>(
    "/condicaoDePagamento",
  );

  const data_filtrada: CondicaoDePagamentoValidator[] = [];
  data.forEach((condicao) => {
    if (consicaoDePagamentoValidator.safeParse(condicao).success)
      data_filtrada.push(condicao);
  });

  return data_filtrada;
}
