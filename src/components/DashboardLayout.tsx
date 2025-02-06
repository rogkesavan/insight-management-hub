import React from 'react';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-[#1A1F2C]">
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
};