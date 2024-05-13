import { useKmbApi } from "@/lib/axios/useKmbApi";
import { useMutation } from "@tanstack/react-query";

export const useEsqueciMinhaSenhaMutation = () => {
  const { kmbApi } = useKmbApi();

  const esqueciMinhaSenha = async (email: string): Promise<string> => {
    const { data } = await kmbApi.post<string>(`/auth/forgot-password`, {
      email: email,
    });
    return data;
  };

  const esqueciMinhaSenhaMutation = useMutation({
    mutationKey: ["esqueci_minha_senha_mutation"],
    mutationFn: esqueciMinhaSenha,
  });

  return { esqueciMinhaSenhaMutation };
};
