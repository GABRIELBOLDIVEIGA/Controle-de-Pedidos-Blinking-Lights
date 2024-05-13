import { z } from "zod";
import { login_form_schema } from "./login-form.schema";

export type Login_Form = z.infer<typeof login_form_schema>;
