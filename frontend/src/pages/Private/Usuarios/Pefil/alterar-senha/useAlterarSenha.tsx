import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/Auth/AuthContext";
import { useModificarSenha } from "@/hooks/mutations/auth/modificar-senha";
import { Toaster, toast } from "sonner";

const form_schema = z
  .object({
    email: z.string().email(),
    senha: z
      .string()
      .min(6, "Senha deve ter no minimo 6 caracteres.")
      .max(25, "Senha deve ter no maximo de 25 caracteres."),

    nova_senha: z
      .string()
      .min(6, "Senha deve ter no minimo 6 caracteres")
      .max(25, "Senha deve ter no maximo de 25 caracteres."),
    confirmar_senha: z
      .string()
      .min(6, "Senha deve ter no minimo 6 caracteres")
      .max(25, "Senha deve ter no maximo de 25 caracteres."),
  })
  .refine((data) => data.nova_senha === data.confirmar_senha, {
    message: "Senhas devem ser iguais",
    path: ["confirmar_senha"],
  });

type FormType = z.infer<typeof form_schema>;

export const useAlterarSenhaForm = () => {
  const { user } = useContext(AuthContext);
  const form = useForm<FormType>({
    resolver: zodResolver(form_schema),
  });

  const { editarSenha } = useModificarSenha();

  useEffect(() => {
    if (user) {
      form.setValue("email", user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const submit = (data: FormType) => {
    editarSenha.mutate(
      { email: data.email, senha: data.senha, novaSenha: data.nova_senha },
      {
        onSuccess: (data) => {
          localStorage.setItem("access_token", data.token);
          toast.success("Senha alterada com sucesso.", { duration: 2000 });
        },
        onError: () => {
          toast.error("Senha atual não é valida.", { duration: 2500 });
        },
      },
    );
  };

  return { form, submit, Toaster, editarSenha };
};
