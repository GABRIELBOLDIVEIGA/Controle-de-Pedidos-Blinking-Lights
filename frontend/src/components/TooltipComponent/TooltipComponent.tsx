import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ITooltip {
  children: React.ReactElement;
  title: string;
}

export const TooltipComponent = ({ ...props }: ITooltip) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent>
          <p>{props.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
