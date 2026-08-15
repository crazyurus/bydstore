import { ChevronRight, Download, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';

import categories from '../data/category.json';
import { getAllApps, getFeaturedContent, getList } from '../lib/app';
import Toggle from './toggle';

interface Props {
  searchParams: Promise<{
    category?: string;
    platform?: string;
    q?: string;
    view?: 'featured' | 'all';
  }>;
}

async function AppStore(props: Props): Promise<JSX.Element> {
  const searchParams = await props.searchParams;
  const category = searchParams.category || categories[0].id.toString();
  const platform = searchParams.platform || '4';
  const query = searchParams.q?.trim() || '';
  const view = query ? 'all' : searchParams.view || 'featured';
  const categoryName = categories.find(item => item.id.toString() === category)?.name || '应用';
  const [list, featuredContent, allApps] = await Promise.all([
    view === 'all' ? getList(category, platform) : Promise.resolve([]),
    view === 'featured' ? getFeaturedContent(platform) : Promise.resolve({ banners: [], apps: [] }),
    view === 'featured' ? getAllApps(platform) : Promise.resolve([])
  ]);
  const apps = query
    ? list.filter(item => `${item.name} ${item.introduction}`.toLowerCase().includes(query.toLowerCase()))
    : list;
  const featuredBanners = featuredContent.banners.slice(0, 3);
  const recommendedApps = new Map(featuredContent.apps.map(item => [item.id, item]));

  for (const app of allApps) {
    recommendedApps.set(app.id, app);
  }

  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-5">
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="section-tabs" aria-label="应用市场分区">
            <Link
              className="section-tab"
              data-active={view === 'featured'}
              href={`/apps?platform=${platform}&category=${category}&view=featured`}>
              精选推荐
            </Link>
            <Link
              className="section-tab"
              data-active={view === 'all'}
              href={`/apps?platform=${platform}&category=${category}&view=all#catalog`}>
              全部应用
            </Link>
          </div>
          <form className="relative w-full sm:max-w-64" action="/apps">
            <input type="hidden" name="platform" value={platform} />
            <input type="hidden" name="category" value={category} />
            <input type="hidden" name="view" value="all" />
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/62"
              strokeWidth={1.8}
            />
            <input
              className="h-10 w-full rounded-lg border border-white/18 bg-white/10 pl-10 pr-3 text-sm text-white placeholder:text-white/54 focus:border-white/46 focus:outline-none"
              type="search"
              name="q"
              defaultValue={query}
              placeholder="搜索应用"
              aria-label="搜索应用"
            />
          </form>
        </div>
      </header>

      {view === 'featured' ? (
        <section id="featured" className="flex flex-col gap-7" aria-label="精选应用">
          <div className="grid gap-4 lg:grid-cols-3">
            {featuredBanners.map((item, index) => (
              <Link
                key={item.id}
                href={`/apps/${item.app.id}`}
                className="group overflow-hidden rounded-lg border border-white/20 bg-[#667a85] shadow-[0_10px_24px_rgba(44,56,63,0.12)]">
                <div className="relative aspect-[2.45/1] overflow-hidden bg-white/8">
                  <Image
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                    src={item.pictureUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority={index === 0}
                  />
                </div>
                <div className="flex min-h-16 items-center gap-3 px-3 py-2.5">
                  <Image
                    className="size-10 shrink-0 rounded-md object-cover"
                    src={item.app.icon}
                    alt=""
                    width={40}
                    height={40}
                  />
                  <div className="min-w-0 grow">
                    <h2 className="truncate text-sm font-medium text-white">{item.app.name}</h2>
                    <p className="mt-0.5 truncate text-xs text-white/60">{item.app.introduction}</p>
                  </div>
                  <span className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-[#e4e8ef] px-3 text-xs text-[#304048]">
                    安装
                    <Download className="size-3.5" strokeWidth={1.8} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-medium text-white">热门推荐</h2>
                <p className="mt-1 text-sm text-white/64">来自 BYD 应用市场的实时推荐</p>
              </div>
              <Link
                className="text-sm text-white/68 hover:text-white"
                href={`/apps?platform=${platform}&category=${category}&view=all`}>
                查看全部
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[...recommendedApps.values()].slice(0, 18).map(item => (
                <Link
                  className="group flex min-w-0 flex-col items-center rounded-lg px-3 py-4 text-center hover:bg-white/8"
                  key={item.id}
                  href={`/apps/${item.id}`}>
                  <Image
                    className="size-18 rounded-lg object-cover shadow-[0_8px_18px_rgba(43,55,62,0.16)] sm:size-20"
                    src={item.icon}
                    alt=""
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                  <h3 className="mt-3 w-full truncate text-sm font-medium text-white" title={item.name}>
                    {item.name}
                  </h3>
                  <span className="mt-1 text-xs text-white/54">{item.version}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {view === 'all' ? (
        <section id="catalog" className="scroll-mt-4">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-medium text-white">全部应用</h2>
              <p className="mt-1 text-sm text-white/64">
                {categoryName}
                {query ? ` · “${query}”` : ''}
              </p>
            </div>
            <div className="max-w-full overflow-x-auto pb-1">
              <Toggle category={category} />
            </div>
          </div>

          {apps.length ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {apps.map(item => (
                <Link
                  className="group flex min-w-0 flex-col items-center rounded-lg border border-transparent px-3 py-4 text-center hover:border-white/16 hover:bg-white/8"
                  key={item.id}
                  href={`/apps/${item.id}`}>
                  <Image
                    className="size-18 rounded-lg object-cover shadow-[0_8px_18px_rgba(43,55,62,0.16)] sm:size-20"
                    src={item.icon}
                    alt=""
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                  <h3 className="mt-3 w-full truncate text-base font-medium text-white" title={item.name}>
                    {item.name}
                  </h3>
                  <span className="mt-1 text-xs text-white/56">{item.version}</span>
                  <span className="mt-3 inline-flex h-8 min-w-24 items-center justify-center gap-1 rounded-lg bg-[#60737e]/74 px-3 text-xs text-white/82 group-hover:bg-[#dfe5ed] group-hover:text-[#314049]">
                    查看
                    <ChevronRight className="size-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="surface-panel flex min-h-48 items-center justify-center px-6 text-center text-white/70">
              没有找到匹配的应用
            </div>
          )}
        </section>
      ) : null}
    </div>
  );
}

export default AppStore;
