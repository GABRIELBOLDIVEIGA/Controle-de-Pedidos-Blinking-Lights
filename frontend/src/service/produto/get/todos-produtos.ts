import kmbApi from "@/lib/axios/useKmbApi";
import { ProdutoValidator, produtoSchema } from "@/utils/validators/Produto";

export async function fetchTodosProdutos(
  pagina: number,
  limit: number,
  filter: string,
  promocaoAtiva: boolean | undefined,
): Promise<ProdutoValidator[]> {
  if (pagina < 0 || limit < 0) throw new Error();

  const base_url = `/produto?`;
  const filters = `page=${pagina}&limit=${limit}&filter=${filter}`;

  let url = "".concat(base_url, filters);

  if (promocaoAtiva != undefined) {
    url = "".concat(url, `&promocao_ativa=${promocaoAtiva}`);
  }

  const { data } = await kmbApi.get<ProdutoValidator[]>(url);

  const data_filtrada = data.filter((item) => {
    if (produtoSchema.safeParse(item).success) {
      return true;
    } else {
      console.warn("[Data] => ", item);
      console.warn("[Error] => ", produtoSchema.safeParse(item));
      return false;
    }
  });

  return data_filtrada;
}
