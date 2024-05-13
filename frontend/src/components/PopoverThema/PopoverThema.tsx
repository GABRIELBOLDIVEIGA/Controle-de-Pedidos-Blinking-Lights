import { Button } from "../ui/button";
import { useContext } from "react";
import { ThemeProviderContext } from "@/context/Theme/Theme-provider";
import { Moon, Sun } from "lucide-react";

export const ButtonThema = () => {
  const contextThema = useContext(ThemeProviderContext);

  return (
    <>
      {contextThema.theme === "dark" ? (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => contextThema.setTheme("light")}
        >
          <Sun className="w-5" />
        </Button>
      ) : (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => contextThema.setTheme("dark")}
        >
          <Moon className="w-5" />
        </Button>
      )}
    </>
  );
};
