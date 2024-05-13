import kmbApi from "@/lib/axios/useKmbApi";
import { UsuarioValidator } from "@/utils/validators/Usuario";
import { Criar_Usuario_Form } from "./usuario-form.type";

export async function criarUsuario(
  cliente: Criar_Usuario_Form,
): Promise<UsuarioValidator> {
  const { data } = await kmbApi.post<UsuarioValidator>(
    "/usuario/admin",
    cliente,
  );

  return data;
}
