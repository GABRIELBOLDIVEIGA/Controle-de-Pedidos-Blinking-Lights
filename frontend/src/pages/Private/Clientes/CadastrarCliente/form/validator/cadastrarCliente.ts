import { z } from "zod";

export const cadastrarClienteFormSchema = z.object({
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

  telefone: z.string().default(""),

  inscricao_estadual: z.string().default(""),

  razao_social: z.string({
    required_error: "Informe a razão social do cliente.",
  }),

  observacoes: z.string(),

  endereco: z.object({
    cep: z.string(),
    logradouro: z.string(),
    complemento: z.string(),
    bairro: z.string(),
    localidade: z.string(),
    uf: z.string(),
    numero: z.string(),
  }),
});

export type CadastrarClienteFormType = z.infer<
  typeof cadastrarClienteFormSchema
>;
