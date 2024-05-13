import { usePedidoDetalhadoQuery } from "@/hooks/queries/pedido/usePedidoDetalhadoQuery";
import { Produto } from "./Produto/Produto";
import { useEditarPedidoStore } from "@/store/useEditarPedidoStore";
import { CircleFadingPlusIcon, Loader } from "lucide-react";

export const EditarProdutosForm = () => {
  const produtos = useEditarPedidoStore((state) => state.produtos);
  const { pedidoDetalhadoQuery } = usePedidoDetalhadoQuery();

  return (
    <section className="min-h-[250px]">
      <div className="space-y-1">
        {pedidoDetalhadoQuery.isLoading ? (
          <div className="mt-6 flex items-center justify-center">
            <Loader size={18} className="animate-spin" />
          </div>
        ) : (
          !produtos.length && (
            <p className="flex w-full justify-center pt-4">
              A lista de produtos não pode estar vazia, adicione produtos
              <span className="px-2">
                <CircleFadingPlusIcon />
              </span>
              antes de salvar as modificações.
            </p>
          )
        )}
        {!pedidoDetalhadoQuery.isLoading &&
          produtos.map((produto) => (
            <div key={produto.item._id}>
              <Produto key={produto.item._id} {...produto} />
            </div>
          ))}
      </div>
    </section>
  );
};
