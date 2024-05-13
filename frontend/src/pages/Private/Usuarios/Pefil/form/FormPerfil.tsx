import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftCircle, CheckIcon, Loader2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import estados_brasil from "@/utils/json/estados_brasil.json";
import { cn } from "@/lib/utils";
import { AlertDialogComponent } from "@/components/AlertDialogComponent/AlertDialogComponent";
import React, { useState } from "react";
import { useFormEditarPerfil } from "./useFormEditarPerfil";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/Avatar/Avatar";

export const FormPerfil = () => {
  const [openUF, setOpenUF] = useState(false);
  const navigate = useNavigate();
  const {
    form,
    submit,
    fetchCEP,
    isLoadingCep,
    reset,
    resetStatus,
    statusResponse,
    editarPerfilMutation,
    user,
    Toaster,
  } = useFormEditarPerfil();

  const [preview, setPreview] = useState<string>();
  const handleOnChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const target = ev.target as HTMLInputElement & {
      files: FileList;
    };

    const formData = new FormData();
    formData.append("file", target.files[0]);

    form.setValue("file", formData);

    const preview = URL.createObjectURL(target.files[0]);
    setPreview(preview);
  };

  return (
    <section className="">
      <Toaster />
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
                  Meu Perfil
                </div>
              </CardTitle>

              <CardDescription>
                Manter os dados atualizados é sempre uma boa prática.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 col-start-1 space-y-4">
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

                <div className="max-w-1/3 col-start-3">
                  <div className="flex w-full max-w-sm flex-col items-center justify-center gap-1.5">
                    <Label
                      htmlFor="picture"
                      className="flex w-full cursor-pointer flex-col items-center space-y-2  py-2 "
                    >
                      <Avatar
                        src={preview ? preview : user?.avatar}
                        className="h-[125px] w-[125px] rounded-full object-contain mobile:h-20 mobile:w-20"
                      />
                    </Label>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/png, image/jpeg"
                      multiple={false}
                      className="sr-only h-0"
                      onChange={(ev) => {
                        handleOnChange(ev);
                      }}
                    />
                  </div>
                </div>
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
                          {isLoadingCep ? (
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
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                type="reset"
                onClick={reset}
                disabled={editarPerfilMutation.isPending}
              >
                Limpar
              </Button>
              <Button
                variant="secondary"
                type="submit"
                disabled={editarPerfilMutation.isPending}
              >
                {editarPerfilMutation.isPending ? (
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
