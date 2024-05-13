import { useKmbApi } from "@/lib/axios/useKmbApi";
import {
  EmailNotificacaoValidator,
  email_notificacao_schema,
} from "@/utils/validators/emailNotificacao";
import { useQuery } from "@tanstack/react-query";

export const useEmailNotificacao = () => {
  const { kmbApi } = useKmbApi();

  const todosEmails = useQuery({
    queryKey: ["todos-emails"],
    queryFn: async (): Promise<EmailNotificacaoValidator[]> => {
      const { data } =
        await kmbApi.get<EmailNotificacaoValidator[]>("/emailNotificacao");

      const filter = data.filter(
        (email) => email_notificacao_schema.safeParse(email).success,
      );

      return filter;
    },
  });

  return { todosEmails };
};
