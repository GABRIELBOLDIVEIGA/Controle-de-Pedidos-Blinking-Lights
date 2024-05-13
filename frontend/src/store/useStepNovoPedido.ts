import { create } from "zustand";

type NovoPedidoStep = {
  step: number;
  length: number;
  setLength: (value: number) => void;
  next: () => void;
  back: () => void;
  resetStep: () => void;
};

export const useNovoPedidoStepStore = create<NovoPedidoStep>()((set, get) => ({
  step: 0,
  length: 0,
  setLength: (value) => set({ length: value }),
  next: () =>
    set(() => ({
      step: get().step + 1 >= get().length ? get().step : get().step + 1,
    })),
  back: () =>
    set(() => ({
      step: get().step <= 0 ? 0 : get().step - 1,
    })),
  resetStep: () => {
    set(() => ({ step: 0 }));
  },
}));
