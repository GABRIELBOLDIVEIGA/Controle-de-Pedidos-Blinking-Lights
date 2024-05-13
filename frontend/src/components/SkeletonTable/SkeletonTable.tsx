import { Skeleton } from "../ui/skeleton";

export const SkeletonTable = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="h-[85%] bg-popover">
      <div className="h-[93%] space-y-4">
        <div className="flex justify-between px-4">
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-10 w-20" />
        </div>

        <div className="flex h-[93%] flex-col gap-4 rounded-md rounded-b-none border border-b-transparent pt-2">
          {arr.map((i) => {
            return <Skeleton key={i} className="mx-4 min-h-8 first:h-10" />;
          })}
        </div>
      </div>
      <div className="flex flex-row-reverse rounded-b-md border border-t-transparent py-4">
        <div className="flex h-8 w-2/6 justify-between pr-2">
          <Skeleton className="w-1/5 " />
          <Skeleton className="w-1/5 " />
          <Skeleton className="w-1/5 " />
        </div>
      </div>
    </div>
  );
};
