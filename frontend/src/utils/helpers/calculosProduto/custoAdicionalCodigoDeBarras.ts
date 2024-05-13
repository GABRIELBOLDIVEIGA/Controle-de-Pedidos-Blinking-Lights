import { ItemPedidoValidator } from "@/utils/validators/ItemPedido";

export const custoAdicionalCodigoDeBarras = ({
  ...produto
}: ItemPedidoValidator) => {
  return produto.com_codigo_de_barra ? produto.quantidade * 0.05 : 0;
};
