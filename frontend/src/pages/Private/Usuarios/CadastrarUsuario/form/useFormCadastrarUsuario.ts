import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CadastrarUsuarioFormType,
  cadastrarusuarioFormSchema,
} from "./validator/cadastrarUsuario.schema";
import { useEffect, useState } from "react";
import { StatusResponse } from "@/lib/axios/statusResponse";
import { errorHandler } from "@/lib/axios/axiosErrorHandler";
import { queryClient } from "@/lib/react-query/queryClient";
import { useCriarUsuarioMutation } from "@/hooks/mutations/usuario/admin/useCriarUsuarioMutation";
import { useViaCepQuery } from "@/hooks/queries/via-cep/useViaCepQuery";

export const useFormCadastrarUsuario = () => {
  const [statusResponse, setStatusResponse] = useState<StatusResponse>(null);
  const form = useForm<CadastrarUsuarioFormType>({
    resolver: zodResolver(cadastrarusuarioFormSchema),
    defaultValues: {
      permissao: "USER",
      observacoes: "",
      razao_social: "",
      senha: "SenhaMuitoDificil123!",
      confirmarSenha: "SenhaMuitoDificil123!",
      ativo: true,
    },
  });

  const { mutate, isPending } = useCriarUsuarioMutation();
  const { data, isLoading, setCep } = useViaCepQuery();

  useEffect(() => {
    if (data) {
      form.setValue("endereco.logradouro", data.logradouro);
      form.setValue("endereco.localidade", data.localidade);
      form.setValue("endereco.bairro", data.bairro);
      form.setValue("endereco.uf", data.uf);
      form.setValue("endereco.complemento", data.complemento);
    }
  }, [data, form]);

  const fetchCEP = () => {
    const cep = form.getValues("endereco.cep");
    setCep(cep);
  };

  const submit = (data: CadastrarUsuarioFormType) => {
    mutate(data, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === "todos_usuario" ||
            query.queryKey[0] === "usuario",
        }),
          setStatusResponse({
            isSuccess: true,
            title: "Usuario cadastrado com sucesso.",
            description: `O Usuario ${data.nome} foi cadastrado com sucesso.`,
          });
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
    resetStatus,
    submit,
    fetchCEP,
    statusResponse,
    isLoading,
    isPending,
  };
};
