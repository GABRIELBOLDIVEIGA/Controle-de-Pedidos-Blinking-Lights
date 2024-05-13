import { etapaSchema } from "@/utils/enums/Etapa";
import { itemPedidoSchema } from "@/utils/validators/ItemPedido";
import { z } from "zod";

export const detalhes_do_pedido_schema = z.object({
  _id: z.string(),
  cliente: z.string(),
  usuario: z.string(),
  produtos: itemPedidoSchema.array(),
  etapa: etapaSchema,
  condicao_pagamento: z.string(),

  prazo_entrega: z.date(),
  codigo_de_barra: z.string().optional().default(""),
  transportadora: z.string().optional().default(""),
  observacoes: z.string().optional().default(""),
  entrega_coleta: z.string().optional().default(""),
  telefone: z.string().optional().default(""),
  pedido_especial: z.string().optional().default(""),
});

export type DetathlesDoPedidoFormType = z.infer<
  typeof detalhes_do_pedido_schema
>;
