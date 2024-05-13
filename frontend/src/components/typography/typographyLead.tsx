import { cn } from "@/lib/utils";
import { ITypography } from "./ITypography";

export function TypographyLead(props: ITypography) {
  return (
    <p className={cn("text-xl text-muted-foreground", props.className)}>
      {props.children}
    </p>
  );
}
