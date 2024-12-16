"use client"

import { Book, Home } from 'lucide-react'
import Link from 'next/link'
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type Subject = {
  id: string,
  name: string
}


export function Sidebar({ subjects }: {subjects: Subject[]}) {
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
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  )
}

