import { decode } from 'html-entities';
import { Download, Star } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { addNumberSeparator } from '../../../lib/format';
import { getDetail } from '../../lib/app';
import NavigateBack from './back';
import Images from './images';

interface Props {
  params: {
    id: string;
  };
}

function formatSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let size = bytes;

  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }

  return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[i]}`;
}

function formatDateTime(date: Date): string {
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const detail = await getDetail(params.id);

  return {
    title: detail.appInfo.name,
    description: detail.appInfo.introduction
  };
}

async function AppDetail(props: Props): Promise<JSX.Element> {
  const params = await props.params;
  const detail = await getDetail(params.id);

  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NavigateBack>应用</NavigateBack>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{detail.appInfo.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex sm:gap-8 gap-4">
        <div className="shrink-0">
          <Image
            className="rounded-md border sm:w-30 sm:h-30 w-20 h-20 bg-gray-50 dark:bg-gray-800"
            width={120}
            height={120}
            src={detail.appInfo.icon}
            alt="app-icon"
            loading="eager"
          />
        </div>
        <div className="grow">
          <div className="flex items-center gap-3">
            <div className="sm:text-xl text-lg font-bold">{detail.appInfo.name}</div>
            <Badge variant="secondary">{detail.appInfo.classification_name}</Badge>
          </div>
          <div className="mt-1 text-muted-foreground line-clamp-2 sm:text-base text-sm">
            {detail.appInfo.introduction}
          </div>
          <div className="flex items-center gap-4 mt-7 sm:static sm:p-0 sm:border-t-0 fixed left-0 bottom-0 border-t w-full px-8 py-4 bg-white dark:bg-zinc-950 z-10">
            <Button className="cursor-pointer" asChild>
              <Link href={detail.appInfo.download}>
                <Download />
                下载
              </Link>
            </Button>
            <div className="text-sm text-muted-foreground">{addNumberSeparator(detail.download_counts)} 次下载</div>
          </div>
        </div>
      </div>
      <Tabs className="mt-8 w-full grow" defaultValue="introduction">
        <TabsList className="mx-auto sm:mx-0">
          <TabsTrigger className="cursor-pointer" value="introduction">
            介绍
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="detail">
            详情
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="permission">
            权限
          </TabsTrigger>
        </TabsList>
        <TabsContent value="introduction">
          <div className="mt-3 whitespace-pre-wrap">{decode(detail.description.replaceAll('&amp;', '&'))}</div>
          <div className="mt-4 -mx-8 sm:mx-0">
            <Images images={detail.images.map(item => item.image_path)} />
          </div>
        </TabsContent>
        <TabsContent value="detail">
          <FieldGroup className="mt-3">
            <div className="flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-8 ">
              {detail.app_developer ? (
                <Field>
                  <FieldLabel>开发者</FieldLabel>
                  <div>{detail.app_developer}</div>
                </Field>
              ) : null}
              {detail.icp ? (
                <Field>
                  <FieldLabel>备案号</FieldLabel>
                  <div>{detail.icp}</div>
                </Field>
              ) : null}
              <Field>
                <FieldLabel>发布时间</FieldLabel>
                <div>{formatDateTime(new Date(detail.add_time))}</div>
              </Field>
              <Field>
                <FieldLabel>包名</FieldLabel>
                <div>{detail.appInfo.package_name}</div>
              </Field>
              <Field>
                <FieldLabel>版本</FieldLabel>
                <div>{detail.appInfo.version}</div>
              </Field>
              <Field>
                <FieldLabel>大小</FieldLabel>
                <div>{formatSize(detail.appInfo.size)}</div>
              </Field>
              <Field>
                <FieldLabel>兼容性</FieldLabel>
                <div>Android {detail.sdk} 及以上</div>
              </Field>
              <Field>
                <FieldLabel>评分</FieldLabel>
                <div className="flex text-yellow-500 dark:text-yellow-400">{Array(detail.score).fill(<Star />)}</div>
              </Field>
              {detail.privacy_policy ? (
                <Field>
                  <FieldLabel>隐私协议</FieldLabel>
                  <Link className="text-blue-500 dark:text-blue-400" href={detail.privacy_policy} target="_blank">
                    查看
                  </Link>
                </Field>
              ) : null}
            </div>
          </FieldGroup>
        </TabsContent>
        <TabsContent value="permission">
          <Accordion type="single" collapsible className="w-full">
            {detail.permissions.map(item => (
              <AccordionItem key={item.permission_en} value={item.permission_en}>
                <AccordionTrigger>
                  <div className="flex grow justify-between cursor-pointer">
                    <div>{item.permission_cn}</div>
                    <div className="font-normal text-muted-foreground hidden sm:block">{item.permission_en}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  {item.permission_intro}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default AppDetail;
