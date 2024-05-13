import { z } from "zod";

export const cliente_table_schema = z.object({
  _id: z.string(),
  endereco: z.string(),
  nome: z.string(),
  documento: z.string(),
  inscricao_estadual: z.string(),
  razao_social: z.string(),
  telefone: z.string(),
  email: z.string(),
  observacoes: z.string(),
  usuario_responsavel: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ClienteTable = z.infer<typeof cliente_table_schema>;
