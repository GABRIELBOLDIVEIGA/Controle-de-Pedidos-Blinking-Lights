import { DetalhesStep } from "@/components/MultStep-Pedido-Orcamento/DetalhesStep/DetalhesStep";
import { ProdutosStep } from "@/components/MultStep-Pedido-Orcamento/ProdutosStep/ProdutosStep";
import { useState } from "react";

export function useMultistepForm() {
  const steps = [<ProdutosStep />, <DetalhesStep />];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      return i >= steps.length - 1 ? i : i + 1;
    });
  }
  function back() {
    setCurrentStepIndex((i) => {
      return i <= 0 ? i : i - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    next,
    back,
    goTo,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex + 1 === steps.length,
  };
}
