import { useDetalhesDoPedido } from "./form/useDetalhesForm";
import { ptBR } from "date-fns/locale";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, Loader } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthContext } from "@/context/Auth/AuthContext";
import { permissaoSchema } from "@/utils/enums/Permicao";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DetathlesDoPedidoFormType } from "./form/validator/detalhes";
import { Toaster, toast } from "sonner";
import { useTodosClientesQuery } from "@/hooks/queries/cliente/admin/useTodosClientesQuery";
import { useClientesDoUsuarioQuery } from "@/hooks/queries/cliente/useClientesDoUsuarioQuery";
import { useTodasCondicoesDePagamentoQuery } from "@/hooks/queries/condicao-de-pagamento/useTodasCondicoesDePagamentoQuery";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient } from "@/lib/react-query/queryClient";
import { useEditarPedidoOrcamento } from "@/hooks/mutations/pedido/patch-pedido-orcamento";
import { useEditarPedidoStore } from "@/store/useEditarPedidoStore";
import { useConfirmarPedido } from "@/hooks/mutations/pedido/admin/confirmar-pedido";
import { useCriarPedido } from "@/hooks/mutations/pedido/post-pedido";
import { etapaSchema } from "@/utils/enums/Etapa";
import { ClienteValidator } from "@/utils/validators/Cliente";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { normalize } from "@/utils/helpers/normalize";
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
import { useMarcaOrcamentoComoUsado } from "@/hooks/mutations/orcamento/useMarcaOrcamentoComoUsado";

export const EditarDetalhesForm = () => {
  const { user } = useContext(AuthContext);
  const { form } = useDetalhesDoPedido();
  const { todosClientesQuery } = useTodosClientesQuery();
  const { clientesDoUsuarioQuery } = useClientesDoUsuarioQuery();
  const { todasCondicoesDePagamentoQuery } =
    useTodasCondicoesDePagamentoQuery();
  const [clienteIsOpen, setClienteIsOpen] = useState(false);
  const { editarPedidoOrcamento } = useEditarPedidoOrcamento();
  const detalhes = useEditarPedidoStore((state) => state.detalhes);
  const produtos = useEditarPedidoStore((state) => state.produtos);

  const { confirmarPedido: confirmarPedidoMutation } = useConfirmarPedido();
  const { criarPedido } = useCriarPedido();

  const params = useParams<{ id: string }>();
  const { mutate } = useMarcaOrcamentoComoUsado();
  const navigate = useNavigate();

  function showClientes() {
    if (
      user?.permissao === permissaoSchema.enum.ADM ||
      user?.permissao === permissaoSchema.enum.DEV
    ) {
      return todosClientesQuery.data;
    }

    return clientesDoUsuarioQuery.data;
  }

  const confirmarPedido = () => {
    confirmarPedidoMutation.mutate(form.getValues(), {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === "pedidos-do-usuario" ||
            query.queryKey[0] === "todos-pedidos" ||
            query.queryKey[0] === "orcamentos-do-usuario" ||
            query.queryKey[0] === "todos-orcamentos" ||
            query.queryKey[0] === "pedido-detalhes",
        }),
          toast.success("Pedido convertido para FINALIZADO com sucesso", {
            duration: 2000,
          });
        setTimeout(() => {
          navigate(
            `${data.etapa === "ORCAMENTO" ? "/orcamento/meus-orcamentos" : "/pedido/todos-pedidos"}`,
          );
        }, 2300);
      },
      onError: (error) => {
        toast.error(`Algo deu errado, ${error.message}`, { duration: 3500 });
      },
    });
  };

  const submit = (data: DetathlesDoPedidoFormType) => {
    editarPedidoOrcamento.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === "pedidos-do-usuario" ||
            query.queryKey[0] === "todos-pedidos" ||
            query.queryKey[0] === "orcamentos-do-usuario" ||
            query.queryKey[0] === "todos-orcamentos" ||
            query.queryKey[0] === "pedido-detalhes",
        }),
          toast.success(
            `${data.etapa === "ORCAMENTO" ? "Orçamento" : "Pedido"} atualizado com sucesso`,
            { duration: 2000 },
          );
      },
      onError: () => {
        toast.error(
          `Algo deu errado ao gerar o ${data.etapa === "ORCAMENTO" ? "Orçamento" : "Pedido"}.`,
          { duration: 1500 },
        );
      },
    });
  };

  const gerarPedido = () => {
    mutate(params.id);

    const pedido = {
      produtos: form.getValues("produtos"),
      cliente: form.getValues("cliente"),
      usuario: form.getValues("usuario"),
      codigo_de_barra: form.getValues("codigo_de_barra"),
      condicao_pagamento: form.getValues("condicao_pagamento"),
      entrega_coleta: form.getValues("entrega_coleta"),
      etapa: etapaSchema.enum.ANALISE,
      observacoes: form.getValues("observacoes"),
      pedido_especial: form.getValues("pedido_especial"),
      prazo_entrega: form.getValues("prazo_entrega"),
      telefone: form.getValues("telefone"),
      transportadora: form.getValues("transportadora"),
    };
    criarPedido.mutate(pedido, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === "pedidos-do-usuario" ||
            query.queryKey[0] === "todos-pedidos" ||
            query.queryKey[0] === "orcamentos-do-usuario" ||
            query.queryKey[0] === "todos-orcamentos" ||
            query.queryKey[0] === "pedido-detalhes",
        }),
          toast.success("Pedido gerado com sucesso.", { duration: 2000 });
        setTimeout(() => {
          navigate(
            `${data.etapa === "ORCAMENTO" ? "/orcamento/meus-orcamentos" : "/pedido/meus-pedidos"}`,
          );
        }, 2300);
      },
      onError: (error) => {
        toast.error(`Algo deu errado, ${error.message}`, { duration: 3500 });
      },
    });
  };

  const [renderLista, setRenderLista] = useState<ClienteValidator[]>();
  const [serach, setSearch] = useState<string>();

  useEffect(() => {
    setRenderLista(showClientes()?.slice(0, 100));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientesDoUsuarioQuery.data, todosClientesQuery.data]);

  useEffect(() => {
    if (serach) {
      const filtro = showClientes()?.filter(
        (cliente) =>
          normalize(cliente.nome).includes(normalize(serach)) ||
          normalize(cliente.razao_social).includes(normalize(serach)) ||
          normalize(cliente.documento).includes(normalize(serach)),
      );
      setRenderLista(filtro?.slice(0, 100));
    } else {
      setRenderLista(showClientes()?.slice(0, 100));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serach]);

  return (
    <section className="min-h-[500px] p-4 mobile:w-full mobile:p-2">
      <Toaster />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-10">
          <Dialog
            open={clienteIsOpen}
            onOpenChange={() => setClienteIsOpen((prev) => !prev)}
          >
            <DialogTrigger asChild>
              <div className="flex cursor-pointer items-center">
                <FormField
                  name="cliente"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full mobile:w-full">
                      <FormLabel>Cliente *</FormLabel>
                      <FormControl>
                        <Input
                          className="cursor-pointer capitalize"
                          placeholder="Cliente"
                          value={`${
                            showClientes()
                              ?.find((cliente) => cliente._id === field.value)
                              ?.nome.toLowerCase() ?? ""
                          }`}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]  mobile:flex mobile:h-[85%] mobile:flex-col">
              <DialogHeader>
                <DialogTitle>Selecione o Cliente</DialogTitle>
                <Input
                  placeholder="Filtro"
                  value={serach}
                  onChange={(ev) => setSearch(ev.target.value)}
                />
              </DialogHeader>

              <div className="h-[400px] max-h-[400px] overflow-hidden mobile:h-full mobile:min-h-full">
                <ScrollArea className="h-[400px]">
                  {renderLista?.map((cliente) => (
                    <div
                      className={cn(
                        "mb-1 flex cursor-pointer items-center rounded-md p-2 capitalize hover:bg-muted",
                        {
                          "bg-muted": cliente._id === form.getValues("cliente"),
                        },
                      )}
                      key={cliente._id}
                      onClick={() => {
                        form.setValue("cliente", cliente._id);

                        setClienteIsOpen(false);
                      }}
                    >
                      {cliente.nome.toLowerCase()}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          cliente._id === form.getValues("cliente")
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </div>
                  ))}

                  {(clientesDoUsuarioQuery.isLoading ||
                    todosClientesQuery.isLoading) && (
                    <div className="flex justify-center">
                      <Loader className="animate-spin" size={18} />
                    </div>
                  )}

                  {renderLista?.length === 0 && (
                    <p className="text-center opacity-40">
                      cliente não encontrado...
                    </p>
                  )}
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-4 mobile:flex-col mobile:items-start">
            <FormField
              name="prazo_entrega"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col mobile:w-full">
                  <FormLabel className="pb-3">Previsão de entrega *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal mobile:w-full",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ptBR })
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="condicao_pagamento"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/3 mobile:w-full">
                  <FormLabel>Condição de pagamento *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={form.getValues("condicao_pagamento")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {todasCondicoesDePagamentoQuery.data?.map((condicao) => (
                        <SelectItem
                          value={condicao.descricao}
                          key={condicao._id}
                        >
                          {condicao.descricao}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between gap-6 mobile:flex-col">
            <FormField
              name="codigo_de_barra"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/3 mobile:w-full">
                  <FormLabel>Código de barra</FormLabel>
                  <FormControl>
                    <Input placeholder="Código de barra" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="transportadora"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/3 mobile:w-full">
                  <FormLabel>Transportadora</FormLabel>
                  <FormControl>
                    <Input placeholder="Transportadora" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="telefone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/3 mobile:w-full">
                  <FormLabel>Telefone para contato</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Telefone" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between gap-4 mobile:flex-col">
            <FormField
              name="entrega_coleta"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/2 mobile:w-full">
                  <FormLabel>Entrega ou Coleta</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Entrega ou Coleta"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="pedido_especial"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/2 mobile:w-full">
                  <FormLabel>Pedido especial</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Pedido especial"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="observacoes"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder="Observações" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            {detalhes?.etapa === "ORCAMENTO" ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    title="Esta opção cria um novo pedido com base neste orçamento."
                    type="button"
                    className="flex w-[110px] min-w-[110px] gap-2"
                    // onClick={gerarPedido}
                    disabled={
                      editarPedidoOrcamento.isPending || produtos.length === 0
                    }
                  >
                    {editarPedidoOrcamento.isPending ||
                    criarPedido.isPending ? (
                      <Loader className="animate-spin" size={16} />
                    ) : (
                      <span>Gerar Pedido</span>
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Gerar Pedido ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Certifique-se que as alterações foram salvas, após
                      confirmar o será possível modificar.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-destructive">
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={gerarPedido}>
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              (user?.permissao === "ADM" || user?.permissao === "DEV") && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      title="Esta opção converte o pedido de ANÁLISE para FINALIZADO."
                      type="button"
                      className="flex w-[140px] min-w-[140px] gap-2"
                      // onClick={confirmarPedido}
                      disabled={
                        editarPedidoOrcamento.isPending ||
                        detalhes?.etapa === "FINALIZADO" ||
                        produtos.length === 0
                      }
                    >
                      {editarPedidoOrcamento.isPending ||
                      confirmarPedidoMutation.isPending ? (
                        <Loader className="animate-spin" size={16} />
                      ) : (
                        <span>Confirmar pedido</span>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar pedido ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Certifique-se que as alterações foram salvas, após
                        confirmar o pedido não será possível modificar.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-destructive">
                        Cancelar
                      </AlertDialogCancel>

                      <AlertDialogAction onClick={confirmarPedido}>
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )
            )}

            <Button
              type="submit"
              title="Salva todas as modificações."
              className="flex w-[130px] min-w-[130px] gap-2"
              disabled={
                editarPedidoOrcamento.isPending ||
                detalhes?.etapa === "FINALIZADO" ||
                produtos.length === 0
              }
            >
              {editarPedidoOrcamento.isPending ? (
                <Loader className="animate-spin" size={16} />
              ) : (
                <span>Salvar Alterações</span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
