import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Heart, MoreHorizontal } from "lucide-react";
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
import { Badge } from "../ui/badge";
import { ProdutoValidator } from "@/utils/validators/Produto";
import { cn } from "@/lib/utils";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";

export const columns: ColumnDef<ProdutoValidator>[] = [
  {
    id: "favorito",
    accessorKey: "favorito",
    header: ({ column }) => {
      return (
        <div
          className="ml-2 flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Favorito
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="ml-2">
        <Heart
          fill={row.getValue("favorito") ? "red" : "white"}
          size={18}
          className={cn("", {
            "text-red-600": row.getValue("favorito"),
          })}
        />
      </div>
    ),
  },
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
        <Badge variant={row.getValue("ativo") ? "secondary" : "destructive"}>
          {row.getValue("ativo") ? "Ativo" : "Inativo"}
        </Badge>
      </div>
    ),
  },
  {
    id: "código",
    accessorKey: "codigo",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("código")}</div>
    ),
  },
  {
    id: "descrição",
    accessorKey: "descricao",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue("descrição")}</div>,
  },
  {
    id: "preço",
    accessorKey: "preco",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => <div>{currencyFormt(row.getValue("preço"))}</div>,
  },
  {
    id: "promoção ativa",
    accessorKey: "promocao_ativa",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Promoção Ativa
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="ml-2">
        <Badge
          variant={row.getValue("promoção ativa") ? "secondary" : "destructive"}
        >
          {row.getValue("promoção ativa") ? "Ativo" : "Inativo"}
        </Badge>
      </div>
    ),
  },
  {
    id: "preço promocional",
    accessorKey: "preco_promocional",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço Promocional
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div>{currencyFormt(row.getValue("preço promocional"))}</div>
    ),
  },

  {
    id: "Ações",
    cell: ({ row }) => {
      const produto = row.original;

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
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(produto.codigo)}
            >
              Copiar Código
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(produto.descricao)}
            >
              Copiar Descrição
            </DropdownMenuItem>

            <Link to={`/produto/atualizar/${produto._id}`}>
              <DropdownMenuItem>Atualizar Dados</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
