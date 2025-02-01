import * as React from 'react';
import { BookAIcon, BookOpen, BookType, Calendar, NotebookPen } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const data = useMemo(
    () => ({
      navMain: [
        {
          title: t('sidebar.navMain.updates'),
          url: '#',
          icon: NotebookPen,
          isActive: true,
          items: [
            {
              title: t('sidebar.navMain.allUpdates'),
              url: '/updates',
            },
            {
              title: t('sidebar.navMain.addUpdates'),
              url: '/updates/add',
            },
          ],
        },
        {
          title: t('sidebar.navMain.dailyUpdates'),
          url: '#',
          icon: Calendar,
          items: [
            {
              title: t('sidebar.navMain.allDailyUpdates'),
              url: '/daily-updates',
            },
            {
              title: t('sidebar.navMain.addDailyUpdates'),
              url: '/daily-updates/add',
            },
            {
              title: t('sidebar.navMain.addDailyUpdatesHeader'),
              url: '/daily-updates/add-header',
            },
          ],
        },
        {
          title: t('sidebar.navMain.goodThoughts'),
          url: '#',
          icon: BookAIcon,
          items: [
            {
              title: t('sidebar.navMain.allGoodThoughts'),
              url: '/good-thoughts',
            },
            {
              title: t('sidebar.navMain.addGoodThoughts'),
              url: '/good-thoughts/add',
            },
          ],
        },
        {
          title: t('sidebar.navMain.daySpecials'),
          url: '#',
          icon: BookOpen,
          items: [
            {
              title: t('sidebar.navMain.allDaySpecials'),
              url: '/day-specials',
            },
            {
              title: t('sidebar.navMain.addDaySpecials'),
              url: '/day-specials/add',
            },
          ],
        },
      ],
    }),
    [],
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <BookType className="w-6 h-6" />
              <span className="truncate font-semibold">{t('sidebar.brandName')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
