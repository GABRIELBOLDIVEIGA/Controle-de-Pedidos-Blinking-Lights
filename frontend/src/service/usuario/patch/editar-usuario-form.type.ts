import { z } from "zod";
import { usuario_form_schema } from "./editar-usuario-form.schema";

export type Editar_Usuario_Form = z.infer<typeof usuario_form_schema>;
