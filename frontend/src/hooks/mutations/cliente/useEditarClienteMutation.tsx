import { editarCliente } from "@/service/cliente/patch/editar-cliente";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useEditarClienteMutation = () => {
  const [, setClienteID] = useState<string>();

  const editarClienteMutation = useMutation({
    mutationKey: ["editar_cliente_mutation"],
    mutationFn: editarCliente,
  });

  return { editarClienteMutation, setClienteID };
};
