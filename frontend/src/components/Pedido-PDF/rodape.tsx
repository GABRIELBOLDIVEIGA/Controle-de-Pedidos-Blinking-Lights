import { PedidoValidator } from "@/utils/validators/Pedido";
import { Text, View } from "@react-pdf/renderer";
import { adiconaObservacoes } from "./observacoes";

export const RodapePedidoPDF = (pedido: PedidoValidator) => {
  return (
    <View style={{ padding: "2px 5px", border: "3px solid black" }}>
      <Text
        style={{
          fontSize: "12px",
          padding: "5px",
          borderRight: "1px solid black",
          borderLeft: "1px solid black",
          borderTop: "1px solid black",
        }}
      >
        OBSERVACOES DO PEDIDO
      </Text>

      <div style={{ borderTop: "1px solid black" }}>
        <div
          style={{
            height: "35px",
            borderBottom: "1px solid black",
            borderRight: "1px solid black",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "60%",
              padding: "5px",
              borderLeft: "1px solid black",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: "8px" }}>PAGAMENTO</Text>
            <Text style={{ fontSize: "8px" }}>
              {pedido?.condicao_pagamento}
            </Text>
          </div>
          <div
            style={{
              width: "40%",
              padding: "5px",
              borderLeft: "1px solid black",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: "8px" }}>
              CODIGO DE BARRAS (ACRESCENTAR 0,05/UNIT)
            </Text>
            <Text
              style={{
                fontSize: "6px",
              }}
            >
              {pedido && adiconaObservacoes(pedido)},
            </Text>
          </div>
        </div>

        <div
          style={{
            height: "35px",
            borderBottom: "1px solid black",
            borderRight: "1px solid black",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "40%",
              padding: "5px",
              borderLeft: "1px solid black",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: "8px" }}>TRANSPORTADORA(FOB)</Text>
            <Text style={{ fontSize: "8px" }}>{pedido?.transportadora}</Text>
          </div>
          <div
            style={{
              width: "30%",
              padding: "5px",
              borderLeft: "1px solid black",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: "8px" }}>TELEFONE</Text>
            <Text style={{ fontSize: "8px" }}> </Text>
          </div>
          <div
            style={{
              width: "30%",
              padding: "5px",
              borderLeft: "1px solid black",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: "8px" }}>ENTREGA OU COLETA</Text>
            <Text style={{ fontSize: "8px" }}>{pedido?.entrega_coleta}</Text>
          </div>
        </div>

        <div
          style={{
            height: "35px",
            borderBottom: "1px solid black",
            borderRight: "1px solid black",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "50%",
              padding: "5px",
              borderLeft: "1px solid black",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: "8px" }}>PRAZO DE ENTREGA</Text>
            <Text style={{ fontSize: "8px" }}>
              {pedido?.prazo_entrega
                ? new Date(pedido.prazo_entrega).toLocaleDateString()
                : ""}
            </Text>
          </div>
          <div
            style={{
              width: "30%",
              padding: "5px",
              borderLeft: "1px solid black",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: "8px" }}>PEDIDO ESPECIAL</Text>
            <Text style={{ fontSize: "8px" }}>{pedido?.pedido_especial}</Text>
          </div>
        </div>
        <div
          style={{
            height: "50px",
            borderBottom: "1px solid black",
            borderRight: "1px solid black",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "5px",
              borderLeft: "1px solid black",
              gap: "5px",
            }}
          >
            <Text style={{ fontSize: "8px" }}>DEMAIS OBSERVACOES</Text>
            <Text
              style={{
                fontSize: "8px",
              }}
            >
              {pedido?.observacoes.replace("\n", " ")}
            </Text>
          </div>
        </div>
      </div>
    </View>
  );
};
