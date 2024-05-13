import { enderecoSchema } from "@/utils/validators/Endereco";
import { z } from "zod";

export const cliente_table_response_schema = z.object({
  _id: z.string(),
  endereco: enderecoSchema,
  nome: z.string(),
  documento: z.string(),
  inscricao_estadual: z.string(),
  razao_social: z.string(),
  telefone: z.string(),
  email: z.string(),
  observacoes: z.string(),
  usuario_responsavel: z.object({
    _id: z.string(),
    nome: z.string(),
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Cliente_Table_Response = z.infer<
  typeof cliente_table_response_schema
>;
