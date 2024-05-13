import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  DetathlesDoPedidoFormType,
  detalhes_do_pedido_schema,
} from "./validator/detalhes";

import { useEffect } from "react";

import { useEditarPedidoStore } from "@/store/useEditarPedidoStore";

export const useDetalhesDoPedido = () => {
  const produtos = useEditarPedidoStore((state) => state.produtos);
  const cliente = useEditarPedidoStore((state) => state.cliente);
  const usuario = useEditarPedidoStore((state) => state.usuario);
  const detalhes = useEditarPedidoStore((state) => state.detalhes);

  const form = useForm<DetathlesDoPedidoFormType>({
    resolver: zodResolver(detalhes_do_pedido_schema),
    defaultValues: {
      _id: detalhes?._id,
      usuario: usuario?._id,
      cliente: cliente?._id,
      produtos: produtos,
      etapa: detalhes?.etapa,
      prazo_entrega: new Date(detalhes ? detalhes.prazo_entrega : new Date()),
      condicao_pagamento: detalhes?.condicao_pagamento,
      codigo_de_barra: detalhes?.codigo_de_barra,

      pedido_especial: detalhes?.pedido_especial,
      observacoes: detalhes?.observacoes,
    },
  });

  useEffect(() => {
    if (cliente && detalhes && produtos && usuario) {
      form.setValue("_id", detalhes._id);
      form.setValue("cliente", cliente._id);
      form.setValue("usuario", usuario._id);
      form.setValue("produtos", produtos);
      form.setValue("etapa", detalhes.etapa);
      form.setValue("prazo_entrega", new Date(detalhes.prazo_entrega));
      form.setValue("condicao_pagamento", detalhes.condicao_pagamento);
      form.setValue("codigo_de_barra", detalhes.codigo_de_barra);
      form.setValue("transportadora", detalhes.transportadora);
      form.setValue("telefone", detalhes.telefone);
      form.setValue("entrega_coleta", detalhes.entrega_coleta);
      form.setValue("pedido_especial", detalhes.pedido_especial);
      form.setValue("observacoes", detalhes.observacoes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cliente, detalhes, produtos, usuario]);

  return { form };
};
