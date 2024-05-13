import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormCadastrarCliente } from "./useFormCadastrarCliente";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/Auth/AuthContext";
import { useContext, useState } from "react";
import { permissaoSchema } from "@/utils/enums/Permicao";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, CheckIcon, Loader2, Search } from "lucide-react";
import estados_brasil from "@/utils/json/estados_brasil.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertDialogComponent } from "@/components/AlertDialogComponent/AlertDialogComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { useTodosUsuariosQuery } from "@/hooks/queries/usuario/admin/useTodosUsuariosQuery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FormCadastrarCliente = () => {
  const { todosUsuariosQuery } = useTodosUsuariosQuery();
  const { user } = useContext(AuthContext);
  const {
    form,
    submit,
    fetchCEP,
    isLoading: isLoadingViaCEP,
    statusResponse,
    resetStatus,
    isPending,
  } = useFormCadastrarCliente();

  const [openUsuarioResponsavel, setOpenUsuarioResponsavel] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="flex h-fit justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex flex-col gap-2 p-2"
        >
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(-1)}
                  >
                    <ArrowLeftCircle />
                  </Button>
                  Cadastre um novo cliente
                </div>
              </CardTitle>

              <CardDescription>
                Assim que o cadastro for concluído, o cliente já estará
                disponível em sua lista.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
              {user?.permissao === permissaoSchema.Enum.ADM ||
                (user?.permissao === permissaoSchema.Enum.DEV && (
                  <FormField
                    name="usuario_responsavel"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-between pt-1">
                        <FormLabel>Usuário responsável *</FormLabel>
                        <Popover
                          open={openUsuarioResponsavel}
                          onOpenChange={setOpenUsuarioResponsavel}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "justify-between text-xs",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {(field.value &&
                                  todosUsuariosQuery.data?.length && (
                                    <div className="flex items-center gap-2">
                                      <Avatar
                                        className="h-5 w-5"
                                        src={
                                          todosUsuariosQuery.data?.find(
                                            (usuario) =>
                                              usuario._id === field.value,
                                          )?.avatar
                                        }
                                      />
                                      {
                                        todosUsuariosQuery.data?.find(
                                          (usuario) =>
                                            usuario._id === field.value,
                                        )?.nome
                                      }
                                    </div>
                                  )) ??
                                  "Selecione"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0" align="start">
                            <Command className="max-h-52">
                              <ScrollArea className="h-52">
                                <CommandGroup>
                                  {todosUsuariosQuery.data?.map((usuario) => (
                                    <CommandItem
                                      className="text-xs"
                                      value={usuario._id}
                                      key={usuario._id}
                                      onSelect={() => {
                                        form.setValue(
                                          "usuario_responsavel",
                                          usuario._id,
                                        );
                                        setOpenUsuarioResponsavel(false);
                                      }}
                                    >
                                      <div className="flex items-center gap-2">
                                        <Avatar
                                          src={usuario.avatar}
                                          className="h-5 w-5"
                                        />
                                        {usuario.nome}
                                      </div>
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          usuario._id === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </ScrollArea>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

              <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">
                <FormField
                  name="nome"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail *</FormLabel>
                      <FormControl>
                        <Input placeholder="E-mail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">
                <FormField
                  name="documento"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Documento *</FormLabel>
                      <FormControl>
                        <Input placeholder="Documento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="telefone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="Telefone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">
                {/* <FormField
                  name="documento"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Documento *</FormLabel>
                      <FormControl>
                        <Input placeholder="Documento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  name="inscricao_estadual"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inscrição estadual *</FormLabel>
                      <FormControl>
                        <Input placeholder="Inscrição estadual" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="razao_social"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Razão Social *</FormLabel>
                      <FormControl>
                        <Input placeholder="Razão Social" {...field} />
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

              <div className="flex justify-between gap-2 mobile:flex-col">
                <FormField
                  name="endereco.cep"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-[30%] mobile:w-full">
                      <FormLabel>CEP *</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input maxLength={9} placeholder="CEP" {...field} />
                        </FormControl>
                        <Button
                          variant="outline"
                          size="icon"
                          type="button"
                          onClick={fetchCEP}
                        >
                          {isLoadingViaCEP ? (
                            <Loader2 className="w-4 animate-spin" />
                          ) : (
                            <Search className="w-4" />
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="endereco.logradouro"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-[60%] mobile:w-full">
                      <FormLabel>Logradouro *</FormLabel>
                      <FormControl>
                        <Input placeholder="Logradouro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-4 gap-4 mobile:grid-cols-1">
                <FormField
                  name="endereco.localidade"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localidade *</FormLabel>
                      <FormControl>
                        <Input placeholder="Localidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="endereco.bairro"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro *</FormLabel>
                      <FormControl>
                        <Input placeholder="Bairro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="endereco.numero"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numero *</FormLabel>
                      <FormControl>
                        <Input placeholder="Numero" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="endereco.uf"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UF *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={
                            estados_brasil.find(
                              (estado) => estado.sigla === field.value,
                            )?.sigla
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione UF" />
                          </SelectTrigger>
                          <SelectContent>
                            {estados_brasil.map((estado) => (
                              <SelectItem value={`${estado.sigla}`}>
                                {estado.nome} - {estado.sigla}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="endereco.complemento"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder="Complemento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                type="reset"
                onClick={() => form.reset()}
                disabled={isPending}
              >
                Limpar
              </Button>
              <Button
                variant="secondary"
                type="submit"
                disabled={isPending}
                onClick={() => {
                  console.log(form.getValues());
                }}
              >
                {isPending ? (
                  <Loader2 className="w-4 animate-spin" />
                ) : (
                  "Salvar"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      {statusResponse && (
        <AlertDialogComponent
          isOpen={statusResponse != null}
          title={statusResponse.title}
          description={statusResponse.description}
          confirmBtnText="Continuar"
          confirmFn={resetStatus}
        />
      )}
    </section>
  );
};
