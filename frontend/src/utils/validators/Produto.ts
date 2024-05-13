import { z } from "zod";

export const produtoSchema = z.object({
  _id: z.string(),
  codigo: z.string(),
  descricao: z.string(),
  preco: z.coerce.number(),
  urlImg: z.string(),
  favorito: z.coerce.boolean(),
  ativo: z.coerce.boolean(),
  preco_promocional: z.coerce.number(),
  promocao_ativa: z.coerce.boolean(),
});

export type ProdutoValidator = z.infer<typeof produtoSchema>;
