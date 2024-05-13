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
import { ArrowLeft, CheckIcon, Loader } from "lucide-react";
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
import { useNovoPedidoStepStore } from "@/store/useStepNovoPedido";
import { Badge } from "@/components/ui/badge";
import { useProdutosStore } from "@/store/useProdutosStore";
import { useTodosClientesQuery } from "@/hooks/queries/cliente/admin/useTodosClientesQuery";
import { useClientesDoUsuarioQuery } from "@/hooks/queries/cliente/useClientesDoUsuarioQuery";
import { useTodasCondicoesDePagamentoQuery } from "@/hooks/queries/condicao-de-pagamento/useTodasCondicoesDePagamentoQuery";
import { useCriarPedido } from "@/hooks/mutations/pedido/post-pedido";
import { useLocation, useNavigate } from "react-router-dom";
import { queryClient } from "@/lib/react-query/queryClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClienteValidator } from "@/utils/validators/Cliente";
import { normalize } from "@/utils/helpers/normalize";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
import { totalDoPedidoV2 } from "@/utils/helpers/calculosProduto/v2/total-pedido-v2";

export const DetalhesStep = () => {
  const { user } = useContext(AuthContext);
  const { form } = useDetalhesDoPedido();
  const { todosClientesQuery } = useTodosClientesQuery();
  const { clientesDoUsuarioQuery } = useClientesDoUsuarioQuery();
  const { todasCondicoesDePagamentoQuery } =
    useTodasCondicoesDePagamentoQuery();
  const { criarPedido } = useCriarPedido();
  const length = useNovoPedidoStepStore((state) => state.length);
  const step = useNovoPedidoStepStore((state) => state.step);
  const back = useNovoPedidoStepStore((state) => state.back);
  const resetStep = useNovoPedidoStepStore((state) => state.resetStep);
  const reset = useProdutosStore((state) => state.reset);
  const [pedidoGerado, setPedidoGerado] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [clienteIsOpen, setClienteIsOpen] = useState(false);
  const produtos = useProdutosStore((state) => state.produtos);

  function showClientes() {
    if (
      user?.permissao === permissaoSchema.enum.ADM ||
      user?.permissao === permissaoSchema.enum.DEV
    ) {
      return todosClientesQuery.data;
    }

    return clientesDoUsuarioQuery.data;
  }

  const submit = (data: DetathlesDoPedidoFormType) => {
    criarPedido.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === "pedidos-do-usuario" ||
            query.queryKey[0] === "orcamentos-do-usuario" ||
            query.queryKey[0] === "todos-pedidos" ||
            query.queryKey[0] === "pedidos-table" ||
            query.queryKey[0] === "pedidos-do-usuario-table" ||
            query.queryKey[0] === "todos-orcamentos-table" ||
            query.queryKey[0] === "orcamentos-do-usuario-table" ||
            query.queryKey[0] === "todos-orcamentos",
        }),
          reset();
        setPedidoGerado(true);
        toast.success(
          `${data.etapa === "ORCAMENTO" ? "Orçamento" : "Pedido"} gerado com sucesso`,
          { duration: 2000 },
        );
        setTimeout(() => {
          navigate(
            `${data.etapa === "ORCAMENTO" ? "/orcamento/meus-orcamentos" : "/pedido/meus-pedidos"}`,
          );
          resetStep();
        }, 2300);
      },
      onError: () => {
        toast.error(
          `Algo deu errado ao gerar o ${data.etapa === "ORCAMENTO" ? "Orçamento" : "Pedido"}.`,
          { duration: 1500 },
        );
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
              <div className="flex items-center">
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
            <DialogContent className="sm:max-w-[425px] mobile:flex mobile:h-[85%] mobile:flex-col">
              <DialogHeader>
                <DialogTitle>Selecione o Cliente</DialogTitle>
                <Input
                  placeholder="Filtro"
                  value={serach}
                  onChange={(ev) => setSearch(ev.target.value)}
                />
              </DialogHeader>

              <div className="h-[400px] max-h-[400px] overflow-hidden mobile:h-full mobile:min-h-full">
                <ScrollArea className="h-[400px] mobile:h-[85%]">
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
                        <SelectValue placeholder="Selecione uma condição de pagamento." />
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

          <div>
            <div className="pb-4 text-center">
              <p className="text-lg font-bold tracking-wider">
                Total:{" "}
                <span className="text-base font-semibold">
                  {currencyFormt(totalDoPedidoV2(produtos))}
                </span>
              </p>
            </div>

            <div className="flex justify-between p-4 align-middle mobile:px-0">
              <Button className="space-x-2" onClick={() => back()}>
                <ArrowLeft size={18} className="translate-y-0.5" />
                <span>voltar</span>
              </Button>

              <Badge className="h-fit rounded-full">
                {step + 1} / {length}
              </Badge>

              <Button
                type="submit"
                title={
                  location.pathname === "/orcamento/novo-orcamento"
                    ? "Criar um novo Orçamento"
                    : "Criar um novo Pedido"
                }
                className="flex w-[130px] min-w-[130px] gap-2"
                disabled={pedidoGerado}
              >
                {criarPedido.isPending ? (
                  <Loader className="animate-spin" size={16} />
                ) : (
                  <span>
                    {location.pathname === "/orcamento/novo-orcamento"
                      ? "Gerar Orçamento"
                      : "Gerar Pedido"}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};
