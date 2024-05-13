import kmbApi from "@/lib/axios/useKmbApi";
import { ClienteValidator } from "@/utils/validators/Cliente";
import { Criar_Cliente_Form } from "./cliente-form.type";

export async function criarCliente(
  cliente: Criar_Cliente_Form,
): Promise<ClienteValidator> {
  const { data } = await kmbApi.post<ClienteValidator>("/cliente", cliente);

  return data;
}
