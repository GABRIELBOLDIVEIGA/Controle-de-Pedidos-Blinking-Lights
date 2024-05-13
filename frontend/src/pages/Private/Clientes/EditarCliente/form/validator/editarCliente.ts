import { enderecoSchema } from "@/utils/validators/Endereco";
import { z } from "zod";

export const editarClienteFormSchema = z.object({
  _id: z.string(),

  usuario_responsavel: z.string({
    required_error: "Selecione o usuário responsável.",
  }),

  nome: z
    .string({ required_error: "Informe o nome do cliente." })
    .min(3, "Nome deve ter mais de 3 letras."),

  email: z
    .string({ required_error: "Informe o e-mail do cliente." })
    .email("Informe um e-mail valido."),

  documento: z.string({ required_error: "Informe o documento do cliente." }),

  inscricao_estadual: z.string().default(""),

  razao_social: z.string({
    required_error: "Informe a razão social do cliente.",
  }),

  telefone: z.string().default(""),

  observacoes: z.string(),

  endereco: enderecoSchema,
});

export type EditarClienteFormType = z.infer<typeof editarClienteFormSchema>;
