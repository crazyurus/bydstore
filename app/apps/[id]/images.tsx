import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface Props {
  images: string[];
}

function Images(props: Props): JSX.Element {
  const { images } = props;

  return (
    <ScrollArea>
      <div className="flex gap-4">
        {images.map(item => (
          <Dialog key={item}>
            <DialogTrigger asChild>
              <div className="surface-panel group relative shrink-0 overflow-hidden rounded-[26px]">
                <Image
                  src={item}
                  alt="screenshot"
                  className="h-[170px] w-[304px] cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
                  width={304}
                  height={170}
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-slate-950/30 to-transparent" />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>查看图片</DialogTitle>
              </DialogHeader>
              <Image
                key={item}
                src={item}
                alt="screenshot"
                className="max-h-[75vh] w-full rounded-[22px] object-cover"
                width={1100}
                height={620}
                loading="lazy"
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="cursor-pointer" variant="secondary">
                    关闭
                  </Button>
                </DialogClose>
                <Button className="cursor-pointer" asChild>
                  <Link href={item}>下载</Link>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      <ScrollBar className="sm:visible invisible" orientation="horizontal" />
    </ScrollArea>
  );
}

export default Images;
