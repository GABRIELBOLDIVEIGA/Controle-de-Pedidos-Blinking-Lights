import { cn } from "@/lib/utils";
import { ITypography } from "./ITypography";

export function TypographyH1(props: ITypography) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        props.className,
      )}
    >
      {props.children}
    </h1>
  );
}
