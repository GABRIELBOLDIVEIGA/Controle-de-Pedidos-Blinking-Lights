import { Card } from "@/components/ui/card";
import { Github } from "lucide-react";
import { CardLeft } from "./CardLeft/CardLeft";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/Auth/AuthContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AlertDialogComponent } from "@/components/AlertDialogComponent/AlertDialogComponent";
import { CardLogin } from "./CardLogin/CardLogin";

export const Login = () => {
  const { user, statusResponse, resetError } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate("/pedido/meus-pedidos");
    }
  }, [navigate, user]);

  return (
    <section className="flex h-screen items-center justify-center">
      {!user && (
        <>
          <Card className="flex h-[70%] w-4/6 overflow-hidden mobile:h-[60%] mobile:w-10/12">
            <CardLeft className="mobile:sr-only" />
            <div className="border-l-[1px] border-border" />
            {location.pathname === "/login/esqueci-minha-senha" ? (
              <Outlet />
            ) : (
              <CardLogin />
            )}
          </Card>
          <div className="absolute bottom-3 right-3 flex items-center justify-center">
            <a
              title="Perfil do Desenvolvedor"
              target="_blank"
              href="https://github.com/GABRIELBOLDIVEIGA"
            >
              <Github />
            </a>
          </div>
        </>
      )}
      {statusResponse && (
        <AlertDialogComponent
          isOpen={!statusResponse.isSuccess}
          title={statusResponse.title}
          description={statusResponse.description}
          confirmBtnText="Continuar"
          confirmFn={resetError}
        />
      )}
    </section>
  );
};
