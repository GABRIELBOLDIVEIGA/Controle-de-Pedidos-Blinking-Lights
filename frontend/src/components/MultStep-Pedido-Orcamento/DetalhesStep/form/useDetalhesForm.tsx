import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  DetathlesDoPedidoFormType,
  detalhes_do_pedido_schema,
} from "./validator/detalhes";
import { useProdutosStore } from "@/store/useProdutosStore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/Auth/AuthContext";
import { etapaSchema } from "@/utils/enums/Etapa";
import { useLocation } from "react-router-dom";

export const useDetalhesDoPedido = () => {
  const produtos = useProdutosStore((state) => state.produtos);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [etapa] = useState<
    typeof etapaSchema.Enum.ANALISE | typeof etapaSchema.Enum.ORCAMENTO
  >(etapaSchema.Enum.ANALISE);

  const form = useForm<DetathlesDoPedidoFormType>({
    resolver: zodResolver(detalhes_do_pedido_schema),
    defaultValues: {
      produtos: produtos,
      usuario: user?.user_id,
      etapa: etapa,
    },
  });

  useEffect(() => {
    if (location.pathname === "/orcamento/novo-orcamento") {
      form.setValue("etapa", etapaSchema.Enum.ORCAMENTO);
    }
  }, [form, location]);

  return { form };
};
