import kmbApi from "@/lib/axios/useKmbApi";
import { ClienteValidator, clienteSchema } from "@/utils/validators/Cliente";

export async function fetchClientesByUsuarioID(
  page: number,
  limit: number,
): Promise<ClienteValidator[]> {
  const { data } = await kmbApi.get<ClienteValidator[]>(
    `/cliente/ClientesByUserId?page=${page}&limit=${limit}`,
  );

  if (clienteSchema.array().safeParse(data).success) {
    return data;
  } else {
    console.warn("[Data] => ", data);
    console.warn(clienteSchema.array().safeParse(data));
    throw new Error();
  }
}
