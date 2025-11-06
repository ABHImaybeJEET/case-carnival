import { SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-xl">Welcome Back!</h1>
        <p className="text-sm text-muted-foreground">
          Here's your vehicle's intelligent overview.
        </p>
      </div>
    </header>
  );
}
