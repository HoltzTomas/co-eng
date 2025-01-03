import { Folder, Home, Plus, MoreVertical, Trash } from "lucide-react"
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { SignOutButton } from "@clerk/nextjs"
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

import { getRootFolders } from "@/lib/db/queries"
import { createFolderAction, deleteFolderAction } from "@/actions/foldersActions"


export async function Sidebar() {
  const user = await currentUser()
  const userId: string = user!.id;
  const folders = await getRootFolders(userId);

  return (
    <ShadcnSidebar className="w-64 border-r border-gray-200">
      <SidebarHeader className="p-4 border-b flex flex-row">
        <Home className="mr-2 h-4 w-4" />
        <span>Notes Studio</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-sm font-semibold text-gray-600">
            Mis Carpetas
          </SidebarGroupLabel>
          <form className="flex items-center px-4 py-2" action={async (formData) => {
            "use server"
            const name: string = formData.get("name")?.toString().trim() || "";
            if (!name) return;
            await createFolderAction(name);
          }}>
            <input
              type="text"
              name="name"
              placeholder="Nueva Carpeta"
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
              {folders.map((folder) => (
                <SidebarMenuItem key={folder.id}>
                  <Link href={`/dashboard/${folder.id}`} passHref className="w-full">
                    <SidebarMenuButton className="flex items-center w-full text-sm hover:bg-gray-100">
                      <Folder className="mr-2 h-4 w-4" />
                      <span>{folder.name}</span>
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
                        <form action={async () => {
                          "use server"
                          await deleteFolderAction(folder.id)
                        }}>
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

