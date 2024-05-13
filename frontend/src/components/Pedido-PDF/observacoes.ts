import { PedidoValidator } from "@/utils/validators/Pedido";

export function adiconaObservacoes(pedido: PedidoValidator) {
  const primeiroProdutoDaLista = pedido?.produtos[0];
  const ultimoProdutoDaLista = pedido?.produtos[pedido.produtos.length - 1];

  const obs = pedido.produtos.map((produto) => {
    if (produto.com_codigo_de_barra) {
      if (produto.item.codigo === primeiroProdutoDaLista?.item.codigo) {
        return ` ${produto.item.codigo}, `;
      }
      if (produto.item.codigo === ultimoProdutoDaLista?.item.codigo) {
        return ` ${produto.item.codigo}`;
      }
      return `${produto.item.codigo}, `;
    }
  });

  return obs;
}
