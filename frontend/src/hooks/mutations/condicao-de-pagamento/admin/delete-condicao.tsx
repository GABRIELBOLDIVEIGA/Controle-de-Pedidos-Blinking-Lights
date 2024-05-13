import { useKmbApi } from "@/lib/axios/useKmbApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCondicao = () => {
  const { kmbApi } = useKmbApi();

  const deleteCondicao = useMutation({
    mutationKey: ["delete-condicao"],
    mutationFn: async (id: string) => {
      const { data } = await kmbApi.delete(`/condicaoDePagamento/delete/${id}`);

      return data;
    },
  });

  return { deleteCondicao };
};
