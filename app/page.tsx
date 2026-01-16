import { AppWindow, Image, Palette } from 'lucide-react';
import Link from 'next/link';
import type { JSX } from 'react';

import SelectPlatform from './select';

const modules = [
  {
    title: '应用',
    icon: AppWindow,
    href: '/apps',
    color: 'text-blue-500'
  },
  {
    title: '主题',
    icon: Palette,
    href: '/themes',
    color: 'text-purple-500'
  },
  {
    title: '壁纸',
    icon: Image,
    href: '/wallpapers',
    color: 'text-green-500'
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
    <div className="grow flex flex-col justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">欢迎使用 BYD Store</h1>
        <p className="text-xl text-muted-foreground">选择 DiLink 平台以及想要浏览的内容</p>
      </div>
      <div className="flex justify-center mt-6 mb-12">
        <SelectPlatform platform={platform} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {modules.map(item => {
          const Icon = item.icon;
          const href = `${item.href}?platform=${platform}`;

          return (
            <Link
              key={item.href}
              href={href}
              className="group relative flex flex-col items-center justify-center p-12 rounded-3xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 cursor-pointer">
              <div className="p-6 rounded-2xl bg-muted/50 mb-8 transition-colors group-hover:bg-muted">
                <Icon className={`w-20 h-20 ${item.color}`} strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-semibold mb-3">{item.title}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default EntryPage;
