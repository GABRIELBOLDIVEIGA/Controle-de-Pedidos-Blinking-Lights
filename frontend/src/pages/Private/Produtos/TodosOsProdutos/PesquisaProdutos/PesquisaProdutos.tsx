import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ProdutoValidator } from "@/utils/validators/Produto";
import { UseQueryResult } from "@tanstack/react-query";
import { ListFilter, Loader2, Search } from "lucide-react";
import { useState } from "react";

interface IProps {
  query: UseQueryResult<ProdutoValidator[], Error>;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  promocaoAtiva: boolean | undefined;
  setPromocaoAtiva: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  className?: string;
}
export const PesquisaProdutos = ({ ...props }: IProps) => {
  const [search, setSearch] = useState("");

  return (
    <form
      className={cn(
        "flex w-fit min-w-[400px] items-center space-x-2 py-4 mobile:flex-col mobile:items-start mobile:gap-2 mobile:pt-0",
        props.className,
      )}
      onSubmit={(ev) => {
        ev.preventDefault();
        props.setPage(0);
        props.setFilter(search);
      }}
    >
      <div className="relative flex w-[300px] mobile:w-full">
        <Input
          placeholder="Pesquisa..."
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          className="w-full bg-popover py-2"
        />
        <Button
          disabled={props.query.isFetching}
          className="absolute right-0"
          size="icon"
          variant="ghost"
          type="submit"
        >
          {props.query.isFetching ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Search size={20} />
          )}
        </Button>
      </div>

      <div className="flex items-center gap-2 mobile:-translate-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <div className=" flex ">
              <Button variant="outline" className="space-x-2">
                <ListFilter size={20} />

                <div
                  className={cn("w-full text-nowrap text-xs", {
                    "sr-only": props.promocaoAtiva === undefined,
                  })}
                >
                  {props.promocaoAtiva === true && (
                    <Badge>Promoção Ativa</Badge>
                  )}
                  {props.promocaoAtiva === false && <Badge>Sem Promoção</Badge>}
                </div>
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-fit space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                value="promocao_ativa"
                id="todos"
                checked={props.promocaoAtiva === undefined}
                onClick={() => {
                  props.setPromocaoAtiva(undefined);
                }}
              />
              <Label htmlFor="todos">Todos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="promocao_ativa"
                checked={props.promocaoAtiva === true}
                onClick={() => {
                  props.setPromocaoAtiva(true);
                }}
              />
              <Label htmlFor="promocao_ativa">Promoção Ativa</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sem_promoca"
                checked={props.promocaoAtiva === false}
                onClick={() => {
                  props.setPromocaoAtiva(false);
                }}
              />
              <Label htmlFor="sem_promoca">Sem Promoção</Label>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </form>
  );
};
