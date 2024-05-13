import { z } from "zod";

export const login_form_schema = z.object({
  email: z.string().email(),
  senha: z.string(),
});
