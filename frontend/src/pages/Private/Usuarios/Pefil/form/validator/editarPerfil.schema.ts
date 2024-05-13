import { z } from "zod";
import { enderecoSchema } from "@/utils/validators/Endereco";

export const editarPerfilFormSchema = z.object({
  nome: z
    .string({ required_error: "Informe o nome do usuário." })
    .min(3, "Nome deve ter mais de 3 letras."),

  email: z.string().email({ message: "Informe um e-mail valido." }),

  documento: z.string({ required_error: "Informe o documento do usuário." }),

  razao_social: z.string().optional(),

  telefone: z.string().optional(),

  endereco: enderecoSchema,

  file: z.instanceof(FormData).optional(),
});

export type EditarPerfilFormType = z.infer<typeof editarPerfilFormSchema>;
