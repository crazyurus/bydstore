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
    <>
      <ScrollArea>
        <div className="flex gap-3 pl-8 sm:pl-0">
          {images.map(item => (
            <Dialog key={item}>
              <DialogTrigger asChild>
                <Image
                  src={item}
                  alt="screenshot"
                  className="snap-start sm:snap-align-none scroll-ml-8 sm:scroll-ml-0 object-cover rounded-md cursor-pointer shrink-0"
                  width={288}
                  height={162}
                  loading="lazy"
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>查看图片</DialogTitle>
                </DialogHeader>
                <Image
                  key={item}
                  src={item}
                  alt="screenshot"
                  className="object-cover"
                  width={462}
                  height={260}
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
          <div className="shrink-0 w-5 sm:hidden" />
        </div>
        <ScrollBar className="sm:visible invisible" orientation="horizontal" />
      </ScrollArea>
    </>
  );
}

export default Images;
