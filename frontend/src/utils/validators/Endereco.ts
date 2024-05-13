import { z } from "zod";

export const enderecoSchema = z.object({
  cep: z.string(),
  logradouro: z.string(),
  complemento: z.string(),
  bairro: z.string(),
  localidade: z.string(),
  uf: z.string(),
  numero: z.string(),
});

export type EnderecoValidator = z.infer<typeof enderecoSchema>;
