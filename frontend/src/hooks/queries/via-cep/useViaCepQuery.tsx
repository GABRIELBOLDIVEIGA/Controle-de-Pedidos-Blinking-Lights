import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchCEP } from "@/service/via-cep/via-cep";

export const useViaCepQuery = () => {
  const [cep, setCep] = useState<string | undefined>();

  const query = useQuery({
    queryKey: ["viacep", cep],
    queryFn: () => fetchCEP(cep),
    enabled: !!cep,
  });

  return { ...query, setCep };
};
