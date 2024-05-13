import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm, loginFormSchema } from "./validator/loginFormSchema";
import { useContext } from "react";
import { AuthContext } from "@/context/Auth/AuthContext";

export const useLoginForm = () => {
  const { singin, statusResponse, loading } = useContext(AuthContext);
  const form = useForm<LoginForm>({ resolver: zodResolver(loginFormSchema) });

  const submit = (data: LoginForm) => {
    singin(data);
  };

  return { form, submit, statusResponse, loading };
};
