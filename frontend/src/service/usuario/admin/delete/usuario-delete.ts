import kmbApi from "@/lib/axios/useKmbApi";
import { UsuarioValidator, usuarioSchema } from "@/utils/validators/Usuario";

export async function deleteUsuario(uuid: string): Promise<UsuarioValidator> {
  const { data } = await kmbApi.post<UsuarioValidator>(
    `/usuario/admin/${uuid}`,
  );

  if (usuarioSchema.safeParse(data).success) {
    return data;
  } else {
    console.warn("[Data] => ", data);
    console.warn("[Error] => ", usuarioSchema.safeParse(data));
    throw new Error();
  }
}
