import { Item, ItemActions, ItemContent, ItemGroup, ItemMedia } from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';

import Toggle from './toggle';

export default function Loading() {
  return (
    <>
      <Toggle category="" />
      <Skeleton className="scroll-m-20 text-4xl font-semibold tracking-tight mt-10 mb-4 h-12 w-[140] rounded animate-pulse"></Skeleton>
      <ItemGroup className="mt-4 w-full gap-6 flex flex-col">
        {[1, 2, 3, 4, 5].map(i => (
          <Item
            className="flex-col items-start sm:flex-row sm:items-center w-full border border-border rounded-md p-4 gap-4 flex"
            key={i}>
            <div className="flex gap-4 grow sm:w-0">
              <ItemMedia>
                <Skeleton className="rounded-md w-16 h-16" />
              </ItemMedia>
              <ItemContent className="flex flex-1 flex-col gap-1">
                <Skeleton className="h-[24] w-[160]" />
                <Skeleton className="h-[16] w-[80]" />
                <Skeleton className="h-[21] w-[320]" />
              </ItemContent>
            </div>
            <ItemActions>
              <Skeleton className="h-8 w-14 rounded-md" />
              <Skeleton className="h-8 w-14 rounded-md" />
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </>
  );
}
