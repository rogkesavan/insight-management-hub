import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, Smartphone, Apps, Activity, CreditCard } from 'lucide-react';

const navigation = [
  { name: 'Overview', icon: LayoutDashboard, href: '/' },
  { name: 'Users', icon: Users, href: '/users' },
  { name: 'Devices', icon: Smartphone, href: '/devices' },
  { name: 'Applications', icon: Apps, href: '/applications' },
  { name: 'Activity', icon: Activity, href: '/activity' },
  { name: 'Payouts', icon: CreditCard, href: '/payouts' },
];

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#1A1F2C]">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <div className="px-3 py-4">
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <a href={item.href} className="flex items-center gap-2 text-gray-300 hover:text-white">
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};