import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface IAlertDialogComponent {
  className?: string;
  isOpen: boolean;
  title?: string;
  description?: string;
  cancelBtnText?: string;
  confirmBtnText?: string;
  cancelFn?: () => void;
  confirmFn?: () => void;
  triggerBtnText?: string;
}
export function AlertDialogComponent({ ...props }: IAlertDialogComponent) {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(props.isOpen);

  return (
    <AlertDialog open={isAlertOpen}>
      {props.triggerBtnText && (
        <AlertDialogTrigger asChild>
          <Button variant="outline" onClick={() => setIsAlertOpen(true)}>
            {props.triggerBtnText}
          </Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {props.cancelBtnText && (
            <AlertDialogCancel
              onClick={() => {
                if (props.cancelFn) props.cancelFn();
                setIsAlertOpen(false);
              }}
            >
              {props.cancelBtnText}
            </AlertDialogCancel>
          )}
          {props.confirmBtnText && (
            <AlertDialogAction
              onClick={() => {
                if (props.confirmFn) props.confirmFn();
                setIsAlertOpen(false);
              }}
            >
              {props.confirmBtnText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
