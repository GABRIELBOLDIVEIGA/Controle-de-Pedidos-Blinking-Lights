import { AuthContext } from "@/context/Auth/AuthContext";
import axios from "axios";
import { useContext } from "react";

export const useKmbApi = () => {
  const authContext = useContext(AuthContext);

  const token = localStorage.getItem("access_token");

  const kmbApi = axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? import.meta.env.VITE_API_DEVELOPMENT
        : import.meta.env.VITE_API_PRODUCTION,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: false,
  });

  kmbApi.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        authContext.singout();
        window.location.href = "/login";
        alert("Usuário não tem autorização para acessar essa URL!");
        return Promise.reject(error);
      }
      return Promise.reject(error);
    },
  );

  return { kmbApi };
};

// NOVA VERSAO

const kmbApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? import.meta.env.VITE_API_DEVELOPMENT
      : import.meta.env.VITE_API_PRODUCTION,
  withCredentials: false,
});

kmbApi.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =
      `Bearer ${localStorage.getItem("access_token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

kmbApi.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      // localStorage.removeItem("access_token");
      // window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default kmbApi;
