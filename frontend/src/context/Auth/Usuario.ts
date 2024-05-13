import { permissaoSchema } from "@/utils/enums/Permicao";
import { z } from "zod";

export const usuarioAuthSchema = z
  .object({
    sub: z.string(),
    user_id: z.string(),
    nome: z.string(),
    avatar: z.string(),
    email: z.string().email(),
    permissao: permissaoSchema,
  })
  .nullable();

export type UsuarioAuth = z.infer<typeof usuarioAuthSchema>;
