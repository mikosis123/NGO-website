
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar, AdminHeader } from '@/components/admin/sidebar-nav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div className="flex flex-col">
          <AdminHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary/30 pt-24 md:pt-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
