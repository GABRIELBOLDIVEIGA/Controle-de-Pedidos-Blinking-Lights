import { cn } from "@/lib/utils";
import { useState } from "react";
import box from "@/assets/box.png";

interface IImgagemProduto {
  className?: string;
  src: string;
}
export function ImgagemProduto({ src, className }: IImgagemProduto) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <img
      className={cn(
        "h-[182px] max-h-[182px] min-h-[182px] w-full object-contain p-4",
        className,
        { "w-full animate-pulse rounded-md bg-muted": isLoading },
      )}
      src={src}
      onError={(ev) => {
        ev.currentTarget.src = `${box}`;
      }}
      onLoad={() => {
        setIsLoading(false);
      }}
      loading="lazy"
    />
  );
}
