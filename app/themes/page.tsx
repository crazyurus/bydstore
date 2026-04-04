import Image from 'next/image';
import type { JSX } from 'react';

import { Badge } from '@/components/ui/badge';
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
    <div className="flex flex-col gap-6">
      <section className="surface-panel-strong rounded-[30px] px-6 py-6 sm:px-8 sm:py-7">
        <div className="space-y-3">
          <Badge variant="secondary">{type === 'theme' ? '主题资源' : '壁纸资源'}</Badge>
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle max-w-2xl">
            卡片布局保持不变，统一为更轻量的车机式视觉层级，让封面预览、价格与下载操作更直接。
          </p>
        </div>
      </section>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {themes.map(item => (
          <Card key={item.rsId} className="group flex flex-col overflow-hidden rounded-[30px] p-0">
            <div className="relative aspect-16/10 w-full overflow-hidden bg-white/8">
              <Image
                className="object-cover transition-all duration-500 group-hover:scale-105"
                src={item.landCover}
                alt={item.rsName}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
              <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
                <Badge variant="secondary">{item.price > 0 ? `¥${item.price}` : '免费'}</Badge>
                <div className="rounded-full border subtle-divider bg-black/18 px-3 py-1 text-xs tracking-[0.14em] text-white/82 uppercase">
                  {title}
                </div>
              </div>
            </div>
            <CardHeader className="px-5">
              <CardTitle className="line-clamp-1 text-lg" title={item.rsName}>
                {item.rsName}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pt-0 text-sm text-white/78">
              <div className="flex items-center justify-between gap-4">
                <span>{addNumberSeparator(item.totalLoad)} 次下载</span>
              </div>
            </CardContent>
            <CardFooter className="mt-auto px-5 pb-5 pt-0">
              <ActionButton url={item.fileUrl} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ThemeStore;
