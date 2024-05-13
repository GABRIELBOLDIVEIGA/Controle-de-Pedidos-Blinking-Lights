import { useKmbApi } from "@/lib/axios/useKmbApi";
import { useMutation } from "@tanstack/react-query";

export const useUploadAvatarMutation = () => {
  const { kmbApi } = useKmbApi();

  const upload = async ({
    id,
    file,
  }: {
    id: string;
    file: FormData;
  }): Promise<string> => {
    const { data } = await kmbApi.post(`/upload/avatar/${id}`, file);

    return data;
  };

  const uploadAvatarMutation = useMutation({
    mutationKey: ["upload-avatar"],
    mutationFn: upload,
  });

  return { uploadAvatarMutation };
};
