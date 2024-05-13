import { AuthContext } from "@/context/Auth/AuthContext";
import { PedidoValidator } from "@/utils/validators/Pedido";
import { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "@/components/ui/button";
import { useTodosPedidosQuery } from "@/hooks/queries/pedido/admin/useTodosPedidosQuery";
import { useTodosOrcamentosQuery } from "@/hooks/queries/orcamento/admin/useTodosOrcamentosQuery";
import { useClonePedido } from "@/hooks/mutations/pedido/useClonePedido";

interface IProps {
  id: string;
}

export const AcoesAdmin = ({ id }: IProps) => {
  const { user } = useContext(AuthContext);
  const { todosPedidosQuery } = useTodosPedidosQuery();
  const { data: todosOrcamentosQuery } = useTodosOrcamentosQuery();
  const [pedido, setPedido] = useState<PedidoValidator>();
  const { clonarPedidoOuOrcamento } = useClonePedido();

  useEffect(() => {
    if (todosOrcamentosQuery && todosPedidosQuery.data) {
      const merge = [...todosOrcamentosQuery, ...todosPedidosQuery.data];

      setPedido(merge.find((p) => p._id === id));
    }
  }, [
    todosPedidosQuery.data,
    todosOrcamentosQuery,
    id,
    clonarPedidoOuOrcamento.isSuccess,
  ]);

  const clonar = () => {
    if (pedido?._id) {
      const toastId = toast.loading("Clonando...");

      clonarPedidoOuOrcamento.mutate(pedido._id, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate: ({ queryKey }) =>
              queryKey[0] === "todos-pedidos" ||
              queryKey[0] === "todos-orcamentos" ||
              queryKey[0] === "orcamentos-do-usuario-table" ||
              queryKey[0] === "orcamentos-do-usuario",
          });
          toast.success("Clone realizado com sucesso.", {
            description: "Confira em Orçamentos.",
            duration: 4500,
            dismissible: true,
          });
          toast.dismiss(toastId);
        },
        onError: () => {
          toast.error("Algo de errado ocorreu ao clonar.", {
            description: "Tente novamente em alguns instantes.",
            duration: 3000,
            dismissible: true,
          });
          toast.dismiss(toastId);
        },
      });
    }
  };

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
        {pedido && (
          <>
            <Link to={`/pedido/pdf/${pedido?._id}`}>
              <DropdownMenuItem>Ver PDF</DropdownMenuItem>
            </Link>

            {(user?.permissao === "ADM" || user?.permissao === "DEV") && (
              <>
                {pedido?.etapa === "FINALIZADO" && (
                  <PedidoCsv pedido={pedido}>
                    <DropdownMenuItem>Baixar .CSV</DropdownMenuItem>
                  </PedidoCsv>
                )}
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={!pedido._id} onClick={clonar}>
              Clonar
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <Link to={`/pedido/${pedido?._id}`}>
              <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
            </Link>

            {(user?.permissao === "ADM" || user?.permissao === "DEV") && (
              <>
                <DropdownMenuSeparator />
                <AlertDelete pedido={pedido}>
                  <Button
                    disabled={!pedido}
                    variant="ghost"
                    className="text-md flex w-full justify-between px-2 font-bold text-destructive hover:text-destructive"
                  >
                    Deletar
                    <Trash2 size={18} />
                  </Button>
                </AlertDelete>
              </>
            )}

            {user?.permissao === "USER" && pedido?.etapa === "ORCAMENTO" && (
              <>
                <DropdownMenuSeparator />
                <AlertDelete pedido={pedido}>
                  <Button
                    disabled={!pedido}
                    variant="ghost"
                    className="text-md flex w-full justify-between px-2 font-bold text-destructive hover:text-destructive"
                  >
                    Deletar
                    <Trash2 size={18} />
                  </Button>
                </AlertDelete>
              </>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface IAlertDelete {
  children: JSX.Element;
  pedido?: PedidoValidator;
}
function AlertDelete({ children, pedido }: IAlertDelete) {
  const { deletePedidoOrcamento } = useDeletePedidoOrcamento();

  const deletar = () => {
    if (pedido) {
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
    }
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
            este {pedido?.etapa === "ORCAMENTO" ? "Orçamento" : "Pedido"}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar este{" "}
            {pedido?.etapa === "ORCAMENTO" ? "Orçamento" : "Pedido"} será
            apagado de forma permanente.
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
