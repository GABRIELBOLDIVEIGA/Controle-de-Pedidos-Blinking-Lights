import { cn } from "@/lib/utils";
import { ITypography } from "./ITypography";

export function TypographyP(props: ITypography) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", props.className)}>
      {props.children}
    </p>
  );
}
