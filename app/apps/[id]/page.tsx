import { decode } from 'html-entities';
import { Download, ShieldCheck, Star } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
  params: Promise<{
    id: string;
  }>;
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
    minute: '2-digit'
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
  const score = Math.min(5, Math.max(0, Math.round(detail.score)));

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NavigateBack>应用市场</NavigateBack>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{detail.appInfo.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="surface-panel-strong p-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
            <Image
              className="size-24 shrink-0 rounded-lg object-cover shadow-[0_10px_24px_rgba(45,57,64,0.18)] sm:size-28"
              width={112}
              height={112}
              src={detail.appInfo.icon}
              alt=""
              loading="eager"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-medium text-white">{detail.appInfo.name}</h1>
                <span className="rounded-md bg-white/14 px-2.5 py-1 text-xs text-white/78">
                  {detail.appInfo.classification_name}
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/74">{detail.appInfo.introduction}</p>
              <div className="mt-4 flex flex-wrap divide-x divide-white/20 text-sm text-white/72">
                <span className="pr-4">{addNumberSeparator(detail.download_counts)} 次下载</span>
                <span className="px-4">{formatSize(detail.appInfo.size)}</span>
                <span className="px-4">Android {detail.sdk}+</span>
                <span className="flex items-center gap-1 pl-4">
                  <Star className="size-4 fill-[#f0cf67] text-[#f0cf67]" />
                  {detail.score}
                </span>
              </div>
            </div>
          </div>
          <Button className="w-full cursor-pointer lg:w-auto" size="lg" asChild>
            <Link href={detail.appInfo.download}>
              <Download />
              下载应用
            </Link>
          </Button>
        </div>
      </section>

      <Tabs className="w-full" defaultValue="introduction">
        <TabsList>
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
          <section className="pt-3">
            <h2 className="mb-3 text-xl font-medium text-white">应用介绍</h2>
            <div className="max-w-4xl whitespace-pre-wrap text-sm leading-7 text-white/76 sm:text-base">
              {decode(detail.description.replaceAll('&amp;', '&'))}
            </div>
            {detail.images.length ? (
              <div className="mt-6">
                <h2 className="mb-3 text-xl font-medium text-white">应用截图</h2>
                <Images images={detail.images.map(item => item.image_path)} />
              </div>
            ) : null}
          </section>
        </TabsContent>

        <TabsContent value="detail">
          <FieldGroup className="pt-3">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {detail.app_developer ? (
                <Field>
                  <FieldLabel>开发者</FieldLabel>
                  <div className="break-words text-sm leading-6 text-white">{detail.app_developer}</div>
                </Field>
              ) : null}
              {detail.icp ? (
                <Field>
                  <FieldLabel>备案号</FieldLabel>
                  <div className="break-words text-sm leading-6 text-white">{detail.icp}</div>
                </Field>
              ) : null}
              <Field>
                <FieldLabel>发布时间</FieldLabel>
                <div className="text-sm leading-6 text-white">{formatDateTime(new Date(detail.add_time))}</div>
              </Field>
              <Field>
                <FieldLabel>包名</FieldLabel>
                <div className="break-all text-sm leading-6 text-white">{detail.appInfo.package_name}</div>
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
                <div className="flex gap-1 text-[#f0cf67]">
                  {Array.from({ length: score }, (_, i) => (
                    <Star className="size-4 fill-current" key={i} />
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
                    查看隐私协议
                  </Link>
                </Field>
              ) : null}
            </div>
          </FieldGroup>
        </TabsContent>

        <TabsContent value="permission">
          <section className="pt-3">
            <div className="mb-4 flex items-center gap-2 text-sm text-white/70">
              <ShieldCheck className="size-4" />共 {detail.permissions.length} 项权限
            </div>
            <Accordion type="single" collapsible className="w-full">
              {detail.permissions.map(item => (
                <AccordionItem key={item.permission_en} value={item.permission_en}>
                  <AccordionTrigger>
                    <div className="flex min-w-0 grow justify-between gap-4">
                      <span>{item.permission_cn}</span>
                      <span className="hidden min-w-0 truncate font-normal text-white/50 sm:block">
                        {item.permission_en}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>{item.permission_intro}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AppDetail;
