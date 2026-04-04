import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { JSX, PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui/sonner';

import Progress from './progress';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'BYD 应用/主题/壁纸市场',
  description: ''
};

function RootLayout(props: PropsWithChildren): JSX.Element {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-4 font-sans sm:px-6 sm:py-6">
          <div className="pointer-events-none absolute left-[-10%] top-[-8%] size-[28rem] rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-12%] right-[-8%] size-[32rem] rounded-full bg-sky-200/10 blur-3xl" />
          <main className="surface-panel-strong relative flex min-h-[calc(100vh-2rem)] w-full max-w-[1180px] flex-col overflow-hidden rounded-[36px] px-6 py-8 sm:min-h-[calc(100vh-3rem)] sm:px-10 sm:py-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-linear-to-b from-white/12 to-transparent" />
            <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-white/10" />
            <div className="relative flex min-h-full flex-col">
              {props.children}
              <div className="mt-10 flex items-center justify-between gap-4 border-t  subtle-divider pt-5 text-xs tracking-[0.24em] text-white/48 uppercase">
                <span>&copy; Cr4zy Uru5</span>
              </div>
            </div>
          </main>
        </div>
        <Progress />
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}

export default RootLayout;
