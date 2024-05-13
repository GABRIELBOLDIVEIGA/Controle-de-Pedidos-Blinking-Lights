import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { PedidoValidator } from "@/utils/validators/Pedido";
import { Badge } from "../ui/badge";
import { calculaTotalDoPedido } from "@/utils/helpers/calculosProduto/calculaTotalDoPedido";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
import { Acoes } from "./acoes";
import { ScrollArea } from "../ui/scroll-area";
import { normalize } from "@/utils/helpers/normalize";
import { totalDoPedidoV2 } from "@/utils/helpers/calculosProduto/v2/total-pedido-v2";

export const columns: ColumnDef<PedidoValidator>[] = [
  {
    id: "codigo",
    accessorKey: "codigo",
    header: ({ column }) => {
      return (
        <div
          className="ml-2 flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="ml-2">
        <Badge variant="secondary">{row.original.codigo}</Badge>
      </div>
    ),
  },
  {
    id: "cliente",
    accessorKey: "cliente",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="max-w-[300px] text-wrap text-center capitalize">
        <ScrollArea className="h-[22px]">
          <p className="text-left">{row.original.cliente.nome}</p>
        </ScrollArea>
      </div>
    ),
    filterFn: (row, _, filterValue) => {
      const filtro = normalize(filterValue);
      const cliente_nome = normalize(row.original.cliente.nome);

      return cliente_nome.includes(filtro);
    },
  },
  {
    id: "usuario",
    accessorKey: "usuario",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Representante
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.usuario.nome}</div>
    ),
  },
  {
    id: "produtos",
    accessorKey: "produtos",
    header: () => {
      return <div className="flex items-center">Total</div>;
    },
    cell: ({ row }) => {
      console.log(currencyFormt(totalDoPedidoV2(row.original.produtos)));

      return (
        <div>{currencyFormt(calculaTotalDoPedido(row.original.produtos))}</div>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
    ),
  },
  {
    id: "etapa",
    accessorKey: "etapa",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Etapa
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <Badge
            variant={row.original.etapa === "ANALISE" ? "default" : "secondary"}
          >
            {row.original.etapa}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "observacoes",
    header: () => (
      <div className="flex cursor-pointer items-center">Observações</div>
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] text-wrap rounded-md border-[1px] pl-2 pt-1 text-center capitalize">
        <ScrollArea className="h-[50px]">
          <p className="text-left">{row.original.observacoes}</p>
        </ScrollArea>
      </div>
    ),
  },

  {
    id: "Ações",
    cell: ({ row }) => <Acoes {...row.original} />,
  },
];
