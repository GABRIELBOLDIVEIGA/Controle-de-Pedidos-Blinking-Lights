import { Menu } from "./Menu/Menu";
import { MenuPerfil } from "./MenuPerfil/MenuPerfil";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { CarrinhoSheet } from "../CarrinhoSheet/CarrinhoSheet";
import { SwitchThema } from "../SwitchThema/SwitchThema";
import { MenuMobile } from "./Menu/MenuMobile";

interface IProps {
  className?: string;
}

export const Cabecalho = ({ ...props }: IProps) => {
  return (
    <div
      className={cn(
        "sticky top-0 z-50 flex w-full justify-between border-b-[1px] border-primary bg-popover py-2 mobile:px-2 tablet:px-2 desktop:px-16",
        props.className,
      )}
    >
      <MenuMobile className="hidden mobile:block" />

      <Menu className="mobile:hidden" />

      <div className="flex items-center">
        <CarrinhoSheet>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="w-4" />
          </Button>
        </CarrinhoSheet>
        <div className="pr-2">
          <SwitchThema />
        </div>

        <MenuPerfil />
      </div>
    </div>
  );
};
