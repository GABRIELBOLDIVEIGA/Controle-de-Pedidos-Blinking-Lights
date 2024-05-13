import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonLista = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((index) => (
        <div className="mr-6 flex h-6 justify-center gap-4" key={index}>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-6" />
        </div>
      ))}
    </>
  );
};
