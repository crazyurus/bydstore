import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { JSX, PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui/sonner';

import Progress from './progress';
import VehicleShell from './vehicle-shell';

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
  title: {
    default: 'BYD Store',
    template: '%s | BYD Store'
  },
  description: '适用于 BYD DiLink 的应用、主题与壁纸资源中心'
};

function RootLayout(props: PropsWithChildren): JSX.Element {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <VehicleShell>{props.children}</VehicleShell>
        <Progress />
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}

export default RootLayout;
