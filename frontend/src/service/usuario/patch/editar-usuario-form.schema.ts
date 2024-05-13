import { permissaoSchema } from "@/utils/enums/Permicao";
import { enderecoSchema } from "@/utils/validators/Endereco";
import { z } from "zod";

export const usuario_form_schema = z.object({
  nome: z.string(),
  documento: z.string(),
  razao_social: z.string().optional(),
  email: z.string().email(),
  telefone: z.string().optional(),
  observacoes: z.string().optional(),
  ativo: z.boolean(),
  permicao: permissaoSchema.optional(),
  endereco: enderecoSchema,
});
