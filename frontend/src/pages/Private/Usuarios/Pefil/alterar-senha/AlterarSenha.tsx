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
import { useAlterarSenhaForm } from "./useAlterarSenha";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const AlterarSenha = () => {
  const { form, submit, Toaster, editarSenha } = useAlterarSenhaForm();
  return (
    <section className="w-[600px] mobile:w-fit">
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex flex-col gap-2 p-2"
        >
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-4">Alterar Senha</div>
              </CardTitle>

              <CardDescription>
                Escolha uma senha forte para melhor segurança.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between gap-4 mobile:flex-col">
              <div className="w-1/2 space-y-4 mobile:w-full">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" readOnly {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="senha"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha Atual *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Separator orientation="vertical" className="h-full" />
              </div>

              <div className="w-1/2 space-y-4 mobile:w-full">
                <FormField
                  name="nova_senha"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nova Senha *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          type="password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmar_senha"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Nova Senha *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={() => form.reset()}
                disabled={editarSenha.isPending}
              >
                limpar
              </Button>
              <Button
                disabled={editarSenha.isPending}
                variant="secondary"
                type="submit"
              >
                salvar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </section>
  );
};
