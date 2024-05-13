import { cn } from "@/lib/utils";
import { ITypography } from "./ITypography";

export const TypographyH3 = (props: ITypography) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        props.className,
      )}
    >
      {props.children}
    </h3>
  );
};
