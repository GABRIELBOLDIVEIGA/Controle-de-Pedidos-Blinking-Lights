import { usePedidoDetalhadoQuery } from "@/hooks/queries/pedido/usePedidoDetalhadoQuery";
import { useEditarPedidoStore } from "@/store/useEditarPedidoStore";
import { useContext, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, CircleFadingPlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { EditarProdutosForm } from "@/components/Editar-Pedido-Orcamento/EditarProdutosForm/EditarProdutosForm";
import { EditarDetalhesForm } from "@/components/Editar-Pedido-Orcamento/EditarDetalhesForm/EditarDetalhesForm";
import { AuthContext } from "@/context/Auth/AuthContext";
import { ModalProdutos } from "@/components/Modal-Produtos/ModalProdutos";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
import { totalDoPedidoV2 } from "@/utils/helpers/calculosProduto/v2/total-pedido-v2";

export const EditarPedidoOrcamento = () => {
  const setCliente = useEditarPedidoStore((state) => state.setCliente);
  const setUsuario = useEditarPedidoStore((state) => state.setUsuario);
  const setProdutos = useEditarPedidoStore((state) => state.setProdutos);
  const produtos = useEditarPedidoStore((state) => state.produtos);
  const setDetalhes = useEditarPedidoStore((state) => state.setDetalhes);
  const detalhes = useEditarPedidoStore((state) => state.detalhes);
  const { pedidoDetalhadoQuery } = usePedidoDetalhadoQuery();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (pedidoDetalhadoQuery.data) {
      setProdutos(pedidoDetalhadoQuery.data.produtos);
      setCliente(pedidoDetalhadoQuery.data.cliente);
      setUsuario(pedidoDetalhadoQuery.data.usuario);
      setDetalhes({ ...pedidoDetalhadoQuery.data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedidoDetalhadoQuery.data]);

  return (
    <section className="my-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowLeftCircle />
              </Button>
              Editar {detalhes?.etapa === "ORCAMENTO" ? "Orçamento" : "Pedido"}
            </div>
            <div>
              <ModalProdutos>
                <Button variant="ghost" size="icon">
                  <CircleFadingPlusIcon />
                </Button>
              </ModalProdutos>
            </div>
          </CardTitle>
          <CardDescription>
            {user?.permissao === "USER" && detalhes?.etapa != "ORCAMENTO"
              ? "Após um pedido ser gerado ele só pode ser modificado pelo administrador."
              : "Modifique os campos desejados e lembre se de salvar."}
          </CardDescription>
        </CardHeader>

        <Separator />

        <EditarProdutosForm />

        <div className="pt-4 text-center">
          <p className="text-lg font-bold tracking-wider">
            Total:{" "}
            <span className="text-base font-semibold">
              {currencyFormt(totalDoPedidoV2(produtos))}
            </span>
          </p>
        </div>

        <Separator className="my-6" />

        <EditarDetalhesForm />
      </Card>
    </section>
  );
};
