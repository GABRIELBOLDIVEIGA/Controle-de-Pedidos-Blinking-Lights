import { z } from "zod";
import { login_response_schema } from "./login-response.schema";

export type Login_Response = z.infer<typeof login_response_schema>;
