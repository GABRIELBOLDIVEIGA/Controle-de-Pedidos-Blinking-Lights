import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TypographyMuted } from "@/components/typography/typographyMuted";
import { TypographyH3 } from "@/components/typography/typographyH3";
import { Card } from "@/components/ui/card";
import { SwitchThema } from "@/components/SwitchThema/SwitchThema";
import { Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useLoginForm } from "./form/useLoginForm";
import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
}

export const CardLogin = ({ className }: IProps) => {
  const { form, submit, loading } = useLoginForm();

  return (
    <section
      className={cn(
        "flex w-1/2 flex-col items-center p-8 mobile:w-full mobile:p-2",
        className,
      )}
    >
      <div className="flex w-full items-center justify-end">
        <SwitchThema />
      </div>
      <div className="flex h-full items-center justify-center ">
        <Card className="h-fit p-8 mobile:border-none mobile:p-0 mobile:shadow-none">
          <div className="flex flex-col items-center gap-2 pb-4">
            <TypographyH3>Acesse sua conta.</TypographyH3>
            <TypographyMuted>
              Digite seu e-mail e senha abaixo para acessar sua conta.
            </TypographyMuted>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="flex flex-col gap-2"
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
                        disabled={loading}
                      />
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha aqui."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-2"></div>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : "Entrar"}
              </Button>
              <div className="flex items-center justify-evenly pt-3">
                <Separator className="w-1/5" />

                <Link to="/login/esqueci-minha-senha">
                  <Button type="button" variant="link">
                    Esqueci minha senha
                  </Button>
                </Link>

                <Separator className="w-1/5" />
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
};
