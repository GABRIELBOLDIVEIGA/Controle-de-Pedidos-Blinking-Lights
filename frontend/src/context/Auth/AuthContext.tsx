import { createContext } from "react";
import { UsuarioAuth } from "./Usuario";
import { StatusResponse } from "@/lib/axios/statusResponse";
import { LoginForm } from "@/pages/Public/Login/CardLogin/form/validator/loginFormSchema";

export type AuthContextType = {
  user: UsuarioAuth | null;
  singin: (credentials: LoginForm) => Promise<boolean | void>;
  singout: () => void;
  loading: boolean;
  statusResponse: StatusResponse | null;
  resetError: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);
AuthContext.displayName = "AuthContext";
