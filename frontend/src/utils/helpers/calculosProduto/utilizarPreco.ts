import { ItemPedidoValidator } from "@/utils/validators/ItemPedido";

/** retorna o preco a ser utilizado com base em promoção ativa ou não */
export const utilizarPreco = ({ ...produto }: ItemPedidoValidator) => {
  const preco = produto.item.promocao_ativa
    ? produto.item.preco_promocional
    : produto.item.preco;

  // const preco_base = produto.com_codigo_de_barra ? preco + 0.05 : preco;

  return preco;
};
