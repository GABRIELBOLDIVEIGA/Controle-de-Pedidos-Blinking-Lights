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
import { useCadastrarEmailNotificacao } from "@/hooks/mutations/email-notificacao/criarEmailNotificacao";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const form_schema = z.object({
  nome: z.string(),
  email: z.string().email(),
});

type FormType = z.infer<typeof form_schema>;

interface ICriarEmailModal {
  children: JSX.Element;
}

export function CriarEmailModal({ children }: ICriarEmailModal) {
  const { criarEmailNotificacao } = useCadastrarEmailNotificacao();
  const [isOpen, setIsOpen] = useState<boolean>();

  const form = useForm<FormType>({
    resolver: zodResolver(form_schema),
  });

  const submit = (dados: FormType) => {
    criarEmailNotificacao.mutate(dados, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "todos-emails",
        }),
          toast.success(`${data.email} criado com sucesso`, {
            duration: 1500,
          });
        setTimeout(() => {
          form.reset();
          setIsOpen(false);
        }, 1500);
      },
      onError: (error) => {
        toast.error(`${error.message} - Erro ao criar.`, {
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
                <DialogTitle>Cadastrar novo email para notificação</DialogTitle>
                <DialogDescription>
                  Cadastre um novo email para receber notificações de novos
                  pedidos.
                </DialogDescription>
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
                <Button
                  type="submit"
                  disabled={criarEmailNotificacao.isPending}
                >
                  {criarEmailNotificacao.isPending ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    <p>Cadastrar</p>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
