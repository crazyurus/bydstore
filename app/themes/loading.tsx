import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <div className="flex gap-5">
          <Skeleton className="h-10 w-20 bg-white/12" />
          <Skeleton className="h-10 w-20 bg-white/8" />
        </div>
        <Skeleton className="h-10 w-64 max-w-[45vw] bg-white/10" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-8 w-32 bg-white/12" />
      </div>
      <div className="grid gap-x-5 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index}>
            <Skeleton className="aspect-video w-full bg-white/12" />
            <div className="mt-3 flex items-center justify-between">
              <Skeleton className="h-4 w-36 bg-white/8" />
              <Skeleton className="size-9 bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
