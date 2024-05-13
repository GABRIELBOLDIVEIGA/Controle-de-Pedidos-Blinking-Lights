import { TooltipComponent } from "@/components/TooltipComponent/TooltipComponent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";

interface IFavoritosSheet {
  children: React.ReactElement;
}

export const FavoritosSheet = ({ children }: IFavoritosSheet) => {
  const favoritos = ["1", "2", "3", "3"];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">{children}</div>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <div className="h-[90%] space-y-10">
          <SheetHeader>
            <SheetTitle>Meus Favoritos</SheetTitle>
            <SheetDescription>
              Veja em detalhes cada produto em sua lista de favoritos.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[90%]">
            <div className="h-[90%] space-y-2">
              {favoritos.map((favorito) => (
                <Card key={favorito} className="p-2">
                  <div className="relative">
                    <div
                      className="absolute right-0 cursor-pointer"
                      // onClick={() => removeProduto(produto.item)}
                    >
                      <TooltipComponent title="Remover item da lista">
                        <X className="  text-muted-foreground" size={14} />
                      </TooltipComponent>
                    </div>
                    <p className="font-semibold">{favorito}</p>
                    <p className="text-xs text-muted-foreground">{favorito}</p>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
        <SheetFooter>
          <div className="flex w-full items-start justify-between">
            <SheetClose asChild>
              <Link to="/produtos/meus-favoritos">
                <Button className="flex gap-2" type="button">
                  <p>Ver mais</p>
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
