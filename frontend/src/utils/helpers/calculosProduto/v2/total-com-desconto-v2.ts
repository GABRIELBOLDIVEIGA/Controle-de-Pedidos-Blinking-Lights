import { ItemPedidoValidator } from "@/utils/validators/ItemPedido";
import { utilizarPrecoV2 } from "./utilizar-preco-v2";
import { calculaPrecoComDescontos } from "../calculaPrecoComDescontos";

export const totalComDescontoV2 = (produto: ItemPedidoValidator) => {
  const preco = utilizarPrecoV2(produto);

  const preco_final = calculaPrecoComDescontos(
    preco,
    produto.descontos,
  ).toFixed(2);

  return +preco_final * produto.quantidade;
};
