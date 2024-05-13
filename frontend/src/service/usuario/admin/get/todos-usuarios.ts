import kmbApi from "@/lib/axios/useKmbApi";
import { UsuarioValidator, usuarioSchema } from "@/utils/validators/Usuario";

interface IFetchTodosUsuario {
  page: number;
  limit: number;
}
export async function fetchTodosUsuario({
  page,
  limit,
}: IFetchTodosUsuario): Promise<Array<UsuarioValidator>> {
  const { data } = await kmbApi.get<UsuarioValidator[]>(
    `/usuario/admin?page=${page}&limit=${limit}`,
  );

  if (usuarioSchema.array().safeParse(data).success) {
    return data;
  } else {
    console.warn("[Data] => ", data);
    console.warn("[Error] => ", usuarioSchema.array().safeParse(data));
    throw new Error();
  }
}
