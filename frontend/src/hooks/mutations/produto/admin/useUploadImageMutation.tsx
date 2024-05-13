import { useKmbApi } from "@/lib/axios/useKmbApi";
import { useMutation } from "@tanstack/react-query";

export const useUploadProdutoImageMutation = () => {
  const { kmbApi } = useKmbApi();

  const upload = async ({ id, file }: { id: string; file: FormData }) => {
    const { data } = await kmbApi.post(`/upload/produto/${id}`, file);

    return data;
  };

  const uploadProdutoImageMutation = useMutation({
    mutationKey: ["upload-produto-image"],
    mutationFn: upload,
  });

  return { uploadProdutoImageMutation };
};
