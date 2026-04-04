import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';

import { Badge } from '@/components/ui/badge';
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item';

import categories from '../data/category.json';
import { getList } from '../lib/app';
import ActionButton from './action';
import Toggle from './toggle';

interface Props {
  searchParams: Promise<{
    category?: string;
    platform: string;
  }>;
}

async function AppStore(props: Props): Promise<JSX.Element> {
  const searchParams = await props.searchParams;
  const category = searchParams.category || categories[0].id.toString();
  const platform = searchParams.platform;
  const title = categories.find(item => item.id.toString() === category)?.name;
  const apps = await getList(category, platform);

  return (
    <div className="flex flex-col gap-6">
      <section className="surface-panel-strong rounded-[30px] px-6 py-6 sm:px-8 sm:py-7">
        <div className="space-y-3">
          <Badge variant="secondary">应用市场</Badge>
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle max-w-2xl">
            以更清晰的卡片层级展示应用信息，保留当前信息结构与跳转方式，减少额外操作。
          </p>
        </div>
      </section>
      <div className="p-2 sm:p-2.5">
        <div className="mx-auto w-fit">
          <Toggle category={category} />
        </div>
      </div>
      <ItemGroup className="w-full gap-4">
        {apps.map(item => (
          <Item
            className="flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
            key={item.id}
            variant="outline"
            asChild>
            <Link href={`/apps/${item.id}`}>
              <div className="flex grow gap-4 sm:w-0">
                <ItemMedia variant="image" className="size-16">
                  <Image className="size-16" src={item.icon} alt={item.name} width={64} height={64} loading="lazy" />
                </ItemMedia>
                <ItemContent>
                  <div className="flex flex-wrap items-center gap-2">
                    <ItemTitle>{item.name}</ItemTitle>
                    <Badge variant="outline">{item.version}</Badge>
                  </div>
                  <ItemDescription className="line-clamp-2 break-all">{item.introduction}</ItemDescription>
                </ItemContent>
              </div>
              <ItemActions>
                <ActionButton />
              </ItemActions>
            </Link>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}

export default AppStore;
