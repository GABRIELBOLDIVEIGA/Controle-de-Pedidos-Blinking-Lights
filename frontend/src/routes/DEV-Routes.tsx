import { Cabecalho } from "@/components/Cabecalho/Cabecalho";
import { GridBackground } from "@/components/GridBackground/GridBackground";
import { Main } from "@/components/Main/Main";
import RequireDevAuth from "@/context/Auth/RequireDevAuth";

export const DEVRoutes = () => {
  return (
    <RequireDevAuth>
      <GridBackground>
        <div className="h-screen">
          <Cabecalho />
          <Main />
        </div>
      </GridBackground>
    </RequireDevAuth>
  );
};
