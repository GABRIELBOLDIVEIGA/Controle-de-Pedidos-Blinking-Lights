import { z } from "zod";

export const esqueciMinhaSenhaSchema = z.object({
  email: z.string().email("Forneça um email valido."),
});
export type EsqueciMinhaSenhaFormType = z.infer<typeof esqueciMinhaSenhaSchema>;
