'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { AppWindow, Home, Inbox, Settings, Users } from 'lucide-react';
import Link from 'next/link';

const items = [
  { title: 'Home', href: '/', icon: Home },
  { title: 'Inbox', href: '/inbox', icon: Inbox },
  { title: 'Users', href: '/users', icon: Users },
  { title: 'Settings', href: '/settings', icon: Settings },
  { title: 'Add App', href: '/add-app', icon: AppWindow },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
