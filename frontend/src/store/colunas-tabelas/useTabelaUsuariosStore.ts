import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type X = {
  [x: string]: boolean;
};

type TableUsuariosLayout = {
  opt: {
    ativo: boolean;
    nome: boolean;
    email: boolean;
    documento: boolean;
    telefone: boolean;
    endereco: boolean;
  };
  changeIsVisible: (v: X) => void;
  reset: () => void;
};

export const useTabelaUsuarioStore = create<TableUsuariosLayout>()(
  persist(
    (set) => ({
      opt: {
        ativo: true,
        nome: true,
        email: true,
        documento: true,
        telefone: true,
        endereco: true,
      },

      changeIsVisible: (key) => {
        set((state) => {
          return { opt: { ...state.opt, ...key } };
        });
      },
      reset: () => {
        set(() => ({
          opt: {
            ativo: true,
            nome: true,
            email: true,
            documento: true,
            telefone: true,
            endereco: true,
          },
        }));
      },
    }),
    {
      name: "tablela-usuarios-columns",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
