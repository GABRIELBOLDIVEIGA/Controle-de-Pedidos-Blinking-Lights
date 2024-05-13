import axios, { AxiosError } from "axios";
import { StatusResponse } from "./statusResponse";

export const errorHandler = (error: Error | AxiosError): StatusResponse => {
  if (axios.isAxiosError(error)) {
    return {
      isSuccess: false,
      title: `${error.response?.data.message}`,
      description: `${error.response?.data.message}`,
    };
  } else {
    return {
      isSuccess: false,
      title: error.name,
      description: error.message,
    };
  }
};
