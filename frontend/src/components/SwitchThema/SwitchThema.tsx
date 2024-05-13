// import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
// import { useContext, useEffect, useState } from "react";
// import { cn } from "@/lib/utils";
// import { ThemeProviderContext } from "@/context/Theme/Theme-provider";
import { useTheme } from "@/context/Theme/useTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export const SwitchThema = () => {
  const { setTheme } = useTheme();
  // const contextThema = useContext(ThemeProviderContext);
  // const [switchTema, setSwitchTema] = useState<boolean>(
  //   contextThema.theme === "light" ? true : false,
  // );

  // useEffect(() => {
  //   contextThema.setTheme(switchTema ? "light" : "dark");
  // }, [contextThema, switchTema]);

  return (
    // <div className="flex items-center gap-1">
    //   <Moon className={cn("w-[18px]", { "text-muted": switchTema })} />
    //   <Switch checked={switchTema} onClick={() => setSwitchTema(!switchTema)} />
    //   <Sun className={cn("w-[18px]", { "text-muted": !switchTema })} />
    // </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex min-w-[90px] flex-col items-center bg-muted"
      >
        <DropdownMenuItem className="flex w-full justify-between bg-muted">
          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("light")}
          >
            <div className="h-[20px] w-[20px] bg-white"></div>
          </div>

          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("dark")}
          >
            <div className="h-[20px] w-[20px] bg-black"></div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex w-full justify-between bg-muted">
          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("violet")}
          >
            <div className="h-[20px] w-[10px] bg-white"></div>
            <div className="h-[20px] w-[10px] bg-[#6d28d9]"></div>
          </div>

          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("dark-violet")}
          >
            <div className="h-[20px] w-[10px] bg-black"></div>
            <div className="h-[20px] w-[10px] bg-[#6d28d9]"></div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex w-full justify-between bg-muted">
          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("red")}
          >
            <div className="h-[20px] w-[10px] bg-white"></div>
            <div className="h-[20px] w-[10px] bg-[#dc2626]"></div>
          </div>

          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("dark-red")}
          >
            <div className="h-[20px] w-[10px] bg-black"></div>
            <div className="h-[20px] w-[10px] bg-[#dc2626]"></div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex w-full justify-between bg-muted">
          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("orange")}
          >
            <div className="h-[20px] w-[10px] bg-white"></div>
            <div className="h-[20px] w-[10px] bg-[#ea580c]"></div>
          </div>

          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("dark-orange")}
          >
            <div className="h-[20px] w-[10px] bg-black"></div>
            <div className="h-[20px] w-[10px] bg-[#ea580c]"></div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex w-full justify-between bg-muted">
          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("yellow")}
          >
            <div className="h-[20px] w-[10px] bg-white"></div>
            <div className="h-[20px] w-[10px] bg-[#e2b814]"></div>
          </div>

          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("dark-yellow")}
          >
            <div className="h-[20px] w-[10px] bg-black"></div>
            <div className="h-[20px] w-[10px] bg-[#e2b814]"></div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex w-full justify-between bg-muted">
          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("blue")}
          >
            <div className="h-[20px] w-[10px] bg-white"></div>
            <div className="h-[20px] w-[10px] bg-[#3576df]"></div>
          </div>

          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("dark-blue")}
          >
            <div className="h-[20px] w-[10px] bg-black"></div>
            <div className="h-[20px] w-[10px] bg-[#3576df]"></div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex w-full justify-between bg-muted">
          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("green")}
          >
            <div className="h-[20px] w-[10px] bg-white"></div>
            <div className="h-[20px] w-[10px] bg-[#22b357]"></div>
          </div>

          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("dark-green")}
          >
            <div className="h-[20px] w-[10px] bg-black"></div>
            <div className="h-[20px] w-[10px] bg-[#22b357]"></div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
