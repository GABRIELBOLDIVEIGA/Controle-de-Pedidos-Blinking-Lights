import { useQueryTheme } from "@/hooks/useQueryTheme";
import { cn } from "@/lib/utils";

interface IProps {
  children?: React.ReactNode;
}

export function GridBackground({ children }: IProps) {
  const { isDark } = useQueryTheme();

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-white bg-grid-black/[0.04]",
        {
          "bg-black bg-grid-white/[0.07]": isDark,
        },
      )}
    >
      {children}
    </div>
  );
}
