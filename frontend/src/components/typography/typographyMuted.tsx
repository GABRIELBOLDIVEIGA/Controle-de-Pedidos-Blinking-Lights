import { cn } from "@/lib/utils";
import { ITypography } from "./ITypography";

export function TypographyMuted(props: ITypography) {
  return (
    <p className={cn("text-sm text-muted-foreground", props.className)}>
      {props.children}
    </p>
  );
}
