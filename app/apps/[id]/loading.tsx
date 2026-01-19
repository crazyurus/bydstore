import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Loading() {
  return (
    <>
      <div className="mb-6 flex items-center">
        <Skeleton className="h-6 w-12 rounded animate-pulse"></Skeleton>
        <Skeleton className="h-6 w-8 rounded mx-2 animate-pulse"></Skeleton>
        <Skeleton className="h-6 w-24 rounded animate-pulse"></Skeleton>
      </div>
      <div className="flex sm:gap-8 gap-4">
        <div className="shrink-0">
          <Skeleton className="rounded-md sm:w-30 sm:h-30 w-20 h-20 animate-pulse"></Skeleton>
        </div>
        <div className="grow">
          <div className="flex items-center gap-3">
            <Skeleton className="sm:text-xl text-lg font-bold h-7 w-64 rounded animate-pulse"></Skeleton>
            <Skeleton className="h-6 w-24 rounded-full animate-pulse"></Skeleton>
          </div>
          <Skeleton className="mt-1 h-6 w-full rounded animate-pulse"></Skeleton>
          <div className="flex items-center gap-4 mt-7 sm:static sm:p-0 sm:border-t-0 fixed left-0 bottom-0 border-t w-full px-8 py-4 bg-white dark:bg-zinc-950 z-10">
            <Skeleton className="h-9 w-24 rounded-md animate-pulse"></Skeleton>
            <Skeleton className="h-6 w-32 rounded animate-pulse"></Skeleton>
          </div>
        </div>
      </div>
      <Tabs className="mt-8 w-full grow" defaultValue="introduction">
        <TabsList className="mx-auto sm:mx-0">
          <TabsTrigger className="cursor-pointer" value="introduction">
            <Skeleton className="w-6" />
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="detail">
            <Skeleton className="w-6" />
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="permission">
            <Skeleton className="w-6" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="introduction">
          <Skeleton className="h-6 w-full rounded animate-pulse"></Skeleton>
          <Skeleton className="mt-2 h-6 w-3/4 rounded animate-pulse"></Skeleton>
          <div className="mt-4 -mx-8 sm:mx-0">
            <div className="flex gap-3 overflow-hidden">
              <Skeleton className="snap-start sm:snap-align-none scroll-ml-8 sm:scroll-ml-0 border object-cover rounded-md cursor-pointer shrink-0 w-[288] h-[162] animate-pulse"></Skeleton>
              <Skeleton className="snap-start sm:snap-align-none scroll-ml-8 sm:scroll-ml-0 border object-cover rounded-md cursor-pointer shrink-0 w-[288] h-[162] animate-pulse"></Skeleton>
              <Skeleton className="snap-start sm:snap-align-none scroll-ml-8 sm:scroll-ml-0 border object-cover rounded-md cursor-pointer shrink-0 w-[288] h-[162] animate-pulse"></Skeleton>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="detail">
          <FieldGroup>
            <div className="flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                <Field key={i}>
                  <FieldLabel>
                    <Skeleton className="h-4 w-24 rounded animate-pulse"></Skeleton>
                  </FieldLabel>
                  <Skeleton className="h-4 w-40 rounded animate-pulse"></Skeleton>
                </Field>
              ))}
            </div>
          </FieldGroup>
        </TabsContent>
        <TabsContent value="permission">
          <Accordion type="single" collapsible className="w-full">
            {[1, 2, 3].map(i => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>
                  <div className="flex grow justify-between cursor-pointer">
                    <Skeleton className="h-4 w-24 rounded animate-pulse"></Skeleton>
                    <Skeleton className="h-4 w-32 rounded animate-pulse hidden sm:block"></Skeleton>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <Skeleton className="h-4 w-full rounded animate-pulse"></Skeleton>
                  <Skeleton className="h-4 w-full rounded animate-pulse"></Skeleton>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </>
  );
}
