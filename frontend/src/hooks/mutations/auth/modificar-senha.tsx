import { useKmbApi } from "@/lib/axios/useKmbApi";
import { useMutation } from "@tanstack/react-query";

export const useModificarSenha = () => {
  const { kmbApi } = useKmbApi();

  const editarSenha = useMutation({
    mutationKey: ["editar-senha"],
    mutationFn: async (form: {
      email: string;
      senha: string;
      novaSenha: string;
    }): Promise<{ token: string }> => {
      const { data } = await kmbApi.post<{ token: string }>(
        "/auth/change-password",
        form,
      );

      return data;
    },
  });

  return { editarSenha };
};
