import { ItemPedidoValidator } from "@/utils/validators/ItemPedido";

export const utilizarPrecoV2 = (produto: ItemPedidoValidator) => {
  let preco = produto.preco;

  if (produto.com_preco_especial) preco = produto.preco_especial;
  if (produto.com_preco_promocional) preco = produto.preco_promocional;

  return preco;
};
