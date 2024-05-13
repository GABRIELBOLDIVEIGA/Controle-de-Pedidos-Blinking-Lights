import { z } from "zod";
import { enderecoSchema } from "@/utils/validators/Endereco";
import { permissaoSchema } from "@/utils/enums/Permicao";

export const editarUsuarioFormSchema = z.object({
  id: z.string(),
  nome: z
    .string({ required_error: "Informe o nome do usuário." })
    .min(3, "Nome deve ter mais de 3 letras."),

  email: z.string().email({ message: "Informe um e-mail valido." }),

  permicao: permissaoSchema.optional(),

  documento: z.string({ required_error: "Informe o documento do usuário." }),

  razao_social: z.string().optional(),

  telefone: z.string().optional(),

  observacoes: z.string().optional(),

  ativo: z.boolean(),

  endereco: enderecoSchema,
});

export type EditarUsuarioFormType = z.infer<typeof editarUsuarioFormSchema>;
