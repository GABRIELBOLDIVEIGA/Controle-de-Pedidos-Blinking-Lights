import { QueryClient } from "@tanstack/react-query";
import kmbApi from "../axios/useKmbApi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultQueryFn = async ({ queryKey }: any) => {
  const { data } = await kmbApi.get(`${queryKey[0]}`);
  return data;
};

const milliseconds = 120000; // 1 min = 60000ms
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: milliseconds, queryFn: defaultQueryFn },
  },
});
