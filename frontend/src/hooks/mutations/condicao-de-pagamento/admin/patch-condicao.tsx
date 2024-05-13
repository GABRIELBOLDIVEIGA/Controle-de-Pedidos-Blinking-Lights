import { useKmbApi } from "@/lib/axios/useKmbApi";
import { CondicaoDePagamentoValidator } from "@/utils/validators/CondicaoDePagamento";
import { useMutation } from "@tanstack/react-query";

export const useCondicaoPagamento = () => {
  const { kmbApi } = useKmbApi();

  const updateCondicao = useMutation({
    mutationKey: ["editar-condicao-pagamento"],
    mutationFn: async (
      condicao: CondicaoDePagamentoValidator,
    ): Promise<CondicaoDePagamentoValidator> => {
      const { data } = await kmbApi.patch<CondicaoDePagamentoValidator>(
        `/condicaoDePagamento/update/${condicao._id}`,
        condicao,
      );

      return data;
    },
  });

  return { updateCondicao };
};
