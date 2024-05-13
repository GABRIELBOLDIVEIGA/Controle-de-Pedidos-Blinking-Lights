import { z } from "zod";

export const viaCepSchema = z.object({
  bairro: z.string(),
  cep: z.string(),
  complemento: z.string(),
  ddd: z.string(),
  gia: z.string(),
  ibge: z.string(),
  localidade: z.string(),
  logradouro: z.string(),
  siafi: z.string(),
  uf: z.string(),
});

export type ViaCEPValidator = z.infer<typeof viaCepSchema>;
