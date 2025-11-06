'use client';
import { memo } from 'react';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { navItems } from '@/lib/data';

function DashboardHeader() {
  const pathname = usePathname();
  const currentNavItem = navItems.find((item) => item.href === pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger />
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-xl">
          {currentNavItem?.label || 'Page'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {currentNavItem?.description}
        </p>
      </div>
    </header>
  );
}
export default memo(DashboardHeader);
