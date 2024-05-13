import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import logo from "@/assets/kmb_logo.png";
import { PedidoValidator } from "@/utils/validators/Pedido";

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    border: "2px solid black",
    marginBottom: "5px",
    height: "100px",
  },
});

export const Cabecalho = (pedido: PedidoValidator) => {
  return (
    <header>
      <View style={styles.header}>
        <Image style={{ width: "20%" }} src={logo} />
        <div>
          <Text style={{ fontSize: "8px", paddingBottom: "4px" }}>
            KMB RODÍZIOS
          </Text>
          <Text style={{ fontSize: "8px", paddingBottom: "4px" }}>
            05.440.364/0001-06
          </Text>
          <Text style={{ fontSize: "8px", paddingBottom: "4px" }}>
            Rua Professor Walter Wey, 237 - Pq Pereira -{" "}
          </Text>
          <Text style={{ fontSize: "8px", paddingBottom: "4px" }}>
            São Paulo - SP - Cep 03257-150
          </Text>
          <Text style={{ fontSize: "8px", paddingBottom: "4px" }}>
            kmb@kmbrodízios.com.br
          </Text>
          <Text style={{ fontSize: "8px" }}>11 2703-5745</Text>
        </div>
        <div
          style={{
            height: "100%",
            width: "45%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <Text
              style={{
                fontSize: "8px",
                padding: "5px",
                borderBottom: "1px solid black",
                borderLeft: "1px solid black",
              }}
            >
              {pedido?.etapa === "ORCAMENTO" && `PEDIDO DE VENDA Nº ORÇAMENTO`}
              {`PEDIDO DE VENDA Nº  ${pedido?.codigo}`}
            </Text>
            <Text
              style={{
                fontSize: "8px",
                padding: "5px",
                borderBottom: "1px solid black",
                borderLeft: "1px solid black",
              }}
            >
              DATA {`${new Date(`${pedido?.createdAt}`).toLocaleDateString()}`}
            </Text>
          </div>

          <div style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: "8px",
                padding: "5px",
                borderTop: "1px solid black",
                borderLeft: "1px solid black",
              }}
            >
              REPRESENTANTE
            </Text>
            <Text
              style={{
                fontSize: "8px",
                padding: "5px",
                width: "70%",
                borderTop: "1px solid black",
                borderLeft: "1px solid black",
              }}
            >{`${pedido?.usuario.nome}`}</Text>
          </div>
        </div>
      </View>
    </header>
  );
};
