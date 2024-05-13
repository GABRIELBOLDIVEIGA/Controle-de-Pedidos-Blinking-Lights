import { GridBackground } from "@/components/GridBackground/GridBackground";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoutes = () => {
  const location = useLocation();

  switch (location.pathname) {
    case "/":
      return (
        <GridBackground>
          <Navigate to="/login" />
          <Outlet />
        </GridBackground>
      );
    default:
      return (
        <GridBackground>
          <Outlet />
        </GridBackground>
      );
  }
};

export default PublicRoutes;
