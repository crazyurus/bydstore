import { AppWindow, ArrowRight, Image as ImageIcon, Palette } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { JSX } from 'react';

import { getFeaturedContent } from './lib/app';
import { getList as getThemeList } from './lib/theme';
import SelectPlatform from './select';

const modules = [
  {
    title: '应用市场',
    eyebrow: 'APP STORE',
    icon: AppWindow,
    href: '/apps',
    className: 'md:col-span-2 md:row-span-2'
  },
  {
    title: '主题中心',
    eyebrow: 'THEMES',
    icon: Palette,
    href: '/themes?type=theme',
    className: ''
  },
  {
    title: '精选壁纸',
    eyebrow: 'WALLPAPERS',
    icon: ImageIcon,
    href: '/themes?type=wallpaper',
    className: ''
  }
];

interface Props {
  searchParams: Promise<{
    platform?: string;
  }>;
}

async function EntryPage(props: Props): Promise<JSX.Element> {
  const searchParams = await props.searchParams;
  const platform = searchParams.platform || '4';
  const [featuredContent, themes, wallpapers] = await Promise.all([
    getFeaturedContent(platform),
    getThemeList('theme', platform).catch(() => []),
    getThemeList('wallpaper', platform).catch(() => [])
  ]);
  const moduleImages = [
    featuredContent.banners[0]?.pictureUrl,
    themes[0]?.landCover || featuredContent.banners[1]?.pictureUrl,
    wallpapers[0]?.landCover || featuredContent.banners[2]?.pictureUrl
  ];

  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <h1 className="page-title">BYD Store</h1>
        <div className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:w-auto">
          <span className="shrink-0 text-sm text-white/72">当前平台</span>
          <SelectPlatform platform={platform} />
        </div>
      </header>

      <section aria-label="内容入口">
        <div className="grid auto-rows-[210px] gap-4 md:grid-cols-2 md:auto-rows-[180px] lg:grid-cols-3">
          {modules.map((item, index) => {
            const Icon = item.icon;
            const href = item.href + (item.href.includes('?') ? '&' : '?') + `platform=${platform}`;
            const image = moduleImages[index];

            return (
              <Link
                key={item.href}
                href={href}
                className={`group relative overflow-hidden rounded-lg border border-white/24 bg-[#647781] shadow-[0_12px_28px_rgba(43,56,64,0.14)] ${item.className}`}>
                {image ? (
                  <Image
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    src={image}
                    alt=""
                    fill
                    sizes={item.className ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 34vw'}
                    unoptimized
                    priority={item.href === '/apps'}
                  />
                ) : (
                  <Icon
                    className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 text-white/18"
                    strokeWidth={1.2}
                  />
                )}
                <div className="scene-image-shade absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs text-white/72">
                      <Icon className="size-4" strokeWidth={1.7} />
                      <span>{item.eyebrow}</span>
                    </div>
                    <h3 className="text-2xl font-medium text-white">{item.title}</h3>
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/90 text-[#33444d] transition-colors group-hover:bg-white">
                    <ArrowRight className="size-5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default EntryPage;
