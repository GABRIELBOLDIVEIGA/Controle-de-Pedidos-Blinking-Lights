import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormPerfil } from "./form/FormPerfil";
import { TabsContent } from "@radix-ui/react-tabs";
import { AlterarSenha } from "./alterar-senha/AlterarSenha";

export const Perfil = () => {
  return (
    <section className="pt-6 mobile:py-6">
      <Tabs
        defaultValue="perfil"
        className="mobile:flex mobile:flex-col mobile:items-center"
      >
        <TabsList className="grid w-[400px] grid-cols-2 mobile:w-[95%]">
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="mudar-senha">Alterar Senha</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <FormPerfil />
        </TabsContent>

        <TabsContent value="mudar-senha">
          <AlterarSenha />
        </TabsContent>
      </Tabs>
    </section>
  );
};
