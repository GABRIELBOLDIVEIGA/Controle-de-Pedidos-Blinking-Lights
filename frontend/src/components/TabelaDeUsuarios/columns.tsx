import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UsuarioValidator } from "@/utils/validators/Usuario";
import { Badge } from "../ui/badge";

export const columns: ColumnDef<UsuarioValidator>[] = [
  {
    id: "ativo",
    accessorKey: "ativo",
    header: ({ column }) => {
      return (
        <div
          className="ml-2 flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ativo
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="ml-2">
        <Badge variant={row.getValue("ativo") ? "default" : "destructive"}>
          {row.getValue("ativo") ? "Ativo" : "Inativo"}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("nome")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          E-mail
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
  },
  {
    id: "Documento",
    accessorKey: "documento",
    // header: "Razão Social",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Documento
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue("Documento")}</div>,
  },
  {
    accessorKey: "telefone",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Telefone
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
  },
  {
    id: "endereco",
    accessorKey: "endereco",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UF
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      const endereco = row.original.endereco;
      return <div>{endereco.uf}</div>;
    },
  },

  {
    id: "Ações",
    cell: ({ row }) => {
      const usuario = row.original;

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
              onClick={() => navigator.clipboard.writeText(usuario.email)}
            >
              Copiar E-mail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(usuario.documento)}
            >
              Copiar Documento
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(usuario.telefone)}
            >
              Copiar Telefone
            </DropdownMenuItem>
            <Link to={`/usuario/atualizar/${usuario._id}`}>
              <DropdownMenuItem>Atualizar Dados</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
