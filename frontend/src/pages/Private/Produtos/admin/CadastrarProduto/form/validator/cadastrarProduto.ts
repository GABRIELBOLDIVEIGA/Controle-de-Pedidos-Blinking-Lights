import { z } from "zod";

export const criarProdutoFormSchema = z.object({
  codigo: z
    .string({ required_error: "Informe o código do produto." })
    .min(3, "Código deve ter mais de 3 letras."),

  descricao: z
    .string({ required_error: "Informe a descrição do produto." })
    .min(3, "Descrição deve ter mais de 3 letras."),

  preco: z.coerce
    .number({ required_error: "Informe o preço do produto." })
    .min(0, "Valor do produto deve ser maior que ZERO."),

  preco_promocional: z.coerce
    .number({ required_error: "Informe o preço promocional do produto." })
    .min(0, "Preço Promocional do produto deve ser maior que ZERO.")
    .optional(),

  ativo: z.boolean(),

  promocao_ativa: z.boolean(),

  favorito: z.boolean(),
});

export type CriarProdutoFormType = z.infer<typeof criarProdutoFormSchema>;
