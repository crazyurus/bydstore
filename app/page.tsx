import { AppWindow, Image, Palette } from 'lucide-react';
import Link from 'next/link';
import type { JSX } from 'react';

import SelectPlatform from './select';

const modules = [
  {
    title: '应用',
    icon: AppWindow,
    href: '/apps',
    color: 'text-sky-100',
    description: '浏览车机应用、版本信息与详细介绍',
    accent: 'from-sky-300/28 via-sky-100/12 to-transparent'
  },
  {
    title: '主题',
    icon: Palette,
    href: '/themes?type=theme',
    color: 'text-violet-100',
    description: '挑选适配车机的主题风格与视觉资源',
    accent: 'from-violet-300/28 via-violet-100/12 to-transparent'
  },
  {
    title: '壁纸',
    icon: Image,
    href: '/themes?type=wallpaper',
    color: 'text-emerald-100',
    description: '快速查看并切换不同的高品质车机壁纸',
    accent: 'from-emerald-300/28 via-emerald-100/12 to-transparent'
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

  return (
    <div className="flex grow flex-col justify-center gap-8">
      <section className="surface-panel-strong relative overflow-hidden rounded-4xl px-6 py-8 sm:px-8 sm:py-10">
        <div className="surface-highlight absolute inset-y-0 right-0 w-1/2 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_348px] lg:items-end">
          <div className="space-y-5">
            <div className="inline-flex items-center rounded-full border subtle-divider bg-white/10 px-4 py-1.5 text-xs tracking-[0.22em] text-white/76 uppercase">
              DiLink
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">欢迎使用 BYD Store</h1>
              <p className="max-w-2xl text-base leading-7 text-white/84 sm:text-lg">
                包含 DiLink 应用市场中的应用，以及百变主题中的主题与壁纸。
              </p>
            </div>
          </div>
          <div className="page-section flex flex-col gap-3">
            <div className="text-sm tracking-[0.18em] text-white/68 uppercase">平台选择</div>
            <div className="text-xl font-medium text-white">DiLink 平台</div>
            <SelectPlatform platform={platform} />
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {modules.map(item => {
          const Icon = item.icon;
          const href = item.href + (item.href.includes('?') ? '&' : '?') + `platform=${platform}`;

          return (
            <Link
              key={item.href}
              href={href}
              className="surface-panel group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[30px] p-6 text-card-foreground transition-all hover:-translate-y-1 hover:bg-white/14">
              <div className={`absolute inset-0 bg-linear-to-br ${item.accent}`} />
              <div className="relative flex items-start justify-between">
                <div className="rounded-3xl border subtle-divider bg-white/12 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                  <Icon className={`size-10 ${item.color}`} strokeWidth={1.6} />
                </div>
                <div className="rounded-full border subtle-divider bg-white/8 px-3 py-1 text-xs tracking-[0.18em] text-white/68 uppercase">
                  进入
                </div>
              </div>
              <div className="relative space-y-3">
                <h2 className="text-3xl font-semibold text-white">{item.title}</h2>
                <p className="min-h-12 text-sm leading-6 text-white/80">{item.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default EntryPage;
