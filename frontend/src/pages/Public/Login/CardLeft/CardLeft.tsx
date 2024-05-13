import { TypographyH2 } from "@/components/typography/typographyH2";
import { TextGenerateEffect } from "@/components/TextGenerateEffect/TextGenerateEffect";
import logo2 from "@/assets/nova logo 2.png";
import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
}

export const CardLeft = ({ className }: IProps) => {
  return (
    <section
      className={cn(
        "flex w-1/2 flex-col justify-between bg-muted p-8",
        className,
      )}
    >
      <div>
        <TypographyH2>Controle de Pedidos Blinking-Lights</TypographyH2>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <div className="dark:ring-none flex h-[45%] w-[70%] justify-center overflow-hidden rounded-full">
          <img src={logo2} className="container rounded-full" />
          {/* <img src={import.meta.env.VITE_LOGO} className="container " /> */}
        </div>
      </div>
      <div>
        <TextGenerateEffect words="A solução ideal para sua empresa." />
      </div>
    </section>
  );
};
