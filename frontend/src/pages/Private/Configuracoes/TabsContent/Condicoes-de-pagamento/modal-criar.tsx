import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { queryClient } from "@/lib/react-query/queryClient";
import { toast, Toaster } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCriarCondicao } from "@/hooks/mutations/condicao-de-pagamento/admin/criar-condicao";

interface ICriarCondicaoModal {
  children: JSX.Element;
}

export function CriarCondicaoModal({ children }: ICriarCondicaoModal) {
  const [descricao, setDescricao] = useState<string>();
  const [tipo, setTipo] = useState<string>();
  const { criarCondicao } = useCriarCondicao();
  const [isOpen, setIsOpen] = useState<boolean>();

  const submit = () => {
    if (descricao && tipo) {
      criarCondicao.mutate(
        { descricao, tipo },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              predicate: (query) =>
                query.queryKey[0] === "todas-condicoes-de-pagamento",
            }),
              toast.success(`${data.descricao} criado com sucesso`, {
                duration: 2000,
              });
            setTimeout(() => {
              setDescricao(undefined);
              setTipo(undefined);
              setIsOpen(false);
            }, 1500);
          },
          onError: (error) => {
            toast.error(`${error.message} - Erro ao criar.`, {
              duration: 2000,
            });
          },
        },
      );
    } else {
      toast.error("Descrição e Tipo são obrigatorios.", {
        duration: 2000,
      });
    }
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
            <DialogTitle>Cadastrar nova Condição de Pagamento</DialogTitle>
            <DialogDescription>
              Cadastre uma nova condição de pagamento
            </DialogDescription>
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
            <Button
              type="button"
              onClick={submit}
              disabled={criarCondicao.isPending}
            >
              {criarCondicao.isPending ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <p>Criar</p>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
