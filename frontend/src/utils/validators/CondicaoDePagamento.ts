import { z } from "zod";

export const consicaoDePagamentoValidator = z.object({
  _id: z.string(),
  descricao: z.string(),
  tipo: z.string(),
});

export type CondicaoDePagamentoValidator = z.infer<
  typeof consicaoDePagamentoValidator
>;
