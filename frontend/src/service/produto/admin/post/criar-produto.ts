import kmbApi from "@/lib/axios/useKmbApi";
import { ProdutoValidator } from "@/utils/validators/Produto";
import { Criar_Produto_Form } from "./produto-form.type";

export async function criarProduto(
  produto: Criar_Produto_Form,
): Promise<ProdutoValidator> {
  const { data } = await kmbApi.post<ProdutoValidator>(
    "/produto/admin",
    produto,
  );

  return data;
}
