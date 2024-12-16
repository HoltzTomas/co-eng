import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const subjects = [
  { id: "1", name: "Matemáticas" },
  { id: "2", name: "Física" },
  { id: "3", name: "Química" },
  { id: "4", name: "Literatura" },
  { id: "5", name: "Historia" },
]

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <Sidebar subjects={subjects}/>
        {children}
      </div>
    </SidebarProvider>
    )
}