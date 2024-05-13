import { ItemPedidoValidator } from "@/utils/validators/ItemPedido";
import { utilizarPreco } from "./utilizarPreco";
import { calculaPrecoComDescontos } from "./calculaPrecoComDescontos";

/** Calcaula Total com regras de negocio.
 * * Se promocao_ativa === true, preco_promocional sera utilizado como preço base de calculo.
 * * Se com_codigo_de_barra === true um valor definido pelo ADMIN será somado ao preço base. */
export const calcaulaTotalComDescontos = ({
  ...produto
}: ItemPedidoValidator) => {
  const preco = utilizarPreco(produto);

  const preco_final = calculaPrecoComDescontos(
    preco,
    produto.descontos,
  ).toFixed(2);

  return +preco_final * produto.quantidade;
};
