import { z } from "zod";

export const statusResponse = z
  .object({
    isSuccess: z.boolean(),
    title: z.string(),
    description: z.string().optional(),
  })
  .nullable();

export type StatusResponse = z.infer<typeof statusResponse>;
