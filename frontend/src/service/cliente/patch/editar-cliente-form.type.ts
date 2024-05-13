import { z } from "zod";
import { editar_cliente_form } from "./editar-cliente-form.schema";

export type Editar_Cliente_Form = z.infer<typeof editar_cliente_form>;
