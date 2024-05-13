import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { PedidoTable } from "@/hooks/queries/tables/pedidos/pedido-table";
import { Acoes } from "./acoes";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns: ColumnDef<PedidoTable>[] = [
  {
    id: "Código",
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
        <Badge
          className={cn("relative flex w-fit gap-1")}
          variant={row.original.etapa === "ANALISE" ? "default" : "secondary"}
        >
          <p>{row.original.codigo}</p>

          <div
            className={cn("sr-only absolute cursor-help", {
              "not-sr-only -right-[6px] -top-[6px] text-blue-500":
                row.original.utilizado_como_orcamento &&
                row.original.etapa === "ORCAMENTO",
            })}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CheckCheck size={14} />
                </TooltipTrigger>
                <TooltipContent className="max-w-48">
                  <p>Este orçamento foi utilizado para gerar um pedido.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Badge>
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
          <p className="text-left blur-[2px]">{row.original.cliente}</p>
        </ScrollArea>
      </div>
    ),
  },
  {
    id: "cnpj",
    accessorKey: "cnpj",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CNPJ
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="max-w-[300px] text-wrap text-center capitalize">
        <ScrollArea className="h-[22px]">
          <p className="text-left blur-[2px]">{row.original.cnpj}</p>
        </ScrollArea>
      </div>
    ),
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
      <div className="capitalize blur-[2px]">{row.original.usuario}</div>
    ),
  },
  {
    id: "total",
    accessorKey: "total",
    header: () => {
      return <div className="flex items-center">Total</div>;
    },
    cell: ({ row }) => {
      return <div>{row.original.total}</div>;
    },
  },
  {
    id: "data",
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
        <div className="ml-2">
          <Badge
            className={cn("relative flex w-fit gap-1")}
            variant={row.original.etapa === "ANALISE" ? "default" : "secondary"}
          >
            <p>{row.original.etapa}</p>

            <div
              className={cn("sr-only absolute cursor-help", {
                "not-sr-only -right-[6px] -top-[6px] text-blue-500":
                  row.original.utilizado_como_orcamento &&
                  row.original.etapa === "ORCAMENTO",
              })}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CheckCheck size={14} />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-48">
                    <p>Este orçamento foi utilizado para gerar um pedido.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Badge>
        </div>
      );
    },
  },
  {
    id: "Observações",
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
    cell: ({ row }) => {
      return <Acoes id={row.original._id} />;
    },
    enableHiding: false,
  },
];
