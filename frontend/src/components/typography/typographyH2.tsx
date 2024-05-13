import { cn } from "@/lib/utils";
import { ITypography } from "./ITypography";

export const TypographyH2 = (props: ITypography) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
        props.className,
      )}
    >
      {props.children}
    </h2>
  );
};
