import kmbApi from "@/lib/axios/useKmbApi";
import { UsuarioValidator, usuarioSchema } from "@/utils/validators/Usuario";

export async function fetchUsuarioByID(
  id: string | undefined,
): Promise<UsuarioValidator> {
  if (!id) throw new Error();

  const { data } = await kmbApi.get<UsuarioValidator>(`/usuario/${id}`);

  if (usuarioSchema.safeParse(data).success) {
    return data;
  } else {
    console.warn("[Data] => ", data);
    console.warn("[Error] => ", usuarioSchema.safeParse(data));
    throw new Error();
  }
}
