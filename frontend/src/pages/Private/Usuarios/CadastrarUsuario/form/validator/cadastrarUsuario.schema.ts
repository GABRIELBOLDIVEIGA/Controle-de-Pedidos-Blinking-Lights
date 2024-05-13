import { permissaoSchema } from "@/utils/enums/Permicao";
import { enderecoSchema } from "@/utils/validators/Endereco";
import { z } from "zod";

export const cadastrarusuarioFormSchema = z
  .object({
    nome: z
      .string({ required_error: "Informe o nome do usuário." })
      .min(3, "Nome deve ter mais de 3 letras."),
    email: z.string().email({ message: "Informe um e-mail valido." }),

    // avatar: z.string(),
    permissao: permissaoSchema,

    documento: z.string({ required_error: "Informe o documento do usuário." }),

    razao_social: z.string().optional(),

    telefone: z.string().optional(),

    observacoes: z.string().optional(),

    senha: z
      .string()
      .min(6, "Senha deve ter no minimo 6 caracteres.")
      .max(25, "Senha deve ter no maximo de 25 caracteres."),

    confirmarSenha: z
      .string()
      .min(6, "Senha deve ter no minimo 6 caracteres.")
      .max(25, "Senha deve ter no maximo de 25 caracteres."),

    ativo: z.boolean(),

    endereco: enderecoSchema,
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "Senhas devem ser iguais",
    path: ["confirmarSenha"],
  });

export type CadastrarUsuarioFormType = z.infer<
  typeof cadastrarusuarioFormSchema
>;
