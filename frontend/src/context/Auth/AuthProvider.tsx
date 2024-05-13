import { AuthContext } from "./AuthContext";
import { useState, useLayoutEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { UsuarioAuth, usuarioAuthSchema } from "./Usuario";
import { StatusResponse } from "@/lib/axios/statusResponse";
import { LoginForm } from "@/pages/Public/Login/CardLogin/form/validator/loginFormSchema";
import { fetchLogin } from "@/service/auth/post/login";
import { useMutation } from "@tanstack/react-query";
import { errorHandler } from "@/lib/axios/axiosErrorHandler";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<UsuarioAuth | null>(null);
  const [statusResponse, setStatusResponse] = useState<StatusResponse | null>(
    null,
  );

  useLayoutEffect(() => {
    loadUser();
  }, []);

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: fetchLogin,
  });

  const singin = async (data: LoginForm) => {
    mutate(data, {
      onSuccess: (response) => {
        setUser(jwtDecode(response.access_token.token));
        localStorage.setItem("access_token", response.access_token.token);
      },
      onError: (error) => {
        setStatusResponse(errorHandler(error));
      },
    });
  };

  const singout = () => {
    setUser(null);
    removeAccessToken();
  };

  const removeAccessToken = () => {
    localStorage.removeItem("access_token");
  };

  const loadUser = () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const parse = usuarioAuthSchema.safeParse(jwtDecode(access_token));
      setUser(parse.success ? parse.data : null);
    }
  };

  const resetError = () => {
    setStatusResponse(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        singin,
        singout,
        loading: isPending,
        statusResponse,
        resetError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
