import { enderecoSchema } from "@/utils/validators/Endereco";
import { z } from "zod";

export const criar_cliente_form = z.object({
  usuario_responsavel: z.string(),

  nome: z.string().min(3),

  email: z.string().email(),

  documento: z.string(),

  inscricao_estadual: z.string(),

  razao_social: z.string(),

  observacoes: z.string(),

  endereco: enderecoSchema,
});
