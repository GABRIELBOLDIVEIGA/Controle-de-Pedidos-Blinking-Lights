import kmbApi from "@/lib/axios/useKmbApi";
import { UsuarioValidator } from "@/utils/validators/Usuario";
import { Editar_Usuario_Form } from "./editar-usuario-form.type";
import { EditarPerfilFormType } from "@/pages/Private/Usuarios/Pefil/form/validator/editarPerfil.schema";

type IEditarUsuario = {
  id: string;
} & (Editar_Usuario_Form | EditarPerfilFormType);

export async function editarUsuario({ id, ...usuario }: IEditarUsuario) {
  const { data } = await kmbApi.patch<UsuarioValidator>(
    `/usuario/${id}`,
    usuario,
  );

  return data;
}
