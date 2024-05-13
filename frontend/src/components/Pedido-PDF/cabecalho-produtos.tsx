import { Text } from "@react-pdf/renderer";

export const CabecalhoProdutos = () => {
  return (
    <div
      style={{
        border: "1px solid black",
        display: "flex",
        flexDirection: "row",
        marginTop: "5px",
      }}
    >
      <Text
        style={{
          width: "5%",
          padding: "2px 0 2px 0",
          textAlign: "center",
          fontSize: "8px",
          borderRight: "1px solid black",
        }}
      >
        ITEM
      </Text>
      <Text
        style={{
          width: "7%",
          padding: "2px 0 2px 0",
          textAlign: "center",
          fontSize: "8px",
          borderRight: "1px solid black",
        }}
      >
        QUANT
      </Text>
      <Text
        style={{
          width: "15%",
          padding: "2px 0 2px 0",
          textAlign: "center",
          fontSize: "8px",
          borderRight: "1px solid black",
        }}
      >
        CÓDIGO
      </Text>
      <Text
        style={{
          width: "15%",
          padding: "2px 0 2px 0",
          textAlign: "center",
          fontSize: "8px",
          borderRight: "1px solid black",
        }}
      >
        DESCRIÇÃO
      </Text>
      <Text
        style={{
          width: "12%",
          padding: "2px 0 2px 0",
          textAlign: "center",
          fontSize: "8px",
          borderRight: "1px solid black",
        }}
      >
        PREÇO UNIT
      </Text>
      <Text
        style={{
          width: "6%",
          padding: "2px 0 2px 0",
          textAlign: "center",
          fontSize: "8px",
          borderRight: "1px solid black",
        }}
      >
        DESC
      </Text>
      <Text
        style={{
          width: "6%",
          padding: "2px 0 2px 0",
          textAlign: "center",
          fontSize: "8px",
          borderRight: "1px solid black",
        }}
      >
        DESC
      </Text>
      <Text
        style={{
          width: "6%",
          padding: "2px 0 2px 0",
          textAlign: "center",
          fontSize: "8px",
          borderRight: "1px solid black",
        }}
      >
        DESC
      </Text>
      <Text
        style={{
          width: "10%",
          padding: "2px 0 2px 0",
          textAlign: "center",
          fontSize: "8px",
          borderRight: "1px solid black",
        }}
      >
        UNI C/ DESC
      </Text>
      <Text
        style={{
          width: "10%",
          padding: "2px 0 2px 0",
          textAlign: "center",
          fontSize: "8px",
          borderRight: "1px solid black",
        }}
      >
        TOTAL
      </Text>
      <Text
        style={{
          width: "5%",
          padding: "2px 0 2px 0",
          textAlign: "center",
          fontSize: "8px",
          borderRight: "1px solid black",
        }}
      >
        ICMS
      </Text>
      <Text
        style={{
          width: "3%",
          padding: "2px 0 2px 0",
          textAlign: "center",
          fontSize: "8px",
        }}
      >
        IPI
      </Text>
    </div>
  );
};
