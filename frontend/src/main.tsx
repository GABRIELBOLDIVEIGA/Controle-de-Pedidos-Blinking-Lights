import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globla.css";
import { ThemeProvider } from "./context/Theme/Theme-provider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/Auth/AuthProvider.tsx";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./lib/react-query/queryClient.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="kmb-theme">
        {/* <div className="-mb-6"> */}
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
        {/* </div> */}
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
);
