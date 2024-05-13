import { z } from "zod";

export const login_response_schema = z.object({
  access_token: z.object({
    token: z.string(),
  }),
});
