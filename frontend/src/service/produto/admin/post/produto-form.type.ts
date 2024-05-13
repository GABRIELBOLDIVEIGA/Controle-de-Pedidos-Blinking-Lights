import { z } from "zod";
import { criar_produto_form } from "./produto-form.schema";

export type Criar_Produto_Form = z.infer<typeof criar_produto_form>;
