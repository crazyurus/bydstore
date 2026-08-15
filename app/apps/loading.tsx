import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <div className="flex gap-5">
          <Skeleton className="h-10 w-24 bg-white/12" />
          <Skeleton className="h-10 w-24 bg-white/8" />
        </div>
        <Skeleton className="h-10 w-64 max-w-[45vw] bg-white/10" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {[1, 2, 3].map(item => (
          <Skeleton key={item} className="h-48 bg-white/12" />
        ))}
      </div>

      <div className="flex items-end justify-between gap-5">
        <div>
          <Skeleton className="h-8 w-36 bg-white/12" />
          <Skeleton className="mt-2 h-4 w-20 bg-white/8" />
        </div>
        <Skeleton className="h-11 w-96 max-w-[55vw] bg-white/10" />
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 18 }, (_, index) => (
          <div key={index} className="flex flex-col items-center px-3 py-4">
            <Skeleton className="size-20 bg-white/12" />
            <Skeleton className="mt-3 h-5 w-24 bg-white/10" />
            <Skeleton className="mt-2 h-3 w-16 bg-white/8" />
            <Skeleton className="mt-3 h-8 w-24 bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
