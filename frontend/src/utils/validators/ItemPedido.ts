import { z } from "zod";
import { produtoSchema } from "./Produto";

export const itemPedidoSchema = z.object({
  item: produtoSchema,
  quantidade: z.coerce.number().min(1),
  preco: z.coerce.number(),
  promocao_ativa: z.coerce.boolean(),
  preco_promocional: z.coerce.number(),
  com_preco_promocional: z.coerce.boolean(),
  com_codigo_de_barra: z.coerce.boolean(),
  descontos: z.array(z.coerce.number().min(0)).length(3),
  com_preco_especial: z.boolean().or(z.undefined()),
  preco_especial: z.coerce.number().min(0).default(0),
});

export type ItemPedidoValidator = z.infer<typeof itemPedidoSchema>;
