import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { JSX, PropsWithChildren } from 'react';

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
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900 font-sans">
          <main className="flex min-h-screen w-full max-w-[939px] flex-col p-8 sm:p-16 bg-white dark:bg-zinc-950 shadow-2xl">
            {props.children}
            <div className="mt-10 text-muted-foreground">&copy; Cr4zy Uru5</div>
          </main>
        </div>
        <Progress />
        <Analytics />
      </body>
    </html>
  );
}

export default RootLayout;
