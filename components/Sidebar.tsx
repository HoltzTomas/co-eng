import { Book, Home, Plus, MoreVertical, Trash } from "lucide-react"
import Link from 'next/link'
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "@/components/ui/dropdown-menu"

import { createSubject, deleteSubject, getSubjects } from "@/lib/db/queries"
import { revalidatePath } from "next/cache"
import { currentUser } from '@clerk/nextjs/server'
import { SignOutButton } from "@clerk/nextjs"


export async function Sidebar() {
  const user = await currentUser()
  const userEmail: string = user!.emailAddresses[0].emailAddress!;
  const subjects = await getSubjects(userEmail);

  const handleAddSubject = async (formData: FormData) => {
    "use server"
    const subject: string = formData.get("subject")?.toString().trim() || "";
    if (!subject) return;
    await createSubject({name: subject, createdBy: userEmail})
    revalidatePath("/dashboard");
  }

  const handleDeleteSubject = async (subjectId: number) => {
    "use server"
    await deleteSubject(subjectId);
    revalidatePath("/dashboard");
  }

  return (
    <ShadcnSidebar className="w-64 border-r border-gray-200">
      <SidebarHeader className="p-4 border-b">
        <Link href="/dashboard" passHref>
          <SidebarMenuButton className="flex items-center w-full text-sm hover:bg-gray-100">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard Principal</span>
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-sm font-semibold text-gray-600">
            Mis Materias
          </SidebarGroupLabel>
          <form className="flex items-center px-4 py-2" action={handleAddSubject}>
            <input
              type="text"
              name="subject"
              placeholder="Nueva Materia"
              className="flex-1 text-sm border rounded-md px-2 py-1 mr-2"
              required
            />
            <button
              className="text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md p-2"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>
          <SidebarGroupContent>
            <SidebarMenu>
              {subjects.map((subject) => (
                <SidebarMenuItem key={subject.id}>
                  <Link href={`/dashboard/subject/${subject.id}`} passHref className="w-full">
                    <SidebarMenuButton className="flex items-center w-full text-sm hover:bg-gray-100">
                      <Book className="mr-2 h-4 w-4" />
                      <span>{subject.name}</span>
                    </SidebarMenuButton>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction>
                        <MoreVertical className="h-4 w-4" />
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <form action={handleDeleteSubject.bind(null, subject.id)}>
                          <button className="flex w-full items-center text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </button>
                        </form>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> 
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-4">
        <SignOutButton>Cerrar sesión</SignOutButton>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}

