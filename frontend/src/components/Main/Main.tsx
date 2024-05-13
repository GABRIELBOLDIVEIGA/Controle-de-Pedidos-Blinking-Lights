import { Outlet } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

export const Main = () => {
  const prod = false;

  return (
    <main className="h-[94%]">
      <ScrollArea className="h-full">
        <div className="flex justify-center">
          <div
            className={cn(
              "max-w-12/12 w-12/12 laptop:w-12/12 mobile:w-full tablet:w-full tablet:px-6 desktop:w-10/12",
              {
                "border-2 mobile:border-red-600 tablet:border-yellow-600 laptop:border-green-600 desktop:border-blue-600":
                  prod,
              },
            )}
          >
            <Outlet />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};
