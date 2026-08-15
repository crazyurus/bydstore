import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20 bg-white/10" />
        <Skeleton className="h-5 w-4 bg-white/8" />
        <Skeleton className="h-5 w-32 bg-white/10" />
      </div>

      <section className="surface-panel-strong p-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Skeleton className="size-28 shrink-0 bg-white/12" />
            <div>
              <Skeleton className="h-9 w-64 max-w-[65vw] bg-white/12" />
              <Skeleton className="mt-3 h-5 w-[34rem] max-w-[70vw] bg-white/8" />
              <div className="mt-4 flex gap-3">
                <Skeleton className="h-5 w-28 bg-white/10" />
                <Skeleton className="h-5 w-20 bg-white/10" />
                <Skeleton className="h-5 w-24 bg-white/10" />
              </div>
            </div>
          </div>
          <Skeleton className="h-12 w-36 bg-white/14" />
        </div>
      </section>

      <Skeleton className="h-12 w-64 bg-white/10" />
      <div className="pt-3">
        <Skeleton className="h-7 w-28 bg-white/12" />
        <Skeleton className="mt-4 h-5 w-full bg-white/10" />
        <Skeleton className="mt-2 h-5 w-4/5 bg-white/8" />
        <div className="mt-6 flex gap-4 overflow-hidden">
          {[1, 2, 3].map(item => (
            <Skeleton key={item} className="h-[170px] w-[304px] shrink-0 bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
