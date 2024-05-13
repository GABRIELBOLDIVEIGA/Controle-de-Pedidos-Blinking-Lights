import { PedidoValidator } from "@/utils/validators/Pedido";
import { Text } from "@react-pdf/renderer";

export const Cliente = (pedido: PedidoValidator) => {
  return (
    <>
      <div
        style={{
          height: "35px",
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
          borderRight: "1px solid black",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            padding: "5px",
            borderLeft: "1px solid black",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: "8px" }}>RAZÃO SOCIAL</Text>
          <Text style={{ fontSize: "8px" }}>{`${pedido?.cliente.nome}`}</Text>
        </div>

        <div
          style={{
            padding: "5px",
            borderLeft: "1px solid black",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: "8px" }}>CNPJ</Text>
          <Text style={{ fontSize: "8px" }}>{pedido?.cliente.documento}</Text>
        </div>

        <div
          style={{
            padding: "5px",
            borderLeft: "1px solid black",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: "8px" }}>INSCRIÇÃO ESTADUAL</Text>
          <Text style={{ fontSize: "8px" }}>
            {pedido?.cliente.inscricao_estadual}
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
            width: "50%",
            padding: "5px",
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: "8px" }}>ENDEREÇO</Text>
          <Text style={{ fontSize: "8px" }}>
            {pedido?.cliente.endereco.logradouro}
          </Text>
        </div>

        <div
          style={{
            width: "20%",
            padding: "5px",
            borderRight: "1px solid black",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: "8px" }}>NÚMERO</Text>
          <Text style={{ fontSize: "8px" }}>
            {pedido?.cliente.endereco.numero}
          </Text>
        </div>

        <div
          style={{
            width: "30%",
            padding: "5px",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: "8px" }}>COMPLEMENTO</Text>
          <Text style={{ fontSize: "8px" }}>
            {pedido?.cliente.endereco.complemento}
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
            width: "30%",
            padding: "5px",
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: "8px" }}>BAIRRO</Text>
          <Text style={{ fontSize: "8px" }}>
            {pedido?.cliente.endereco.bairro}
          </Text>
        </div>
        <div
          style={{
            width: "30%",
            padding: "5px",
            borderRight: "1px solid black",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: "8px" }}>CIDADE</Text>
          <Text style={{ fontSize: "8px" }}>
            {pedido?.cliente.endereco.localidade}
          </Text>
        </div>
        <div
          style={{
            width: "30%",
            padding: "5px",
            borderRight: "1px solid black",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: "8px" }}>UF</Text>
          <Text style={{ fontSize: "8px" }}>{pedido?.cliente.endereco.uf}</Text>
        </div>
        <div
          style={{
            width: "30%",
            padding: "5px",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: "8px" }}>CEP</Text>
          <Text style={{ fontSize: "8px" }}>
            {pedido?.cliente.endereco.cep}
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
            width: "30%",
            padding: "5px",
            borderLeft: "1px solid black",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: "8px" }}>EMAIL</Text>
          <Text style={{ fontSize: "8px" }}>{pedido?.cliente.email}</Text>
        </div>
        <div
          style={{
            width: "30%",
            padding: "5px",
            borderLeft: "1px solid black",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: "8px" }}>CONTATO</Text>
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
          <Text style={{ fontSize: "8px" }}>TELEFONE</Text>
          <Text style={{ fontSize: "8px" }}>{pedido?.cliente.telefone}</Text>
        </div>
      </div>
    </>
  );
};
