import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormCadastrarUsuario } from "./useFormCadastrarUsuario";
import estados_brasil from "@/utils/json/estados_brasil.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, CheckIcon, Loader2, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { AlertDialogComponent } from "@/components/AlertDialogComponent/AlertDialogComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const FormCadastarUsuario = () => {
  const [openUF, setOpenUF] = useState(false);
  const {
    form,
    resetStatus,
    submit,
    fetchCEP,
    statusResponse,
    isLoading: isLoadingViaCEP,
    isPending,
  } = useFormCadastrarUsuario();
  const navigate = useNavigate();

  return (
    <section className="grid place-content-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex  flex-col gap-2 p-2"
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
                  Cadastre um novo usuário
                </div>
              </CardTitle>

              <CardDescription>
                Assim que o cadastro for concluído, o usuário terá acesso à
                aplicação.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
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
              <div className="grid grid-cols-3 gap-4 pt-2 mobile:grid-cols-1">
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
                  name="razao_social"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Razão Social</FormLabel>
                      <FormControl>
                        <Input placeholder="Razão Social" {...field} />
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

              <FormField
                name="observacoes"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="pt-2">
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder="Observações" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between gap-2 pt-2 mobile:flex-col">
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

              <div className="grid grid-cols-4 gap-4 pt-2 mobile:grid-cols-1">
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
                    <FormItem className="flex flex-col justify-between pt-1">
                      <FormLabel>UF *</FormLabel>
                      <Popover open={openUF} onOpenChange={setOpenUF}>
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
                              {(field.value && (
                                <>
                                  {
                                    estados_brasil.find(
                                      (estado) => estado.sigla === field.value,
                                    )?.nome
                                  }
                                  {" - "}
                                  {
                                    estados_brasil.find(
                                      (estado) => estado.sigla === field.value,
                                    )?.sigla
                                  }
                                </>
                              )) ??
                                "Selecione"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command className="max-h-52">
                            <CommandInput
                              placeholder="Nome do estado..."
                              className="h-9"
                            />
                            <CommandEmpty className="px-2">
                              Não encontrado.
                            </CommandEmpty>

                            <ScrollArea className="h-52">
                              <CommandGroup>
                                {estados_brasil?.map((estado) => (
                                  <CommandItem
                                    className="text-xs"
                                    value={estado.nome}
                                    key={estado.nome}
                                    onSelect={() => {
                                      form.setValue("endereco.uf", estado.nome);
                                      setOpenUF(false);
                                    }}
                                  >
                                    {estado.nome} - {estado.sigla}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        estado.nome === field.value
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
              </div>

              <FormField
                name="endereco.complemento"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="pt-2">
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder="Complemento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="ativo"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="cursor-pointer">Ativo</FormLabel>
                      <FormDescription>
                        Ao ativar essa opção, o usuário pode acessar a
                        aplicação.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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
              <Button variant="secondary" type="submit" disabled={isPending}>
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
