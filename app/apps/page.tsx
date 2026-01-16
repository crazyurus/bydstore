import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';

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
    <>
      <Toggle category={category} />
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mt-10 mb-4">{title}</h1>
      <ItemGroup className="mt-4 w-full gap-6">
        {apps.map(item => (
          <Item className="flex-col items-start sm:flex-row sm:items-center" key={item.id} variant="outline" asChild>
            <Link href={`/apps/${item.id}`}>
              <div className="flex gap-4 grow sm:w-0">
                <ItemMedia>
                  <Image
                    className="border rounded-md w-16 h-16 bg-gray-50 dark:bg-gray-800"
                    src={item.icon}
                    alt={item.name}
                    width={64}
                    height={64}
                    loading="lazy"
                  />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="text-base">{item.name}</ItemTitle>
                  <ItemDescription className="text-xs">{item.version}</ItemDescription>
                  <ItemDescription className="line-clamp-1 break-all">{item.introduction}</ItemDescription>
                </ItemContent>
              </div>
              <ItemActions>
                <ActionButton url={item.download} />
              </ItemActions>
            </Link>
          </Item>
        ))}
      </ItemGroup>
    </>
  );
}

export default AppStore;
