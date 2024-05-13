import { AuthContext } from "@/context/Auth/AuthContext";
import { permissaoSchema } from "@/utils/enums/Permicao";
import { useContext } from "react";
import { AcoesAdmin } from "./acoes-admin";
import { AcoesUser } from "./acoes-user";

interface IProps {
  id: string;
}

export const Acoes = ({ id }: IProps) => {
  const { user } = useContext(AuthContext);

  if (user?.permissao === permissaoSchema.Enum.ADM)
    return <AcoesAdmin id={id} />;

  if (user?.permissao === permissaoSchema.Enum.DEV)
    return <AcoesAdmin id={id} />;

  if (user?.permissao === permissaoSchema.Enum.USER)
    return <AcoesUser id={id} />;
};
