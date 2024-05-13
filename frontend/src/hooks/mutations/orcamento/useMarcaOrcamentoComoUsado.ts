import { useKmbApi } from "@/lib/axios/useKmbApi";
import { useMutation } from "@tanstack/react-query";

export const useMarcaOrcamentoComoUsado = () => {
  const { kmbApi } = useKmbApi();

  const marcaOrcamentoComoUsado = useMutation({
    mutationKey: ["marca-orcamento-como-usado"],
    mutationFn: async (id: string | undefined) => {
      const { data } = await kmbApi.patch(
        `/pedido/marca-orcamento-como-usado/${id}`,
      );

      return data;
    },
  });

  return { marcaOrcamentoComoUsado, ...marcaOrcamentoComoUsado };
};
