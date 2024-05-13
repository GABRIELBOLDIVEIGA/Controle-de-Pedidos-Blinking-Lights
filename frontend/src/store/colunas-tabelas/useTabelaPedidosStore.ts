import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type X = {
  [x: string]: boolean;
};

type TablePedidosLayout = {
  opt: {
    codigo: boolean;
    cliente: boolean;
    cnpj: boolean;
    representante: boolean;
    total: boolean;
    data: boolean;
    etapa: boolean;
    observacoes: boolean;
  };
  changeIsVisible: (v: X) => void;
  reset: () => void;
};

export const useTabelaPedidosStore = create<TablePedidosLayout>()(
  persist(
    (set) => ({
      opt: {
        codigo: true,
        cliente: true,
        cnpj: true,
        representante: true,
        total: true,
        data: true,
        etapa: true,
        observacoes: true,
      },

      changeIsVisible: (key) => {
        set((state) => {
          return { opt: { ...state.opt, ...key } };
        });
      },
      reset: () => {
        set(() => ({
          opt: {
            codigo: true,
            cliente: true,
            cnpj: true,
            representante: true,
            total: true,
            data: true,
            etapa: true,
            observacoes: true,
          },
        }));
      },
    }),
    {
      name: "tablela-pedidos-columns",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
