import Image from 'next/image';
import type { JSX } from 'react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { addNumberSeparator } from '../../lib/format';
import { getList } from '../lib/theme';
import ActionButton from './action';

interface Props {
  searchParams: Promise<{
    type: 'theme' | 'wallpaper';
    platform: string;
  }>;
}

async function ThemeStore(props: Props): Promise<JSX.Element> {
  const searchParams = await props.searchParams;
  const type = searchParams.type;
  const platform = searchParams.platform;
  const title = type === 'theme' ? '主题' : '壁纸';
  const themes = await getList(type, platform);

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mt-10 mb-4">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {themes.map(item => (
          <Card key={item.rsId} className="flex flex-col overflow-hidden">
            <div className="relative aspect-3/4 w-full bg-muted -mt-6">
              <Image
                className="object-cover transition-all hover:scale-105"
                src={item.landCover}
                alt={item.rsName}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
            </div>
            <CardHeader className="px-4">
              <CardTitle className="text-base line-clamp-1" title={item.rsName}>
                {item.rsName}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-muted-foreground">
              <div className="flex justify-between items-center">
                <span>{item.price > 0 ? `¥${item.price}` : '免费'}</span>
                <span>{addNumberSeparator(item.totalLoad)} 次下载</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
              <ActionButton url={item.fileUrl} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default ThemeStore;
