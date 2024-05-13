import { etapaSchema } from "@/utils/enums/Etapa";
import { itemPedidoSchema } from "@/utils/validators/ItemPedido";
import { z } from "zod";

export const post_pedido_schema = z.object({
  cliente: z.string(),
  usuario: z.string(),
  produtos: itemPedidoSchema.array(),
  etapa: etapaSchema,
  condicao_pagamento: z.string().optional(),
  transportadora: z.string().optional(),
  codigo_de_barra: z.string().optional(),
  observacoes: z.string().optional(),
  prazo_entrega: z.date(),
  telefone: z.string().optional(),
  entrega_coleta: z.string().optional(),
  pedido_especial: z.string().optional(),
});

export type PostPedido = z.infer<typeof post_pedido_schema>;
