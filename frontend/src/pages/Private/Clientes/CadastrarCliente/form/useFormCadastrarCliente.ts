import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CadastrarClienteFormType,
  cadastrarClienteFormSchema,
} from "./validator/cadastrarCliente";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/Auth/AuthContext";
import { permissaoSchema } from "@/utils/enums/Permicao";
import { StatusResponse } from "@/lib/axios/statusResponse";
import { errorHandler } from "@/lib/axios/axiosErrorHandler";
import { useCriarClienteMutation } from "@/hooks/mutations/cliente/useCriarClienteMutation";
import { useViaCepQuery } from "@/hooks/queries/via-cep/useViaCepQuery";
import { queryClient } from "@/lib/react-query/queryClient";

export const useFormCadastrarCliente = () => {
  const [statusResponse, setStatusResponse] = useState<StatusResponse>(null);
  const { user } = useContext(AuthContext);
  const form = useForm<CadastrarClienteFormType>({
    resolver: zodResolver(cadastrarClienteFormSchema),
    defaultValues: {
      observacoes: "",
      endereco: {
        complemento: "",
        cep: "",
        logradouro: "",
        bairro: "",
        localidade: "",
        uf: "",
        numero: "",
      },
      usuario_responsavel:
        user?.permissao === permissaoSchema.Enum.USER
          ? user.user_id
          : undefined,
    },
  });
  const { mutate, isPending } = useCriarClienteMutation();
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

  const submit = (data: CadastrarClienteFormType) => {
    console.log(data);
    mutate(data, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "clientes_do_usuario",
        }),
          setStatusResponse({
            isSuccess: true,
            title: "Cliente cadastrado com sucesso.",
            description: `O cliente ${data.nome} foi cadastrado com sucesso.`,
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
    submit,
    fetchCEP,
    isLoading,
    statusResponse,
    resetStatus,
    isPending,
  };
};
