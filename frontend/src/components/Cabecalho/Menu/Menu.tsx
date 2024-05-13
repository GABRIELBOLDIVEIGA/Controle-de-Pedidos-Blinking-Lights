import { cn } from "@/lib/utils";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "@/context/Auth/AuthContext";
import { useContext, useLayoutEffect, useState } from "react";

import {
  Menu as MenuType,
  menu_adm,
  menu_dev,
  menu_user,
} from "../menu_options";

interface IProps {
  className?: string;
}

export const Menu = ({ className }: IProps) => {
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
    <NavigationMenu className={cn("", className)}>
      <NavigationMenuList>
        {menu?.map((submenu) => (
          <NavigationMenuItem key={submenu.menu_title}>
            <NavigationMenuTrigger
              className={cn("", {
                "bg-muted": location.pathname.includes(submenu.id),
              })}
            >
              {submenu.menu_title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {submenu.options.map((opt) => (
                  <ListItem key={opt.title} title={opt.title} href={opt.href}>
                    {opt.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={`${props.href}`}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
            className,
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
