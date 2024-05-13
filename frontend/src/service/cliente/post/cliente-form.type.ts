import { z } from "zod";
import { criar_cliente_form } from "./cliente-form.schema";

export type Criar_Cliente_Form = z.infer<typeof criar_cliente_form>;
