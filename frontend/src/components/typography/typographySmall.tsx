import { cn } from "@/lib/utils";
import { ITypography } from "./ITypography";

export function TypographySmall(props: ITypography) {
  return (
    <small className={cn("text-sm font-medium leading-none", props.className)}>
      {props.children}
    </small>
  );
}
