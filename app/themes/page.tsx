import { Download, Heart, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { JSX } from 'react';

import { addNumberSeparator } from '../../lib/format';
import { getList } from '../lib/theme';

interface Props {
  searchParams: Promise<{
    type?: 'theme' | 'wallpaper';
    platform?: string;
    q?: string;
  }>;
}

async function ThemeStore(props: Props): Promise<JSX.Element> {
  const searchParams = await props.searchParams;
  const type = searchParams.type || 'theme';
  const platform = searchParams.platform || '4';
  const query = searchParams.q?.trim() || '';
  const list = await getList(type, platform);
  const themes = query ? list.filter(item => item.rsName.toLowerCase().includes(query.toLowerCase())) : list;

  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-5">
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="section-tabs" aria-label="资源类型">
            <Link
              className="section-tab"
              data-active={type === 'theme'}
              href={`/themes?type=theme&platform=${platform}`}>
              主题
            </Link>
            <Link
              className="section-tab"
              data-active={type === 'wallpaper'}
              href={`/themes?type=wallpaper&platform=${platform}`}>
              壁纸
            </Link>
          </div>
          <form className="relative w-full sm:max-w-64" action="/themes">
            <input type="hidden" name="platform" value={platform} />
            <input type="hidden" name="type" value={type} />
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/62"
              strokeWidth={1.8}
            />
            <input
              className="h-10 w-full rounded-lg border border-white/18 bg-white/10 pl-10 pr-3 text-sm text-white placeholder:text-white/54 focus:border-white/46 focus:outline-none"
              type="search"
              name="q"
              defaultValue={query}
              placeholder={`搜索${type === 'theme' ? '主题' : '壁纸'}`}
              aria-label={`搜索${type === 'theme' ? '主题' : '壁纸'}`}
            />
          </form>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-medium text-white">{type === 'theme' ? '主题中心' : '精选壁纸'}</h1>
          {query ? <p className="mt-2 text-sm text-white/64">“{query}” 的搜索结果</p> : null}
        </div>
      </header>

      {themes.length ? (
        <section
          className="grid gap-x-5 gap-y-7 md:grid-cols-2 xl:grid-cols-3"
          aria-label={type === 'theme' ? '主题列表' : '壁纸列表'}>
          {themes.map((item, index) => (
            <article key={item.rsId} className="group min-w-0">
              <Link
                className="relative block aspect-[16/9] overflow-hidden rounded-lg border border-white/22 bg-[#647681] shadow-[0_10px_24px_rgba(45,57,64,0.12)]"
                href={item.fileUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`下载${item.rsName}`}>
                <Image
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  src={item.landCover}
                  alt={item.rsName}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  unoptimized
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-black/38 p-4 text-white">
                  <h2 className="min-w-0 truncate text-xl font-medium" title={item.rsName}>
                    {item.rsName}
                  </h2>
                  <span className="shrink-0 rounded-md bg-[#e5e9ef] px-3 py-1.5 text-xs text-[#2f3d45]">
                    {item.price > 0 ? `¥ ${item.price.toFixed(2)}` : '免费'}
                  </span>
                </div>
              </Link>

              <div className="mt-3 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4 text-xs text-white/66">
                  <span className="flex items-center gap-1.5">
                    <Download className="size-3.5" />
                    {addNumberSeparator(item.totalLoad)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Heart className="size-3.5" />
                    {addNumberSeparator(item.totalLike)}
                  </span>
                  <span className="hidden truncate sm:block">{item.portCover ? '横竖屏适配' : '横屏适配'}</span>
                </div>
                <Link
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#61747f] text-white/86 hover:bg-[#dfe5ed] hover:text-[#314049]"
                  href={item.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`下载${item.rsName}`}
                  title="下载">
                  <Download className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="surface-panel flex min-h-56 items-center justify-center px-6 text-center text-white/70">
          没有找到匹配的资源
        </div>
      )}
    </div>
  );
}

export default ThemeStore;
