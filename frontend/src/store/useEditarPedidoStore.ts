import { Etapa } from "@/utils/enums/Etapa";
// import { calcaulaTotalComDescontos } from "@/utils/helpers/calculosProduto/calcaulaTotalComDescontos";
// import { custoAdicionalCodigoDeBarras } from "@/utils/helpers/calculosProduto/custoAdicionalCodigoDeBarras";
import { totalDoPedidoV2 } from "@/utils/helpers/calculosProduto/v2/total-pedido-v2";
import { ClienteValidator } from "@/utils/validators/Cliente";
import { ItemPedidoValidator } from "@/utils/validators/ItemPedido";
import { ProdutoValidator } from "@/utils/validators/Produto";
import { UsuarioValidator } from "@/utils/validators/Usuario";
import { create } from "zustand";

type Detalhes = {
  _id: string;
  codigo: string;
  codigo_de_barra: string;
  condicao_pagamento: string;
  entrega_coleta: string;
  etapa: Etapa;
  isDeleted: boolean;
  observacoes: string;
  pedido_especial: string;
  prazo_entrega: string;
  telefone: string;
  transportadora: string;
};

type EditarPedidoStore = {
  detalhes: Detalhes | undefined;
  cliente: ClienteValidator | undefined;
  usuario: UsuarioValidator | undefined;
  produtos: ItemPedidoValidator[];

  setCliente: (cliente: ClienteValidator) => void;
  setUsuario: (usuario: UsuarioValidator) => void;
  setDetalhes: (detalhes: Detalhes) => void;
  setProdutos: (produtos: ItemPedidoValidator[]) => void;

  addProduto: (produto: ProdutoValidator) => void;
  removeProduto: (produto: ProdutoValidator) => void;
  calculaTotal: (produtos: ItemPedidoValidator[]) => number;
  addQuantidade: (id: string, quantidade: number) => void;
  updateDescontos: (id: string, descontos: number[]) => void;
  updatePrecoEspecial: (id: string, preco_especial: number) => void;
  handleCodigoDeBarras: (id: string) => void;
  handlePromocionalOuEspecial: (
    id: string,
    tipo: "promocional" | "especial",
  ) => void;
  resetProduto: (id: string) => void;
  reset: () => void;
};

export const useEditarPedidoStore = create<EditarPedidoStore>()((set, get) => ({
  produtos: [],
  detalhes: undefined,
  cliente: undefined,
  usuario: undefined,

  setCliente: (cliente: ClienteValidator) => {
    set(() => ({
      cliente: cliente,
    }));
  },

  setUsuario: (usuario: UsuarioValidator) => {
    set(() => ({
      usuario: usuario,
    }));
  },

  setDetalhes: (detalhes: Detalhes) => {
    set(() => ({
      detalhes: {
        _id: detalhes._id,
        codigo: detalhes.codigo,
        codigo_de_barra: detalhes.codigo_de_barra,
        condicao_pagamento: detalhes.condicao_pagamento,
        entrega_coleta: detalhes.entrega_coleta,
        etapa: detalhes.etapa,
        isDeleted: detalhes.isDeleted,
        observacoes: detalhes.observacoes,
        pedido_especial: detalhes.pedido_especial,
        prazo_entrega: detalhes.prazo_entrega,
        telefone: detalhes.telefone,
        transportadora: detalhes.transportadora,
      },
    }));
  },

  setProdutos: (produtos: ItemPedidoValidator[]) => {
    set(() => ({
      produtos: produtos,
    }));
  },

  addProduto: (produto: ProdutoValidator) => {
    set((state) => ({
      produtos: [
        ...state.produtos,
        {
          item: produto,
          com_codigo_de_barra: false,
          com_preco_promocional: false,
          com_preco_especial: false,
          promocao_ativa: produto.promocao_ativa,
          preco_promocional: produto.preco_promocional,
          preco: produto.preco,
          preco_especial: 0,
          quantidade: 1,
          descontos: [0, 0, 0],
        },
      ],
    }));
  },
  removeProduto: (produto: ProdutoValidator) => {
    set((state) => ({
      produtos: state.produtos.filter((obj) => obj.item._id != produto._id),
    }));
  },
  addQuantidade: (id: string, quantidade: number) => {
    set((state) => ({
      produtos: [
        ...state.produtos.map((produto) => {
          return produto.item._id != id ? produto : { ...produto, quantidade };
        }),
      ],
    }));
  },
  calculaTotal: (produtos: ItemPedidoValidator[]) => {
    // let total_compra = 0;
    // produtos.forEach((produto) => {
    //   const total =
    //     calcaulaTotalComDescontos(produto) +
    //     custoAdicionalCodigoDeBarras(produto);
    //   total_compra += total;
    // });
    // return total_compra;
    return totalDoPedidoV2(produtos);
  },
  updateDescontos: (id: string, descontos: number[]) => {
    set((state) => ({
      produtos: [
        ...state.produtos.map((produto) => {
          return produto.item._id != id ? produto : { ...produto, descontos };
        }),
      ],
    }));
  },
  updatePrecoEspecial: (id: string, preco_especial: number) => {
    // set(() => {
    //   const produto = get().produtos.find((produto) => produto.item._id === id);
    //   if (produto) {
    //     const descontos = calcula_porcentagem_por_preco_especial(
    //       preco_especial,
    //       produto.item.promocao_ativa
    //         ? produto.item.preco_promocional
    //         : produto.item.preco,
    //     );

    //     return {
    //       produtos: [
    //         ...get().produtos.map((produto) => {
    //           return produto.item._id != id
    //             ? produto
    //             : {
    //                 ...produto,
    //                 com_preco_especial: preco_especial > 0,
    //                 preco_especial,
    //                 descontos,
    //               };
    //         }),
    //       ],
    //     };
    //   }

    //   return { ...get().produtos };
    // });
    set(() => {
      const produto = get().produtos.find((produto) => produto.item._id === id);
      if (produto) {
        return {
          produtos: [
            ...get().produtos.map((produto) => {
              return produto.item._id != id
                ? produto
                : {
                    ...produto,
                    com_preco_especial: preco_especial > 0,
                    preco_especial,
                  };
            }),
          ],
        };
      }

      return { ...get().produtos };
    });
  },
  handleCodigoDeBarras: (id: string) => {
    set((state) => ({
      produtos: [
        ...state.produtos.map((produto) => {
          return produto.item._id != id
            ? produto
            : {
                ...produto,
                com_codigo_de_barra: !produto.com_codigo_de_barra,
              };
        }),
      ],
    }));
  },

  handlePromocionalOuEspecial: (id, tipo) => {
    set((state) => {
      if (tipo === "promocional") {
        return {
          produtos: [
            ...state.produtos.map((produto) => {
              return produto.item._id != id
                ? produto
                : {
                    ...produto,
                    com_preco_promocional: !produto.com_preco_promocional,
                    com_preco_especial: false,
                    preco_especial: 0,
                  };
            }),
          ],
        };
      }

      if (tipo === "especial") {
        return {
          produtos: [
            ...state.produtos.map((produto) => {
              return produto.item._id != id
                ? produto
                : {
                    ...produto,
                    com_preco_promocional: false,
                    preco_especial: 0,
                    com_preco_especial: !produto.com_preco_especial,
                  };
            }),
          ],
        };
      }

      return { produtos: state.produtos };
    });
  },

  resetProduto: (id: string) => {
    set((state) => ({
      produtos: [
        ...state.produtos.map((produto) => {
          return produto.item._id != id
            ? produto
            : {
                ...produto,
                com_codigo_de_barra: false,
                com_preco_promocional: false,
                com_preco_especial: false,
                preco: produto.preco,
                preco_especial: 0,
                quantidade: 1,
                descontos: [0, 0, 0],
              };
        }),
      ],
    }));
  },
  reset: () => {
    set(() => ({ produtos: [] }));
  },
}));

export function calcula_porcentagem_por_preco_especial(
  preco_especial: number,
  preco_produto: number,
) {
  const porcentagem = 100 - (preco_especial / preco_produto) * 100;

  return [+porcentagem.toFixed(2), 0, 0];
}
