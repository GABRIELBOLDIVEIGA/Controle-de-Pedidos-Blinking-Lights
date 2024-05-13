import { cn } from "@/lib/utils";
import { ITypography } from "./ITypography";

export const TypographyH4 = (props: ITypography) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        props.className,
      )}
    >
      {props.children}
    </h4>
  );
};
