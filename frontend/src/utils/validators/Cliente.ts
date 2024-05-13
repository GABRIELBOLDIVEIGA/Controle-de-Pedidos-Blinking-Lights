import { z } from "zod";
import { enderecoSchema } from "./Endereco";

export const clienteSchema = z.object({
  _id: z.string(),
  endereco: enderecoSchema,
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

export type ClienteValidator = z.infer<typeof clienteSchema>;
