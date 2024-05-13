import { z } from "zod";
import { criar_usuario_form } from "./usuario-form.schema";

export type Criar_Usuario_Form = z.infer<typeof criar_usuario_form>;
