import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type X = {
  [x: string]: boolean;
};

type TableClientesLayout = {
  opt: {
    nome: boolean;
    documento: boolean;
    razao_social: boolean;
    email: boolean;
    telefone: boolean;
    usuario_responsavel: boolean;
    observacoes: boolean;
  };
  changeIsVisible: (v: X) => void;
  reset: () => void;
};

export const useTabelaClienteStore = create<TableClientesLayout>()(
  persist(
    (set) => ({
      opt: {
        nome: true,
        documento: true,
        razao_social: true,
        email: true,
        telefone: true,
        usuario_responsavel: true,
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
            nome: true,
            documento: true,
            razao_social: true,
            email: true,
            telefone: true,
            usuario_responsavel: true,
            observacoes: true,
          },
        }));
      },
    }),
    {
      name: "tablela-clientes-columns",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
