import { ItemPedidoValidator } from "@/utils/validators/ItemPedido";
import { totalComDescontoV2 } from "./total-com-desconto-v2";
import { custoAdicionalCodigoDeBarras } from "../custoAdicionalCodigoDeBarras";

export const totalDoPedidoV2 = (produtos: ItemPedidoValidator[]) => {
  let total_compra = 0;
  produtos.forEach((produto) => {
    const total =
      totalComDescontoV2(produto) + custoAdicionalCodigoDeBarras(produto);
    total_compra += total;
  });

  return total_compra;
};
