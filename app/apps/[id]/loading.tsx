import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-12 rounded-full bg-white/10" />
        <Skeleton className="h-6 w-4 rounded-full bg-white/8" />
        <Skeleton className="h-6 w-24 rounded-full bg-white/10" />
      </div>
      <section className="surface-panel-strong rounded-4xl px-6 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4 sm:gap-6">
            <Skeleton className="h-20 w-20 rounded-[28px] bg-white/12 sm:h-30 sm:w-30" />
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-64 rounded-full bg-white/12" />
                <Skeleton className="h-8 w-24 rounded-full bg-white/10" />
              </div>
              <Skeleton className="h-6 w-full max-w-xl rounded-full bg-white/8" />
              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-10 w-32 rounded-full bg-white/10" />
                <Skeleton className="h-10 w-24 rounded-full bg-white/10" />
                <Skeleton className="h-10 w-28 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:min-w-36">
            <Skeleton className="h-11 w-32 rounded-full bg-white/12" />
          </div>
        </div>
      </section>
      <Tabs className="w-full grow" defaultValue="introduction">
        <TabsList className="justify-start overflow-x-auto w-fit mx-auto">
          <TabsTrigger className="cursor-pointer" value="introduction">
            <Skeleton className="h-4 w-8 rounded-full bg-white/16" />
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="detail">
            <Skeleton className="h-4 w-8 rounded-full bg-white/12" />
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="permission">
            <Skeleton className="h-4 w-8 rounded-full bg-white/12" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="introduction">
          <div className="page-section">
            <Skeleton className="h-6 w-full rounded-full bg-white/10" />
            <Skeleton className="mt-2 h-6 w-3/4 rounded-full bg-white/8" />
            <div className="mt-5 flex gap-4 overflow-hidden">
              <Skeleton className="h-[170px] w-[304px] shrink-0 rounded-[26px] bg-white/10" />
              <Skeleton className="h-[170px] w-[304px] shrink-0 rounded-[26px] bg-white/10" />
              <Skeleton className="h-[170px] w-[304px] shrink-0 rounded-[26px] bg-white/10" />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="detail">
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                <Field key={i}>
                  <FieldLabel>
                    <Skeleton className="h-4 w-24 rounded-full bg-white/10" />
                  </FieldLabel>
                  <Skeleton className="h-4 w-40 rounded-full bg-white/8" />
                </Field>
              ))}
            </div>
          </FieldGroup>
        </TabsContent>
        <TabsContent value="permission">
          <div className="page-section">
            <Accordion type="single" collapsible className="w-full">
              {[1, 2, 3].map(i => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>
                    <div className="flex grow cursor-pointer justify-between gap-4">
                      <Skeleton className="h-4 w-24 rounded-full bg-white/10" />
                      <Skeleton className="hidden h-4 w-32 rounded-full bg-white/8 sm:block" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <Skeleton className="h-4 w-full rounded-full bg-white/8" />
                    <Skeleton className="h-4 w-full rounded-full bg-white/8" />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
