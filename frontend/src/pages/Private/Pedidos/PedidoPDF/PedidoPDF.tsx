import { usePedidoDetalhadoQuery } from "@/hooks/queries/pedido/usePedidoDetalhadoQuery";
import {
  Page,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { PedidoValidator } from "@/utils/validators/Pedido";
import { RodapePedidoPDF } from "@/components/Pedido-PDF/rodape";
import { Produtos } from "@/components/Pedido-PDF/produtos";
import { Total } from "@/components/Pedido-PDF/total";
import { Cabecalho } from "@/components/Pedido-PDF/cabecalho";
import { Cliente } from "@/components/Pedido-PDF/cliente";
import { CabecalhoProdutos } from "@/components/Pedido-PDF/cabecalho-produtos";
import { Loader } from "lucide-react";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  container: {
    padding: 5,
    flexGrow: 1,
    border: "3px solid back",
    margin: "20px",
  },
});

export const PedidoPDF = () => {
  const { pedidoDetalhadoQuery } = usePedidoDetalhadoQuery();
  const [pedido, setPedido] = useState<PedidoValidator>();

  useEffect(() => {
    if (pedidoDetalhadoQuery.data) {
      setPedido(pedidoDetalhadoQuery.data);
    }
  }, [pedidoDetalhadoQuery.data]);

  return (
    <div className="h-[100vh]">
      {pedidoDetalhadoQuery.isFetching ? (
        <div className="flex justify-center pt-6">
          <Loader size={18} className="animate-spin" />
        </div>
      ) : (
        <PDFViewer width="100%" height="100%">
          <Document title={pedido?.codigo} creator="KMB Rodízios">
            <Page size="A4" style={styles.page}>
              {pedido && (
                <View style={styles.container}>
                  <Cabecalho {...pedido} />
                  <body
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <View>
                      <Cliente {...pedido} />

                      <CabecalhoProdutos />
                      <Produtos produtos={pedido.produtos} />

                      <Total {...pedido} />
                    </View>

                    <RodapePedidoPDF {...pedido} />
                  </body>
                </View>
              )}
            </Page>
          </Document>
        </PDFViewer>
      )}
    </div>
  );
};
