import { z } from "zod";
import { clienteSchema } from "./Cliente";
import { usuarioSchema } from "./Usuario";
import { itemPedidoSchema } from "./ItemPedido";
import { etapaSchema } from "../enums/Etapa";

export const pedidoSchema = z.object({
  _id: z.string(),
  codigo: z.string(),
  cliente: clienteSchema,
  usuario: usuarioSchema,
  produtos: itemPedidoSchema.array(),
  etapa: etapaSchema,
  condicao_pagamento: z.string(),
  transportadora: z.string(),
  codigo_de_barra: z.string(),
  observacoes: z.string(),
  prazo_entrega: z.string().datetime(),
  telefone: z.string(),
  entrega_coleta: z.string(),
  pedido_especial: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  utilizado_como_orcamento: z.boolean().optional(),
});

export type PedidoValidator = z.infer<typeof pedidoSchema>;
