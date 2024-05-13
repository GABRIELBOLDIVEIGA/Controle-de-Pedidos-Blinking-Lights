import { useKmbApi } from "@/lib/axios/useKmbApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteEmailNotificacao = () => {
  const { kmbApi } = useKmbApi();

  const deletarEmail = useMutation({
    mutationKey: ["deletar-email-notificaco"],
    mutationFn: async (id: string) => {
      const { data } = await kmbApi.delete(`/emailNotificacao/delete/${id}`);

      return data;
    },
  });

  return {
    deletarEmail,
  };
};
