import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Login } from "@/pages/Public/Login/Login";
import { permissaoSchema } from "@/utils/enums/Permicao";

type RequireDevAuthProps = {
  children?: JSX.Element;
};

const RequireDevAuth = ({ children }: RequireDevAuthProps) => {
  const auth = useContext(AuthContext);

  if (auth.user?.permissao != permissaoSchema.Enum.DEV) {
    return <Login />;
  }

  if (auth.user?.permissao === permissaoSchema.Enum.DEV) {
    return children;
  }

  return <></>;
};

export default RequireDevAuth;
