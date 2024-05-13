import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MainOLD = () => {
  return (
    <ScrollArea className="h-[94%] pt-6">
      <main>
        <div className="flex h-full justify-center">
          <div className="h-full w-4/5">
            <Outlet />
          </div>
        </div>
      </main>
    </ScrollArea>
  );
};
