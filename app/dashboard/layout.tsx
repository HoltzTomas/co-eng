import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
        <Sidebar />
        {children}
      </div>
    </SidebarProvider>
  )
}
