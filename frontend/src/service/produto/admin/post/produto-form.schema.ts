import { z } from "zod";

export const criar_produto_form = z.object({
  codigo: z.string().min(3),

  descricao: z.string().min(3),

  preco: z.coerce.number().min(0),

  preco_promocional: z.coerce.number().min(0).optional(),

  ativo: z.boolean(),

  promocao_ativa: z.boolean(),

  favorito: z.boolean(),
});
