import { SwitchThema } from "@/components/SwitchThema/SwitchThema";
import { TypographyH3 } from "@/components/typography/typographyH3";
import { TypographyMuted } from "@/components/typography/typographyMuted";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormEsqueciMinhaSenha } from "./form/useFormEsqueciMinhaSenha";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialogComponent } from "@/components/AlertDialogComponent/AlertDialogComponent";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export const CardEsqueciMinhaSenha = () => {
  const {
    form,
    submit,
    esqueciMinhaSenhaMutation,
    statusResponse,
    resetStatus,
    Toaster,
  } = useFormEsqueciMinhaSenha();

  return (
    <section className="flex w-1/2 flex-col items-center p-8 mobile:w-full mobile:p-2">
      <Toaster />
      <div className="flex w-full items-center justify-end">
        <SwitchThema />
      </div>
      <div className="flex h-full items-center justify-center  mobile:block mobile:p-0">
        <Card className="h-fit w-4/6  p-8 mobile:w-full mobile:border-none mobile:px-2 mobile:shadow-none">
          <div className="flex flex-col items-center gap-2 pb-4">
            <TypographyH3>Esqueci Minha Senha.</TypographyH3>
            <TypographyMuted>
              Uma nova senha será enviada para o seu e-mail, lembre de verificar
              a caixa de spam.
            </TypographyMuted>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="flex flex-col gap-6"
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu e-mail aqui."
                        {...field}
                        disabled={esqueciMinhaSenhaMutation.isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={esqueciMinhaSenhaMutation.isPending}
              >
                {esqueciMinhaSenhaMutation.isPending ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Solicitar nova senha"
                )}
              </Button>
            </form>
          </Form>
          <div className="flex items-center justify-center pt-3">
            <Separator className="w-2/5" />

            <Link to="/login">
              <Button type="button" variant="link">
                Login
              </Button>
            </Link>

            <Separator className="w-2/5" />
          </div>
        </Card>
      </div>
      {statusResponse && (
        <AlertDialogComponent
          isOpen={!statusResponse.isSuccess}
          title={statusResponse.title}
          description={statusResponse.description}
          confirmBtnText="Continuar"
          confirmFn={resetStatus}
        />
      )}
    </section>
  );
};
