'use client';

import { AppWindow, House, Palette } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { JSX, PropsWithChildren } from 'react';

const dockLinks = [
  { href: '/', label: '首页', icon: House },
  { href: '/themes?type=theme&platform=4', label: '主题', icon: Palette },
  { href: '/apps?platform=4', label: '应用', icon: AppWindow }
];

function VehicleShell(props: PropsWithChildren): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="vehicle-shell">
      <main className="vehicle-content">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-8 sm:py-7 lg:px-12">{props.children}</div>
      </main>

      <nav className="vehicle-dock" aria-label="主导航">
        <div className="dock-primary">
          {dockLinks.map(item => {
            const Icon = item.icon;
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href.split('?')[0]);

            return (
              <Link
                key={item.href}
                className="dock-primary-button"
                data-active={active}
                href={item.href}
                aria-label={item.label}
                title={item.label}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default VehicleShell;
