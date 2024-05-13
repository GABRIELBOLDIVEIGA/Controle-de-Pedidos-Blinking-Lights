import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CondicaoDePagamentoValidator } from "@/utils/validators/CondicaoDePagamento";
import { Loader } from "lucide-react";
import { useCondicaoPagamento } from "@/hooks/mutations/condicao-de-pagamento/admin/patch-condicao";
import { queryClient } from "@/lib/react-query/queryClient";
import { toast, Toaster } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDeleteCondicao } from "@/hooks/mutations/condicao-de-pagamento/admin/delete-condicao";

interface IEditarCondicaoModal {
  children: JSX.Element;
  condicao: CondicaoDePagamentoValidator;
}

export function EditarCondicaoModal({
  children,
  condicao,
}: IEditarCondicaoModal) {
  const [descricao, setDescricao] = useState(condicao.descricao);
  const [tipo, setTipo] = useState(condicao.tipo);
  const { updateCondicao } = useCondicaoPagamento();
  const { deleteCondicao } = useDeleteCondicao();
  const [isOpen, setIsOpen] = useState<boolean>();

  const submit = () => {
    updateCondicao.mutate(
      { _id: condicao._id, descricao, tipo },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey[0] === "todas-condicoes-de-pagamento",
          }),
            toast.success(`${data.descricao} atualizado com sucesso`, {
              duration: 2000,
            });
          setTimeout(() => {
            setIsOpen(false);
          }, 1500);
        },
        onError: (error) => {
          toast.success(`${error.message} Erro ao atualizar.`, {
            duration: 2000,
          });
        },
      },
    );
  };

  const apagar = () => {
    deleteCondicao.mutate(condicao._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === "todas-condicoes-de-pagamento",
        }),
          toast.success(`Deletadco com sucesso`, {
            duration: 2000,
          });
      },
      onError: (error) => {
        toast.success(`${error.message} Erro ao deletar.`, {
          duration: 2000,
        });
      },
    });
  };

  return (
    <>
      <Toaster />
      <Dialog
        onOpenChange={(ev) => {
          setIsOpen(ev);
        }}
        open={isOpen}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{condicao.descricao}</DialogTitle>
            <DialogDescription>{condicao.tipo}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descricao" className="text-left">
                Descrição
              </Label>
              <Input
                id="descricao"
                value={descricao}
                onChange={(ev) => setDescricao(ev.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tipo" className="text-left">
                Tipo
              </Label>
              <Input
                id="tipo"
                value={tipo}
                onChange={(ev) => setTipo(ev.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex w-full justify-between">
              <Button
                type="button"
                variant="destructive"
                onClick={apagar}
                disabled={updateCondicao.isPending || deleteCondicao.isPending}
              >
                {updateCondicao.isPending || deleteCondicao.isPending ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  <p>Deletar</p>
                )}
              </Button>
              <Button
                type="button"
                onClick={submit}
                disabled={updateCondicao.isPending || deleteCondicao.isPending}
              >
                {updateCondicao.isPending || deleteCondicao.isPending ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  <p>Salvar</p>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
