import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { AuthContext } from "@/context/Auth/AuthContext";
import { cn } from "@/lib/utils";
import { AlignJustify } from "lucide-react";
import { useContext, useLayoutEffect, useState } from "react";
import {
  Menu as MenuType,
  menu_adm,
  menu_dev,
  menu_user,
} from "../menu_options";
import { useLocation, Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IProps {
  className?: string;
}

export const MenuMobile = ({ className }: IProps) => {
  const { user } = useContext(AuthContext);
  const [menu, setMenu] = useState<MenuType>();

  useLayoutEffect(() => {
    switch (user?.permissao) {
      case "USER":
        setMenu(menu_user);
        break;
      case "ADM":
        setMenu(menu_adm);
        break;
      case "DEV":
        setMenu(menu_dev);
        break;
      default:
        break;
    }
  }, [user]);

  const location = useLocation();

  return (
    <div className={cn("", className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost">
            <AlignJustify />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col justify-between">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <div className="h-[90%]">
            <ScrollArea className="h-full">
              {menu?.map((submenu) => {
                return (
                  <div key={submenu.id} className="">
                    <p
                      className={cn("pb-3 text-lg font-semibold", {
                        "underline underline-offset-2":
                          location.pathname.includes(submenu.id),
                      })}
                    >
                      {submenu.menu_title}
                    </p>

                    <div className="flex flex-col space-y-2 pl-2">
                      {submenu.options.map((opt) => (
                        <SheetClose
                          key={opt.title}
                          asChild
                          className={cn(
                            "py-1 pl-4 text-sm text-muted-foreground",
                            {
                              "rounded-md bg-accent text-primary":
                                location.pathname.includes(opt.href),
                            },
                          )}
                        >
                          <Link title={opt.title} to={opt.href}>
                            {opt.title}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                    <div className="py-2">
                      <Separator />
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
