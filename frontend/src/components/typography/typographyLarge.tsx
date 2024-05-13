import { cn } from "@/lib/utils";
import { ITypography } from "./ITypography";

export function TypographyLarge(props: ITypography) {
  return (
    <div className={cn("text-lg font-semibold", props.className)}>
      {props.children}
    </div>
  );
}
