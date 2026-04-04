import { Download, Heart } from 'lucide-react';
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
  const description =
    type === 'theme' ? '整套主题资源，包含完整视觉风格与封面预览。' : '精选车机壁纸资源，适合快速切换不同氛围。';
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
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-slate-950/45 via-slate-950/10 to-transparent" />
              <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
                <Badge variant="secondary">{item.price > 0 ? `¥${item.price}` : '免费'}</Badge>
                <div className="rounded-full border subtle-divider bg-black/18 px-3 py-1 text-xs tracking-[0.14em] text-white/82 uppercase">
                  {title}
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex items-end justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-white/90">{type === 'theme' ? '横屏预览' : '桌面预览'}</div>
                </div>
                {item.portCover ? (
                  <div className="relative hidden h-20 w-14 overflow-hidden rounded-[18px] border subtle-divider bg-white/10 shadow-[0_12px_24px_rgba(23,35,46,0.22)] sm:block">
                    <Image
                      className="object-cover"
                      src={item.portCover}
                      alt={`${item.rsName}-portrait`}
                      fill
                      sizes="56px"
                      loading="lazy"
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <CardHeader className="px-5">
              <CardTitle className="line-clamp-1 text-lg" title={item.rsName}>
                {item.rsName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-5 pt-0 text-sm text-white/78">
              <p className="line-clamp-2 min-h-11 text-sm leading-6 text-white/70">{description}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border subtle-divider bg-white/6 px-4 py-3">
                  <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-white/58 uppercase">
                    <Download className="size-3.5" />
                    下载
                  </div>
                  <div className="mt-2 text-base font-medium text-white">{addNumberSeparator(item.totalLoad)}</div>
                </div>
                <div className="rounded-2xl border subtle-divider bg-white/6 px-4 py-3">
                  <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-white/58 uppercase">
                    <Heart className="size-3.5" />
                    喜欢
                  </div>
                  <div className="mt-2 text-base font-medium text-white">{addNumberSeparator(item.totalLike)}</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{type === 'theme' ? '完整主题' : '精选壁纸'}</Badge>
                <Badge variant="outline">{item.portCover ? '含竖屏预览' : '横屏资源'}</Badge>
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
