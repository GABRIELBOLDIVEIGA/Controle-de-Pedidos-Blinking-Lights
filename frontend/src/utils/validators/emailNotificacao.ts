import { z } from "zod";

export const email_notificacao_schema = z.object({
  _id: z.string(),
  nome: z.string(),
  email: z.string().email(),
});

export type EmailNotificacaoValidator = z.infer<
  typeof email_notificacao_schema
>;
