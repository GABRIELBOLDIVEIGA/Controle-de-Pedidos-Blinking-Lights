import { z } from "zod";
import { enderecoSchema } from "./Endereco";
import { permissaoSchema } from "../enums/Permicao";

export const usuarioSchema = z.object({
  endereco: enderecoSchema,
  _id: z.string(),
  nome: z.string(),
  avatar: z.string(),
  documento: z.string(),
  razao_social: z.string(),
  email: z.string().email(),
  telefone: z.string(),
  observacoes: z.string(),
  senha: z.string().optional(),
  ativo: z.boolean(),
  permissao: permissaoSchema,
  isDeleted: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type UsuarioValidator = z.infer<typeof usuarioSchema>;
