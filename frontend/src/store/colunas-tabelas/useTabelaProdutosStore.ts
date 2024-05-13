import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type X = {
  [x: string]: boolean;
};

type TableProdutosLayout = {
  opt: {
    favorito: boolean;
    ativo: boolean;
    código: boolean;
    descrição: boolean;
    preço: boolean;
    "promoção ativa": boolean;
    "preço promocional": boolean;
  };
  changeIsVisible: (v: X) => void;
  reset: () => void;
};

export const useTabelaProdutosStore = create<TableProdutosLayout>()(
  persist(
    (set) => ({
      opt: {
        favorito: true,
        ativo: true,
        código: true,
        descrição: true,
        preço: true,
        "promoção ativa": true,
        "preço promocional": true,
      },

      changeIsVisible: (key) => {
        set((state) => {
          return { opt: { ...state.opt, ...key } };
        });
      },
      reset: () => {
        set(() => ({
          opt: {
            favorito: true,
            ativo: true,
            código: true,
            descrição: true,
            preço: true,
            "promoção ativa": true,
            "preço promocional": true,
          },
        }));
      },
    }),
    {
      name: "tablela-produtos-columns",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
