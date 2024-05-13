import { permissaoSchema } from "@/utils/enums/Permicao";
import { enderecoSchema } from "@/utils/validators/Endereco";
import { z } from "zod";

export const criar_usuario_form = z
  .object({
    nome: z.string().min(3),
    email: z.string().email(),

    permissao: permissaoSchema,

    documento: z.string(),

    razao_social: z.string().optional(),

    telefone: z.string().optional(),

    observacoes: z.string().optional(),

    senha: z.string().min(6).max(25),

    confirmarSenha: z.string().min(6).max(25),

    ativo: z.boolean(),

    endereco: enderecoSchema,
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "Senhas devem ser iguais",
    path: ["confirmarSenha"],
  });
