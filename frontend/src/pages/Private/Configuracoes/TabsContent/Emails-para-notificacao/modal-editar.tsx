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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmailNotificacaoValidator } from "@/utils/validators/emailNotificacao";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEditarEmailNotificacao } from "@/hooks/mutations/email-notificacao/editarEmailNotificacao";
import { useDeleteEmailNotificacao } from "@/hooks/mutations/email-notificacao/delete-email-notificacao";
import { useState } from "react";

const form_schema = z.object({
  _id: z.string(),
  nome: z.string(),
  email: z.string().email(),
});

type FormType = z.infer<typeof form_schema>;

interface IEditarEmailModal {
  children: JSX.Element;
  data: EmailNotificacaoValidator;
}

export function EditarEmailModal({ children, data }: IEditarEmailModal) {
  const form = useForm<FormType>({
    resolver: zodResolver(form_schema),
    defaultValues: {
      _id: data._id,
      nome: data.nome,
      email: data.email,
    },
  });
  const { editarEmailNotificacao } = useEditarEmailNotificacao();
  const { deletarEmail } = useDeleteEmailNotificacao();
  const [isOpen, setIsOpen] = useState<boolean>();

  const submit = (dados: FormType) => {
    editarEmailNotificacao.mutate(dados, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "todos-emails",
        }),
          toast.success(`${data.email} atualizado com sucesso`, {
            duration: 2000,
          });
        setTimeout(() => {
          form.reset();
          setIsOpen(false);
        }, 1500);
      },
      onError: (error) => {
        toast.success(`${error.message} Erro ao atualizar.`, {
          duration: 2000,
        });
      },
    });
  };

  const apagar = () => {
    deletarEmail.mutate(data._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "todos-emails",
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
              <DialogHeader>
                <DialogTitle>{data.email}</DialogTitle>
                <DialogDescription>{data.nome}</DialogDescription>
              </DialogHeader>

              <div className="space-y-2 py-2">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Usuário</FormLabel>
                      <FormControl>
                        <Input placeholder="João Silva e Silva" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email do Usuário</FormLabel>
                      <FormControl>
                        <Input placeholder="jss@email.com" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <div className="flex w-full justify-between">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={apagar}
                    disabled={
                      editarEmailNotificacao.isPending || deletarEmail.isPending
                    }
                  >
                    {editarEmailNotificacao.isPending ||
                    deletarEmail.isPending ? (
                      <Loader size={18} className="animate-spin" />
                    ) : (
                      <p>Deletar</p>
                    )}
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      editarEmailNotificacao.isPending || deletarEmail.isPending
                    }
                  >
                    {editarEmailNotificacao.isPending ||
                    deletarEmail.isPending ? (
                      <Loader size={18} className="animate-spin" />
                    ) : (
                      <p>Salvar</p>
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
