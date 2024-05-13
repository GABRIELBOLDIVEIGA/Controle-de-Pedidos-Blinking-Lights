import axios from "axios";

export const viaCepAxios = axios.create({
  baseURL: import.meta.env.VITE_VIA_CEP,
});
