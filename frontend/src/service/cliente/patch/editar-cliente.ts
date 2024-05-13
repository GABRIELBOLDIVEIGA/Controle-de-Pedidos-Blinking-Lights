import { ClienteValidator } from "@/utils/validators/Cliente";
import { Editar_Cliente_Form } from "./editar-cliente-form.type";
import kmbApi from "@/lib/axios/useKmbApi";

export async function editarCliente(
  cliente: Editar_Cliente_Form,
): Promise<ClienteValidator> {
  const { data } = await kmbApi.patch<ClienteValidator>(
    `/cliente/${cliente._id}`,
    cliente,
  );

  return data;
}
