import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type LayoutOptions = "list" | "grid";
type ProdutosLayout = {
  layout: LayoutOptions;
  changeLayout: () => void;
};

export const useProdutosLayout = create<ProdutosLayout>()(
  persist(
    (set, get) => ({
      layout: "grid",
      changeLayout: () => {
        set(() => ({
          layout: get().layout === "list" ? "grid" : "list",
        }));
      },
    }),
    {
      name: "produtos-layout-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
