import { useKmbApi } from "@/lib/axios/useKmbApi";
import { EmailNotificacaoValidator } from "@/utils/validators/emailNotificacao";
import { useMutation } from "@tanstack/react-query";

export const useCadastrarEmailNotificacao = () => {
  const { kmbApi } = useKmbApi();

  const criarEmailNotificacao = useMutation({
    mutationKey: ["criar-email-notificacao"],
    mutationFn: async ({
      nome,
      email,
    }: {
      nome: string;
      email: string;
    }): Promise<EmailNotificacaoValidator> => {
      const { data } = await kmbApi.post<EmailNotificacaoValidator>(
        "/emailNotificacao/admin",
        {
          nome,
          email,
        },
      );

      return data;
    },
  });

  return { criarEmailNotificacao };
};
