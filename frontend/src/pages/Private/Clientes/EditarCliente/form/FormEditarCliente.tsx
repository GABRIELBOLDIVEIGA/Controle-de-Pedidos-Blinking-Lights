import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormEditarCliente } from "./useFormEditarCliente";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftCircle, Loader2, Search } from "lucide-react";
import estados_brasil from "@/utils/json/estados_brasil.json";
import { AlertDialogComponent } from "@/components/AlertDialogComponent/AlertDialogComponent";
import { permissaoSchema } from "@/utils/enums/Permicao";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTodosUsuariosQuery } from "@/hooks/queries/usuario/admin/useTodosUsuariosQuery";

export const FormEditarCliente = () => {
  const { todosUsuariosQuery } = useTodosUsuariosQuery();
  const { user } = useContext(AuthContext);
  const {
    form,
    submit,
    fetchCEP,
    isLoadingCep,
    resetStatus,
    statusResponse,
    editarClienteMutation,
    reset,
  } = useFormEditarCliente();

  const navigate = useNavigate();

  const [showRepresentate, setShowRepresentante] = useState(false);
  useEffect(() => {
    if (
      user?.permissao === permissaoSchema.Enum.ADM ||
      user?.permissao === permissaoSchema.Enum.DEV
    ) {
      setShowRepresentante(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <section className="flex h-fit justify-center p-2">
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
                  Editar Dados do Cliente
                </div>
              </CardTitle>
              <CardDescription>
                Manter os dados dos clientes atualizados é sempre uma boa
                prática.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
              {showRepresentate && (
                <FormField
                  name="usuario_responsavel"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuário responsável *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={todosUsuariosQuery.isLoading || !field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="capitalize">
                            <SelectValue placeholder="Selecione um usuário" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {todosUsuariosQuery.data?.map((usuario) => (
                            <SelectItem
                              className="capitalize"
                              value={`${usuario._id}`}
                            >
                              {usuario.nome.toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
                            <SelectValue
                              placeholder={
                                estados_brasil.find(
                                  (estado) => estado.sigla === field.value,
                                )?.nome
                              }
                            />
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
                onClick={reset}
                disabled={editarClienteMutation.isPending}
              >
                Limpar
              </Button>
              <Button
                variant="secondary"
                type="submit"
                disabled={editarClienteMutation.isPending}
              >
                {editarClienteMutation.isPending ? (
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
