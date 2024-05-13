import kmbApi from "@/lib/axios/useKmbApi";
import { Login_Form } from "./login-form.type";
import { Login_Response } from "./login-response.type";
import { login_response_schema } from "./login-response.schema";

export async function fetchLogin(form: Login_Form): Promise<Login_Response> {
  const { data } = await kmbApi.post<Login_Response>("/auth/login", form);

  if (login_response_schema.safeParse(data).success) {
    return data;
  } else {
    console.warn("[Data] => ", data);
    console.warn("[Error] => ", login_response_schema.safeParse(data));
    throw new Error();
  }
}
