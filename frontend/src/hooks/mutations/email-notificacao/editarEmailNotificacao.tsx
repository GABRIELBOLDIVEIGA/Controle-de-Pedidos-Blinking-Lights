import { useKmbApi } from "@/lib/axios/useKmbApi";
import { EmailNotificacaoValidator } from "@/utils/validators/emailNotificacao";
import { useMutation } from "@tanstack/react-query";

export const useEditarEmailNotificacao = () => {
  const { kmbApi } = useKmbApi();

  const editarEmailNotificacao = useMutation({
    mutationKey: ["editar-email-notificacao"],
    mutationFn: async (
      form: EmailNotificacaoValidator,
    ): Promise<EmailNotificacaoValidator> => {
      const { data } = await kmbApi.patch<EmailNotificacaoValidator>(
        `/emailNotificacao/${form._id}`,
        {
          nome: form.nome,
          email: form.email,
        },
      );

      return data;
    },
  });

  return { editarEmailNotificacao };
};
