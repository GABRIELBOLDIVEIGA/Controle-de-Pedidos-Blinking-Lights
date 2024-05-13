import { useForm } from "react-hook-form";
import {
  EsqueciMinhaSenhaFormType,
  esqueciMinhaSenhaSchema,
} from "./validator/esqueciMinhaSenhaFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { StatusResponse } from "@/lib/axios/statusResponse";
import { errorHandler } from "@/lib/axios/axiosErrorHandler";
import { useEsqueciMinhaSenhaMutation } from "@/hooks/mutations/auth/useEsqueciMinhaSenhaMutation";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useFormEsqueciMinhaSenha = () => {
  const [statusResponse, setStatusResponse] = useState<StatusResponse>(null);
  const form = useForm<EsqueciMinhaSenhaFormType>({
    resolver: zodResolver(esqueciMinhaSenhaSchema),
  });
  const { esqueciMinhaSenhaMutation } = useEsqueciMinhaSenhaMutation();
  const navigate = useNavigate();

  const submit = (data: EsqueciMinhaSenhaFormType) => {
    esqueciMinhaSenhaMutation.mutate(data.email, {
      onSuccess: () => {
        setStatusResponse({
          isSuccess: true,
          title: "Nova senha gerada com sucesso.",
          description: `Uma nova senha foi enviada para o e-mail ${data.email}.`,
        });
        toast.success("Nova Senha enviada para seu email", { duration: 2000 });
        setTimeout(() => {
          navigate("/login");
        }, 2100);
      },
      onError: (err) => {
        setStatusResponse(errorHandler(err));
      },
    });
  };

  const resetStatus = () => {
    setStatusResponse(null);
  };

  return {
    form,
    submit,
    esqueciMinhaSenhaMutation,
    statusResponse,
    resetStatus,
    Toaster,
  };
};
