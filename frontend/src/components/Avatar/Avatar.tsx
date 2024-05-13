import { CircleUser } from "lucide-react";
import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarSchadcn,
} from "../ui/avatar";

interface IAvatar {
  className?: string;
  src?: string;
}

export const Avatar = ({ ...props }: IAvatar) => {
  return (
    <AvatarSchadcn className={props.className}>
      <AvatarImage src={props.src} />
      <AvatarFallback>
        <CircleUser size={18} />
      </AvatarFallback>
    </AvatarSchadcn>
  );
};
