import { PDFViewer } from "@/components/PDFViewer";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PDFViewerProvider } from "@/contexts/PDFViewerContext";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <PDFViewerProvider>
        <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
          <Sidebar />
          {children}
        </div>
        <PDFViewer />
      </PDFViewerProvider>
    </SidebarProvider>
  )
}
