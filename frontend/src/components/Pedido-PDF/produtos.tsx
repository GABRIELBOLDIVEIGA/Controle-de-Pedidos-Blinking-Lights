// import { calcaulaTotalComDescontos } from "@/utils/helpers/calculosProduto/calcaulaTotalComDescontos";
import { calculaPrecoComDescontos } from "@/utils/helpers/calculosProduto/calculaPrecoComDescontos";
import { custoAdicionalCodigoDeBarras } from "@/utils/helpers/calculosProduto/custoAdicionalCodigoDeBarras";
import { totalComDescontoV2 } from "@/utils/helpers/calculosProduto/v2/total-com-desconto-v2";
import { utilizarPrecoV2 } from "@/utils/helpers/calculosProduto/v2/utilizar-preco-v2";
// import { utilizarPreco } from "@/utils/helpers/calculosProduto/utilizarPreco";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
import { PedidoValidator } from "@/utils/validators/Pedido";
import { Text } from "@react-pdf/renderer";

interface IProps {
  produtos: PedidoValidator["produtos"];
}

export const Produtos = (produtos: IProps) => {
  return (
    <>
      {produtos.produtos.map((produto, index) => (
        <div
          style={{
            borderBottom: "1px solid black",
            borderLeft: "1px solid black",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              padding: "2px 0 2px 2px",
              width: "5%",
              fontSize: "8px",
              borderRight: "1px solid black",
            }}
          >
            {index + 1}
          </Text>
          <Text
            style={{
              textAlign: "left",
              padding: "2px 0 2px 2px",
              width: "7%",
              fontSize: "8px",
              borderRight: "1px solid black",
            }}
          >
            {produto.quantidade}
          </Text>
          <Text
            style={{
              textAlign: "left",
              padding: "2px 0 2px 2px",
              width: "15%",
              fontSize: "8px",
              borderRight: "1px solid black",
            }}
          >
            {produto.item.codigo}
          </Text>
          <Text
            style={{
              textAlign: "left",
              padding: "2px 0 2px 2px",
              width: "15%",
              fontSize: "8px",
              borderRight: "1px solid black",
            }}
          >
            {produto.item.descricao}
          </Text>
          <Text
            style={{
              textAlign: "left",
              padding: "2px 0 2px 2px",
              width: "12%",
              fontSize: "8px",
              borderRight: "1px solid black",
            }}
          >
            {!produto.com_preco_especial && !produto.com_preco_promocional
              ? currencyFormt(produto.preco)
              : ""}

            {produto.com_preco_promocional
              ? currencyFormt(produto.preco_promocional)
              : ""}
            {produto.com_preco_especial
              ? currencyFormt(produto.preco_especial)
              : ""}

            {/* {`${
              produto.item.promocao_ativa
                ? currencyFormt(produto.item.preco_promocional)
                : currencyFormt(produto.item.preco)
            }`} */}
          </Text>
          <Text
            style={{
              textAlign: "center",
              padding: "2px 0 2px 2px",
              width: "6%",
              fontSize: "8px",
              borderRight: "1px solid black",
            }}
          >{`${produto.descontos[0]}%`}</Text>
          <Text
            style={{
              textAlign: "center",
              padding: "2px 0 2px 2px",
              width: "6%",
              fontSize: "8px",
              borderRight: "1px solid black",
            }}
          >{`${produto.descontos[1]}%`}</Text>
          <Text
            style={{
              textAlign: "center",
              padding: "2px 0 2px 2px",
              width: "6%",
              fontSize: "8px",
              borderRight: "1px solid black",
            }}
          >{`${produto.descontos[2]}%`}</Text>
          <Text
            style={{
              textAlign: "left",
              padding: "2px 0 2px 2px",
              width: "10%",
              fontSize: "8px",
              borderRight: "1px solid black",
            }}
          >
            {produto.com_codigo_de_barra
              ? currencyFormt(
                  calculaPrecoComDescontos(
                    utilizarPrecoV2(produto),
                    produto.descontos,
                  ) + 0.05,
                )
              : currencyFormt(
                  calculaPrecoComDescontos(
                    utilizarPrecoV2(produto),
                    produto.descontos,
                  ),
                )}
          </Text>
          <Text
            style={{
              textAlign: "left",
              padding: "2px 0 2px 2px",
              width: "10%",
              fontSize: "8px",
              borderRight: "1px solid black",
            }}
          >
            {currencyFormt(
              totalComDescontoV2(produto) +
                custoAdicionalCodigoDeBarras(produto),
            )}
          </Text>
          <Text
            style={{
              textAlign: "center",
              padding: "2px 0 2px 2px",
              width: "5%",
              fontSize: "8px",
              borderRight: "1px solid black",
            }}
          >{`0%`}</Text>
          <Text
            style={{
              textAlign: "center",
              padding: "2px 0 2px 2px",
              width: "3.2%",
              fontSize: "8px",
              borderRight: "1px solid black",
            }}
          >{`0%`}</Text>
        </div>
      ))}
    </>
  );
};
