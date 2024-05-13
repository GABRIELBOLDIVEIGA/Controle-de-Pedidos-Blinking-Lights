import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
import { PedidoValidator } from "@/utils/validators/Pedido";
import CsvDownloader from "react-csv-downloader";

interface IProps {
  children?: React.ReactNode;
  pedido: PedidoValidator;
}

const columns = [
  "Pedido",
  " Cliente",
  " Empresa",
  " Data de emissão",
  " observações",
  "item",
  " Código do produto",
  " Descrição do produto",
  " Tipo de produto",
  " Método de ressuprimento",
  " U.M.",
  " Qtde",
  "  Preço unitário",
  " Data de entrega",
  " Pedido compra do cliente",
  " Item do Pedido compra do cliente",
  "Condição de pagamento",
  "Tabela de preço",
  "Setor de saída",
];

export const PedidoCsv = ({ children, pedido }: IProps) => {
  const datas = geraCsv(pedido);

  return (
    <CsvDownloader
      datas={datas}
      columns={columns}
      separator=";"
      filename={pedido.codigo}
    >
      {children}
    </CsvDownloader>
  );
};

const replaceChar = (frase: string): string => {
  const replaced = frase.replace(/\n|;/g, " ");

  return replaced.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const geraCsv = (pedido: PedidoValidator) => {
  const observacoes = `${pedido.codigo_de_barra}-${pedido.transportadora}-${pedido.telefone}-${pedido.entrega_coleta}-${new Date(pedido.prazo_entrega).toLocaleDateString()}-${pedido.pedido_especial}-${pedido.observacoes}`;

  const rows = pedido.produtos.map((produto, index) => {
    const row = {
      Pedido: pedido.codigo,
      [" Cliente"]: replaceChar(pedido.cliente.nome),
      [" Empresa"]: "KMB RODIZIOS",
      [" Data de emissão"]: new Date(pedido.createdAt).toLocaleDateString(),
      [" observações"]: replaceChar(observacoes),
      ["item"]: (index + 1).toString(),
      [" Código do produto"]: produto.item.codigo,
      [" Descrição do produto"]: replaceChar(produto.item.descricao),
      [" Tipo de produto"]: "",
      [" Método de ressuprimento"]: "",
      [" U.M."]: "UN",
      [" Qtde"]: produto.quantidade.toString(),
      ["  Preço unitário "]: produto.com_preco_promocional
        ? currencyFormt(+produto.item.preco_promocional.toFixed(2))
        : currencyFormt(+produto.item.preco.toFixed(2)),
      [" Data de entrega"]: new Date(pedido.prazo_entrega).toLocaleDateString(),

      [" Pedido compra do cliente"]: "",
      [" Item do Pedido compra do cliente"]: "",
      ["Condição de pagamento"]: replaceChar(pedido.condicao_pagamento),
      ["Tabela de preço"]: "Tabela de Preço Padrão",
      ["Setor de saída"]: "Produto Acabado",
    };

    return row;
  });

  return rows;
};
