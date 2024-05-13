import { AlertDialogComponent } from "@/components/AlertDialogComponent/AlertDialogComponent";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useFormEditarProduto } from "./useFormEditarPorduto";
import { useEffect, useState } from "react";
import defaultImg from "@/assets/box.png";
import { Avatar } from "@/components/Avatar/Avatar";
import { useTodosProdutosQuery } from "@/hooks/queries/produto/admin/useTodosProdutos";

export const FormEditarProduto = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { form, isPending, resetStatus, submit, statusResponse, Toaster } =
    useFormEditarProduto();
  const [preview, setPreview] = useState<string>();

  const { todosProdutosQuery } = useTodosProdutosQuery();

  useEffect(() => {
    const produto = todosProdutosQuery.data?.find(
      (produto) => produto._id === params.id,
    );
    setPreview(produto?.urlImg);
  }, [params.id, todosProdutosQuery.data]);

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
    <section className="flex h-fit justify-center">
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex w-3/5 flex-col gap-2 p-2 mobile:w-full"
        >
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/produto/todos-detalhes")}
                  >
                    <ArrowLeftCircle />
                  </Button>
                  Atualize dados do produto
                </div>
              </CardTitle>

              <CardDescription>
                Assim que os dados forem atualizados, o produto estará
                disponível.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex justify-between gap-4">
                <div className="w-2/3 space-y-2 mobile:w-full">
                  <FormField
                    name="codigo"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código *</FormLabel>
                        <FormControl>
                          <Input placeholder="Código" {...field} />
                        </FormControl>
                        <FormMessage className="dark:font-bold" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="descricao"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição *</FormLabel>
                        <FormControl>
                          <Input placeholder="Descrição" {...field} />
                        </FormControl>
                        <FormMessage className="dark:font-bold" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      name="preco"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step={0.01}
                              placeholder="Preço"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="dark:font-bold" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="preco_promocional"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço Promocional</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step={0.01}
                              placeholder="Preço Promocional"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="dark:font-bold" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="max-w-1/3 flex w-1/3 mobile:sr-only">
                  <div className="flex w-full max-w-sm flex-col items-center justify-center gap-1.5">
                    <Label
                      htmlFor="picture"
                      className="flex w-full cursor-pointer flex-col items-center space-y-2 py-2 "
                    >
                      <Avatar
                        src={preview ? preview : defaultImg}
                        className="h-[125px] w-[125px] rounded-full object-contain"
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

              <FormField
                name="ativo"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="cursor-pointer">Ativo</FormLabel>
                      <FormDescription>
                        Ao ativar essa opção o produto ficara visível apara
                        todos os representantes.
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

              <FormField
                name="promocao_ativa"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="cursor-pointer">
                        Promoção Ativa
                      </FormLabel>
                      <FormDescription>
                        Ao ativar essa opção o produto pode ser vendido pelo
                        valor promocional.
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

              <FormField
                name="favorito"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="cursor-pointer">Destaque</FormLabel>
                      <FormDescription>
                        Ao ativar essa opção, o produto irá aparecer nas
                        primeiras páginas para todos os representantes.
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
