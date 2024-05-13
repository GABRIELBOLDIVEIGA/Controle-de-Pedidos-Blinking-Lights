import { TypographyH2 } from "@/components/typography/typographyH2";
import { TextGenerateEffect } from "@/components/TextGenerateEffect/TextGenerateEffect";
import logo from "@/assets/kmb_logo.png";
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
        <TypographyH2>KMB Rodízios</TypographyH2>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <div className="dark:ring-none flex h-[45%] w-[70%] justify-center overflow-hidden rounded-full">
          <img src={logo} className="container " />
          {/* <img src={import.meta.env.VITE_LOGO} className="container " /> */}
        </div>
      </div>
      <div>
        <TextGenerateEffect words="A indústria de Rodízios que mais cresce no Brasil." />
      </div>
    </section>
  );
};
