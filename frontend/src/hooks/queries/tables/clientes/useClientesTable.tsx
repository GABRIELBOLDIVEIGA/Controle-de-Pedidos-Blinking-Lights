import { useKmbApi } from "@/lib/axios/useKmbApi";
import { useQuery } from "@tanstack/react-query";
import { Cliente_Table_Response } from "./response-schema";
import { ClienteTable } from "./cliente-table";

export const useClientesTable = () => {
  const { kmbApi } = useKmbApi();

  const clientesTable = useQuery({
    queryKey: ["clientes-table"],
    queryFn: async (): Promise<ClienteTable[]> => {
      const { data } = await kmbApi.get<Cliente_Table_Response[]>(
        "/cliente/admin/table",
      );

      const clientes_table = data.map((cliente) => ({
        ...cliente,
        endereco: cliente.endereco.uf,
        usuario_responsavel: cliente.usuario_responsavel.nome,
      }));

      return clientes_table;
    },
  });

  return { clientesTable };
};
