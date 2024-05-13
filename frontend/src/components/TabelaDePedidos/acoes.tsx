import { AuthContext } from "@/context/Auth/AuthContext";
import { PedidoValidator } from "@/utils/validators/Pedido";
import { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { PedidoCsv } from "./CsvDownloader/CsvDownloader";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeletePedidoOrcamento } from "@/hooks/mutations/pedido/delete";
import { Toaster, toast } from "sonner";
import { queryClient } from "@/lib/react-query/queryClient";

export const Acoes = (row: PedidoValidator) => {
  const { user } = useContext(AuthContext);
  const pedido = row;

  return (
    <DropdownMenu>
      <Toaster />
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>

        <Link to={`/pedido/pdf/${pedido._id}`}>
          <DropdownMenuItem>Ver PDF</DropdownMenuItem>
        </Link>

        {(user?.permissao === "ADM" || user?.permissao === "DEV") && (
          <>
            {pedido.etapa === "FINALIZADO" && (
              <PedidoCsv pedido={pedido}>
                <DropdownMenuItem>Baixar .CSV</DropdownMenuItem>
              </PedidoCsv>
            )}
          </>
        )}

        <DropdownMenuSeparator />
        <Link to={`/pedido/${pedido._id}`}>
          <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
        </Link>

        {(user?.permissao === "ADM" || user?.permissao === "DEV") && (
          <>
            <DropdownMenuSeparator />
            <AlertDelete pedido={pedido}>
              <Button
                variant="ghost"
                className="text-md flex w-full justify-between px-2 font-bold text-destructive hover:text-destructive"
              >
                Deletar
                <Trash2 size={18} />
              </Button>
            </AlertDelete>
          </>
        )}

        {user?.permissao === "USER" && pedido.etapa === "ORCAMENTO" && (
          <>
            <DropdownMenuSeparator />
            <AlertDelete pedido={pedido}>
              <Button
                variant="ghost"
                className="text-md flex w-full justify-between px-2 font-bold text-destructive hover:text-destructive"
              >
                Deletar
                <Trash2 size={18} />
              </Button>
            </AlertDelete>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface IAlertDelete {
  children: JSX.Element;
  pedido: PedidoValidator;
}
function AlertDelete({ children, pedido }: IAlertDelete) {
  const { deletePedidoOrcamento } = useDeletePedidoOrcamento();

  const deletar = () => {
    deletePedidoOrcamento.mutate(pedido._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === "orcamentos-do-usuario" ||
            query.queryKey[0] === "todos-orcamentos",
        }),
          toast.success("Pedido DELETADO com sucesso", {
            duration: 2000,
          });
      },
      onError: (error) => {
        toast.error(`Algo deu errado, ${error.message}`, { duration: 3500 });
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja{" "}
            <span className="font-bold text-destructive underline">
              DELETAR
            </span>{" "}
            este {pedido.etapa === "ORCAMENTO" ? "Orçamento" : "Pedido"}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar este{" "}
            {pedido.etapa === "ORCAMENTO" ? "Orçamento" : "Pedido"} será apagado
            de forma permanente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive" onClick={deletar}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
