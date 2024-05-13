import { totalDoPedidoV2 } from "@/utils/helpers/calculosProduto/v2/total-pedido-v2";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
import { PedidoValidator } from "@/utils/validators/Pedido";
import { Text } from "@react-pdf/renderer";

export const Total = (pedido: PedidoValidator) => {
  return (
    <div
      style={{
        border: "2px solid black",
        padding: "2px",
        marginTop: "5px",
        fontSize: "10px",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text>Total do Pedido</Text>
      <Text style={{ width: "25%" }}>
        {pedido && currencyFormt(totalDoPedidoV2(pedido.produtos))}
      </Text>
    </div>
  );
};
