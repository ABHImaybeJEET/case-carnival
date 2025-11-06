'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SidebarContextProps {
  isCollapsed: boolean;
  isOpen: boolean;
  isMobile: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(
  undefined
);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

function SidebarProvider({
  children,
  collapsed = false,
}: {
  children: React.ReactNode;
  collapsed?: boolean;
}) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(!isMobile);
  const [isCollapsed, setIsCollapsed] = React.useState(
    isMobile ? true : collapsed
  );

  React.useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
      setIsCollapsed(true);
    } else {
      setIsOpen(true);
      setIsCollapsed(collapsed);
    }
  }, [isMobile, collapsed]);

  const contextValue = React.useMemo(
    () => ({ isCollapsed, isOpen, isMobile, setIsOpen, setIsCollapsed }),
    [isCollapsed, isOpen, isMobile, setIsOpen, setIsCollapsed]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div className="flex h-screen w-full">{children}</div>
    </SidebarContext.Provider>
  );
}

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isCollapsed, isOpen, isMobile, setIsOpen } = useSidebar();

  const handleToggle = () => {
    if (isMobile) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <>
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r bg-background transition-transform duration-300 ease-in-out',
          isMobile
            ? isOpen
              ? 'w-64 translate-x-0'
              : 'w-64 -translate-x-full'
            : isCollapsed
            ? 'w-20'
            : 'w-64',
          className
        )}
        ref={ref}
        {...props}
      />
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={handleToggle}
        />
      )}
    </>
  );
});
Sidebar.displayName = 'Sidebar';

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isCollapsed } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(
        'flex h-16 shrink-0 items-center',
        isCollapsed ? 'justify-center' : '',
        className
      )}
      {...props}
    />
  );
});
SidebarHeader.displayName = 'SidebarHeader';

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-1 flex-col overflow-y-auto', className)}
    {...props}
  />
));
SidebarContent.displayName = 'SidebarContent';

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isCollapsed, isMobile, setIsCollapsed } = useSidebar();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div
      ref={ref}
      className={cn(
        'relative mt-auto border-t',
        isCollapsed ? 'p-2' : 'p-4',
        className
      )}
      {...props}
    >
      {isCollapsed && !isMobile ? (
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                User Menu
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent
            side="right"
            align="end"
            className="w-56"
            onCloseAutoFocus={(e) => {
              if (isMenuOpen) {
                e.preventDefault();
              }
            }}
          >
            <div className="p-2">{children}</div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        children
      )}
      {!isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-12 top-1/2 -translate-y-1/2 rounded-full"
          onClick={() => setIsCollapsed((p) => !p)}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      )}
    </div>
  );
});
SidebarFooter.displayName = 'SidebarFooter';

function SidebarMenu({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-1',
        isCollapsed ? 'items-center px-2' : 'px-4'
      )}
    >
      {children}
    </div>
  );
}

const SidebarMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('w-full', className)} {...props} />;
});
SidebarMenuItem.displayName = 'SidebarMenuItem';

const SidebarMenuButton = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    isActive?: boolean;
    tooltip?: string;
  }
>(({ className, href, isActive, tooltip, children, ...props }, ref) => {
  const { isCollapsed } = useSidebar();

  const buttonContent = (
    <Button
      variant={isActive ? 'secondary' : 'ghost'}
      className={cn(
        'w-full gap-3',
        isCollapsed ? 'h-12 justify-center p-0' : 'justify-start',
        className
      )}
      asChild
    >
      <Link href={href!} ref={ref} {...props}>
        {children}
      </Link>
    </Button>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
          <TooltipContent side="right">{tooltip || 'Tooltip'}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return buttonContent;
});
SidebarMenuButton.displayName = 'SidebarMenuButton';

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isCollapsed, isMobile } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(
        'flex-1 transition-all duration-300 ease-in-out',
        !isMobile && (isCollapsed ? 'ml-20' : 'ml-64'),
        className
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = 'SidebarInset';

function SidebarTrigger({ className }: { className?: string }) {
  const { isMobile, setIsOpen } = useSidebar();
  if (!isMobile) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsOpen((prev) => !prev)}
      className={className}
    >
      <MoreHorizontal className="size-5" />
    </Button>
  );
}

export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
};
