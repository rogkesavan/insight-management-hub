import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-[#1A1F2C] flex">
        <AppSidebar />
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};