import { z } from "zod";

export const etapaSchema = z.enum(["ORCAMENTO", "ANALISE", "FINALIZADO"]);

export type Etapa = z.infer<typeof etapaSchema>;
