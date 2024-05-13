import { ClienteValidator } from "@/utils/validators/Cliente";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";

export const columns: ColumnDef<ClienteValidator>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-[150px] max-w-[150px] overflow-hidden pl-2 capitalize">
          <p className="text-wrap">{row.original.nome.toLowerCase()}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "documento",
    header: ({ column }) => {
      return (
        <div className="w-fit">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CNPJ
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-fit max-w-[200px] overflow-hidden pl-2 capitalize">
          <p className="text-wrap">{row.original.documento.toLowerCase()}</p>
        </div>
      );
    },
  },
  {
    id: "Razão social",
    accessorKey: "razao_social",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Razão social
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-[200px] max-w-[200px] overflow-hidden pl-2 capitalize">
          <p className="text-wrap">{row.original.razao_social.toLowerCase()}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="w-fit">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            E-mail
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-fit pl-2 capitalize">
          <p className="text-wrap">{row.original.email.toLowerCase()}</p>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "telefone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Telefone
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-[150px] max-w-[150px] overflow-hidden pl-2 capitalize">
          <p className="text-wrap">{row.original.telefone.toLowerCase()}</p>
        </div>
      );
    },
    enableGlobalFilter: false,
  },

  {
    id: "Observações",
    accessorKey: "observacoes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Observações
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="max-w-[250px] text-wrap rounded-md border-[1px] pl-2 pt-1 text-center capitalize">
          <ScrollArea className="h-[50px]">
            <p className="text-left">
              {row.original.observacoes.toLowerCase()}
            </p>
          </ScrollArea>
        </div>
      );
    },
    enableGlobalFilter: false,
  },

  {
    id: "Ações",
    cell: ({ row }) => {
      const cliente = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(cliente.email)}
            >
              Copiar E-mail
            </DropdownMenuItem>
            <Link to={`/cliente/atualizar/${cliente._id}`}>
              <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableGlobalFilter: false,
  },
];
