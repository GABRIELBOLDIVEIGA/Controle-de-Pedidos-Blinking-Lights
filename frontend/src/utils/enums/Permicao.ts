import { z } from "zod";

export const permissaoSchema = z.enum(["DEV", "ADM", "USER"]);

export type Permissao = z.infer<typeof permissaoSchema>;
