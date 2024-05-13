import { ItemPedidoValidator } from "@/utils/validators/ItemPedido";
import { calcaulaTotalComDescontos } from "./calcaulaTotalComDescontos";
import { custoAdicionalCodigoDeBarras } from "./custoAdicionalCodigoDeBarras";

export const calculaTotalDoPedido = (produtos: ItemPedidoValidator[]) => {
  let total_compra = 0;
  produtos.forEach((produto) => {
    const total =
      calcaulaTotalComDescontos(produto) +
      custoAdicionalCodigoDeBarras(produto);
    total_compra += total;
  });

  return total_compra;
};
