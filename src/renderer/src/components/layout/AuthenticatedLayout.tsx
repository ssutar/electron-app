import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/mode-toggle';
import { useBreadcrumbs } from '@/components/Breadcrumbs/Breadcrumb';
import { Link } from 'react-router-dom';

const LocalBreadcrumb = () => {
  const { breadcrumbs } = useBreadcrumbs();
  if (!breadcrumbs.length) {
    return null;
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((b, index) => {
          return (
            <>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>{b.name}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                      <Link to={b.path}>{b.name}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </>
              )}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="grid w-full grid-cols-1 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b mb-6">
          <div className="flex items-center justify-between gap-2 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-6" />
              <LocalBreadcrumb />
            </div>
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 text-sm">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
