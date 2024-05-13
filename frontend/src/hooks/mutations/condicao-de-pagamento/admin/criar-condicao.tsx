import { useKmbApi } from "@/lib/axios/useKmbApi";
import { CondicaoDePagamentoValidator } from "@/utils/validators/CondicaoDePagamento";
import { useMutation } from "@tanstack/react-query";

export const useCriarCondicao = () => {
  const { kmbApi } = useKmbApi();

  const criarCondicao = useMutation({
    mutationKey: ["criar-condicao-pagamento"],
    mutationFn: async (condicao: {
      descricao: string;
      tipo: string;
    }): Promise<CondicaoDePagamentoValidator> => {
      const { data } = await kmbApi.post<CondicaoDePagamentoValidator>(
        "/condicaoDePagamento/admin",
        condicao,
      );

      return data;
    },
  });

  return { criarCondicao };
};
