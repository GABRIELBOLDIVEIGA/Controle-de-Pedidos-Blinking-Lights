import { ImgagemProduto } from "@/components/ImgagemProduto/ImgagemProduto";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useEditarPedidoStore } from "@/store/useEditarPedidoStore";
import { custoAdicionalCodigoDeBarras } from "@/utils/helpers/calculosProduto/custoAdicionalCodigoDeBarras";
import { totalComDescontoV2 } from "@/utils/helpers/calculosProduto/v2/total-com-desconto-v2";
import { utilizarPrecoV2 } from "@/utils/helpers/calculosProduto/v2/utilizar-preco-v2";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
import { ItemPedidoValidator } from "@/utils/validators/ItemPedido";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export function Produto({ ...produto }: ItemPedidoValidator) {
  const produtos = useEditarPedidoStore((state) => state.produtos);
  const addQuantidade = useEditarPedidoStore((state) => state.addQuantidade);
  const updateDescontos = useEditarPedidoStore(
    (state) => state.updateDescontos,
  );
  const resetProduto = useEditarPedidoStore((state) => state.resetProduto);
  const handleCodigoDeBarras = useEditarPedidoStore(
    (state) => state.handleCodigoDeBarras,
  );
  const removeProduto = useEditarPedidoStore((state) => state.removeProduto);
  const handlePromocionalOuEspecial = useEditarPedidoStore(
    (state) => state.handlePromocionalOuEspecial,
  );
  const updatePrecoEspecial = useEditarPedidoStore(
    (state) => state.updatePrecoEspecial,
  );

  const [quant, setQuant] = useState(produto.quantidade);
  const [descontos, setDescontos] = useState(produto.descontos);
  const [precoEspecial, setPrecoEspecial] = useState<string>("0");
  // const [precoEspecial, setPrecoEspecial] = useState<string>(
  //   `${produto.preco_especial === 0 ? undefined : produto.preco_especial}`,
  // );

  useEffect(() => {
    setDescontos(produto.descontos);
    setQuant(produto.quantidade);
    setDescontos(produto.descontos);
    setPrecoEspecial(`${produto.preco_especial}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produtos]);

  return (
    <div className="grid place-self-center border-none px-8 pt-4 mobile:px-2">
      <Card className="p-2">
        <div className="relative flex mobile:flex-col">
          <div className="w-[200px] max-w-[200px] mobile:w-full mobile:max-w-full">
            <div className="flex items-center justify-between px-2">
              <div>
                <p className="font-semibold">{produto.item.descricao}</p>
                <p className="text-xs text-muted-foreground">
                  {produto.item.codigo}
                </p>
              </div>
            </div>
            <div className="mobile:flex mobile:justify-center">
              <ImgagemProduto
                src={produto.item.urlImg}
                className="mobile:h-32 mobile:w-32 mobile:p-0"
              />
            </div>

            <section className="flex w-full items-center gap-4 mobile:pb-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => resetProduto(produto.item._id)}
              >
                limpar
              </Button>

              <div className="flex flex-col">
                <p
                  className={cn("text-xs text-primary", {
                    "text-muted-foreground":
                      (produto.item.promocao_ativa &&
                        produto.com_preco_promocional) ||
                      produto.com_preco_especial,
                  })}
                >
                  Preço: <span>{currencyFormt(produto.item.preco)}</span>
                </p>

                <p
                  className={cn("w-fit text-xs text-muted-foreground", {
                    hidden: !produto.item.promocao_ativa,
                    "text-primary": produto.com_preco_promocional,
                    "text-muted-foreground": produto.com_preco_especial,
                  })}
                >
                  Preço Promo: {currencyFormt(produto.item.preco_promocional)}
                </p>
              </div>
            </section>
          </div>

          <div className="w-[300px] max-w-[300px] space-y-2">
            <form
              className="flex h-fit items-end justify-between space-x-2"
              onSubmit={(ev) => {
                ev.preventDefault();
                addQuantidade(produto.item._id, quant);
              }}
            >
              <div className="w-full space-y-2">
                <Label className="pl-1">Quantidade</Label>
                <Input
                  placeholder="0"
                  type="number"
                  min={1}
                  step={0.01}
                  value={`${quant}`}
                  onChange={(ev) => {
                    setQuant(+ev.target.value);
                  }}
                />
              </div>
              <Button
                variant={quant === 0 ? "destructive" : "default"}
                disabled={quant === produto.quantidade || quant === 0}
              >
                salvar
              </Button>
            </form>

            <form
              className="flex h-fit items-end justify-between space-x-2"
              onSubmit={(ev) => {
                ev.preventDefault();
                updateDescontos(produto.item._id, descontos);
              }}
            >
              <div className="w-full space-y-2">
                <Label className="pl-1">Descontos %</Label>
                <div className="flex justify-between gap-2.5">
                  {descontos.map((desconto, index) => (
                    <Input
                      key={index}
                      className="w-16"
                      placeholder="0"
                      type="number"
                      min={0}
                      max={100}
                      step={0.01}
                      value={`${desconto}`}
                      onChange={(ev) => {
                        const descontosCopy = [...descontos];
                        descontosCopy.splice(index, 1, +ev.target.value);
                        setDescontos([...descontosCopy]);
                      }}
                    />
                  ))}
                </div>
              </div>
              <Button disabled={descontos === produto.descontos}>salvar</Button>
            </form>

            <form>
              <div className="flex  items-center justify-between mobile:pb-2">
                <div>
                  <Label htmlFor={produto.item._id} className="cursor-pointer">
                    Código de Barras
                  </Label>
                  <CardDescription className="text-xs">
                    Esta opção adiciona{" "}
                    <span className="underline underline-offset-2">
                      R$ 0.05
                    </span>{" "}
                    por unidade.
                  </CardDescription>
                </div>
                <Switch
                  id={produto.item._id}
                  checked={produto.com_codigo_de_barra}
                  onClick={() => handleCodigoDeBarras(produto.item._id)}
                />
              </div>
            </form>
          </div>

          <div className="px-2 desktop:px-4">
            <Separator orientation="vertical" />
          </div>

          <div className="w-[300px] max-w-[300px] space-y-2">
            {produto.item.promocao_ativa && (
              <form>
                <div className="flex items-center justify-between gap-2 mobile:pb-2">
                  <div>
                    <Label
                      htmlFor={produto.item._id}
                      className="cursor-pointer"
                    >
                      Preço Promocional
                    </Label>
                    <CardDescription className="text-xs">
                      Esta opção utiliza o preço promocional{" "}
                      <span className="underline underline-offset-2">
                        {produto.promocao_ativa ? (
                          <>
                            <br />
                            {`${currencyFormt(produto.preco_promocional)}`}
                          </>
                        ) : (
                          ""
                        )}
                      </span>{" "}
                      como base de cálculo.
                    </CardDescription>
                  </div>
                  <Switch
                    id={produto.item._id}
                    checked={produto.com_preco_promocional}
                    onClick={() =>
                      handlePromocionalOuEspecial(
                        produto.item._id,
                        "promocional",
                      )
                    }
                  />
                </div>
              </form>
            )}

            <form>
              <div className="flex items-center justify-between gap-2 mobile:pb-2">
                <div>
                  <Label htmlFor={produto.item._id} className="cursor-pointer">
                    Preço Especial
                  </Label>
                  <CardDescription className="text-xs">
                    Esta opção utiliza o preço especial como base de cálculo.
                  </CardDescription>
                </div>
                <Switch
                  id={produto.item._id}
                  checked={produto.com_preco_especial}
                  onClick={() => {
                    handlePromocionalOuEspecial(produto.item._id, "especial");
                  }}
                />
              </div>
            </form>

            <form
              className="flex h-fit items-end justify-between space-x-2 mobile:pb-2"
              onSubmit={(ev) => {
                ev.preventDefault();
                if (precoEspecial)
                  updatePrecoEspecial(produto.item._id, +precoEspecial);
              }}
            >
              <div className="w-full space-y-2">
                <Label className="pl-1">Preço Especial</Label>
                <Input
                  placeholder="0"
                  type="number"
                  min={0}
                  step={0.01}
                  value={precoEspecial}
                  onChange={(ev) => {
                    setPrecoEspecial(ev.target.value);
                  }}
                  disabled={!produto.com_preco_especial}
                />
              </div>
              <Button disabled={+precoEspecial === produto.preco_especial}>
                salvar
              </Button>
            </form>
          </div>

          <div className="px-2 desktop:px-4">
            <Separator orientation="vertical" />
          </div>

          <div className="w-1/5 space-y-6 mobile:w-full mobile:px-2">
            <div className="space-y-1">
              <p className="flex justify-between">
                <span>Preço base:</span>
                {!produto.com_preco_especial && !produto.com_preco_promocional
                  ? currencyFormt(produto.preco)
                  : ""}

                {produto.com_preco_promocional
                  ? currencyFormt(produto.preco_promocional)
                  : ""}
                {produto.com_preco_especial
                  ? currencyFormt(produto.preco_especial)
                  : ""}
              </p>
              <Separator />
            </div>
            <div className="space-y-1">
              <p className="flex justify-between">
                <span>Total Bruto:</span>
                {currencyFormt(
                  produto.quantidade * utilizarPrecoV2(produto),
                  // + custoAdicionalCodigoDeBarras(produto),
                )}
              </p>
              <Separator />
            </div>

            <div className="space-y-1">
              <p className="flex justify-between">
                <span>Desconto:</span>
                {currencyFormt(
                  produto.quantidade * utilizarPrecoV2(produto) -
                    totalComDescontoV2(produto),
                )}
              </p>
              <Separator />
            </div>

            <div className="space-y-1">
              <p className="flex items-baseline justify-between">
                <span>Adicionais:</span>
                {produto.com_codigo_de_barra ? (
                  <>
                    <span className="w-full pl-4 text-xs text-muted-foreground">
                      {produto.quantidade} uni. x R$ 0,05
                    </span>
                    {currencyFormt(custoAdicionalCodigoDeBarras(produto))}
                  </>
                ) : (
                  <>{currencyFormt(0)}</>
                )}
              </p>
              <Separator />
            </div>

            <div className="space-y-1">
              <p className="flex justify-between">
                <span>Total Com Descontos:</span>
                {currencyFormt(
                  totalComDescontoV2(produto) +
                    custoAdicionalCodigoDeBarras(produto),
                )}
              </p>
              <Separator />
            </div>
          </div>

          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => removeProduto(produto.item)}
          >
            <X size={18} className="opacity-50" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
