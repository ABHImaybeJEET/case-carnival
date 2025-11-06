'use client';
import React, { memo } from 'react';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { navItems } from '@/lib/data';
import { Logo } from '@/components/icons/logo';
import DashboardHeader from '@/components/dashboard/header';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <Logo className="size-8 text-primary" />
            <span className="text-xl font-semibold">Swadesi Go</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  href={item.href}
                  isActive={pathname === item.href}
                  tooltip={item.tooltip}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage
                src="https://picsum.photos/seed/user/40/40"
                data-ai-hint="profile person"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">User</span>
              <span className="text-xs text-muted-foreground">
                user@swadesigo.com
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="flex flex-1 flex-col overflow-y-auto">
          <DashboardHeader />
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default memo(DashboardLayout);
