import { Item, ItemActions, ItemContent, ItemGroup, ItemMedia } from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <section className="surface-panel-strong rounded-[30px] px-6 py-6 sm:px-8 sm:py-7">
        <div className="space-y-3">
          <Skeleton className="h-7 w-24 rounded-full bg-white/12" />
          <Skeleton className="h-12 w-40 rounded-2xl bg-white/12" />
          <Skeleton className="h-6 w-80 max-w-full rounded-2xl bg-white/8" />
        </div>
      </section>
      <div className="p-2 sm:p-2.5">
        <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-2 rounded-full border  subtle-divider bg-white/6 p-1.5 backdrop-blur-xl">
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="h-11 w-20 rounded-full bg-white/10 sm:w-24" />
          ))}
        </div>
      </div>
      <ItemGroup className="flex w-full gap-4">
        {[1, 2, 3, 4, 5].map(i => (
          <Item className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center" key={i}>
            <div className="flex gap-4 grow sm:w-0">
              <ItemMedia variant="image" className="size-16">
                <Skeleton className="size-16 rounded-[18px] bg-white/12" />
              </ItemMedia>
              <ItemContent className="flex flex-1 flex-col gap-1">
                <Skeleton className="h-6 w-40 rounded-full bg-white/12" />
                <Skeleton className="h-6 w-22 rounded-full bg-white/10" />
                <Skeleton className="h-5 w-72 rounded-full bg-white/8" />
              </ItemContent>
            </div>
            <ItemActions>
              <Skeleton className="h-9 w-28 rounded-full bg-white/12" />
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
