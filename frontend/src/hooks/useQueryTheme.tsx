import { useTheme } from "@/context/Theme/useTheme";
import { useEffect, useState } from "react";

export const useQueryTheme = () => {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(theme.includes("dark"));
  }, [theme]);

  return { isDark };
};
