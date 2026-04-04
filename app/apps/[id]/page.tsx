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
import { addNumberSeparator } from '@/lib/format';

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
    <div className="flex flex-col gap-6">
      <Breadcrumb>
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
      <section className="surface-panel-strong rounded-4xl px-6 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4 sm:gap-6">
            <div className="h-fit shrink-0 overflow-hidden rounded-[28px] border subtle-divider bg-white/10 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <Image
                className="h-20 w-20 rounded-[20px] sm:h-30 sm:w-30"
                width={120}
                height={120}
                src={detail.appInfo.icon}
                alt="app-icon"
                loading="eager"
              />
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold text-white sm:text-3xl">{detail.appInfo.name}</h1>
                <Badge variant="secondary">{detail.appInfo.classification_name}</Badge>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-white/82 sm:text-base">{detail.appInfo.introduction}</p>
              <div className="flex flex-wrap gap-3">
                <div className="rounded-full border subtle-divider bg-white/8 px-4 py-2 text-sm text-white/78">
                  {addNumberSeparator(detail.download_counts)} 次下载
                </div>
                <div className="rounded-full border subtle-divider bg-white/8 px-4 py-2 text-sm text-white/78">
                  {formatSize(detail.appInfo.size)}
                </div>
                <div className="rounded-full border subtle-divider bg-white/8 px-4 py-2 text-sm text-white/78">
                  SDK {detail.sdk}+
                </div>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:min-w-36">
            <Button className="cursor-pointer" asChild>
              <Link href={detail.appInfo.download}>
                <Download />
                下载应用
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Tabs className="w-full grow" defaultValue="introduction">
        <TabsList className="justify-start overflow-x-auto w-fit mx-auto">
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
          <div className="page-section space-y-5">
            <div className="whitespace-pre-wrap text-sm leading-7 text-white/84 sm:text-base">
              {decode(detail.description.replaceAll('&amp;', '&'))}
            </div>
            <Images images={detail.images.map(item => item.image_path)} />
          </div>
        </TabsContent>
        <TabsContent value="detail">
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {detail.app_developer ? (
                <Field>
                  <FieldLabel>开发者</FieldLabel>
                  <div className="text-sm leading-6 text-white">{detail.app_developer}</div>
                </Field>
              ) : null}
              {detail.icp ? (
                <Field>
                  <FieldLabel>备案号</FieldLabel>
                  <div className="text-sm leading-6 text-white">{detail.icp}</div>
                </Field>
              ) : null}
              <Field>
                <FieldLabel>发布时间</FieldLabel>
                <div className="text-sm leading-6 text-white">{formatDateTime(new Date(detail.add_time))}</div>
              </Field>
              <Field>
                <FieldLabel>包名</FieldLabel>
                <div className="text-sm leading-6 text-white">{detail.appInfo.package_name}</div>
              </Field>
              <Field>
                <FieldLabel>版本</FieldLabel>
                <div className="text-sm leading-6 text-white">{detail.appInfo.version}</div>
              </Field>
              <Field>
                <FieldLabel>大小</FieldLabel>
                <div className="text-sm leading-6 text-white">{formatSize(detail.appInfo.size)}</div>
              </Field>
              <Field>
                <FieldLabel>兼容性</FieldLabel>
                <div className="text-sm leading-6 text-white">Android {detail.sdk} 及以上</div>
              </Field>
              <Field>
                <FieldLabel>评分</FieldLabel>
                <div className="flex text-amber-300">
                  {Array.from({ length: detail.score }, (_, i) => (
                    <Star key={i} />
                  ))}
                </div>
              </Field>
              {detail.privacy_policy ? (
                <Field>
                  <FieldLabel>隐私协议</FieldLabel>
                  <Link
                    className="text-sm text-white underline underline-offset-4"
                    href={detail.privacy_policy}
                    target="_blank"
                    rel="noreferrer">
                    查看
                  </Link>
                </Field>
              ) : null}
            </div>
          </FieldGroup>
        </TabsContent>
        <TabsContent value="permission">
          <div className="page-section">
            <Accordion type="single" collapsible className="w-full">
              {detail.permissions.map(item => (
                <AccordionItem key={item.permission_en} value={item.permission_en}>
                  <AccordionTrigger>
                    <div className="flex grow cursor-pointer justify-between gap-4">
                      <div>{item.permission_cn}</div>
                      <div className="hidden font-normal text-white/58 sm:block">{item.permission_en}</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    {item.permission_intro}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AppDetail;
