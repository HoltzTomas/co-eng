import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { DashboardOptions } from "@/components/dashboard-options"
import { FolderContentList } from "@/components/FolderContentList"
import { NewItemButton } from "@/components/NewItemButton";

import { getFolderWithContent } from "@/lib/db/queries"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const folder = await getFolderWithContent(id);
  if (!folder) redirect("/dashboard");


  return (
    <main className="flex-1 overflow-auto bg-gray-100">
      <div className="container mx-auto p-6 space-y-4">
        <DashboardOptions folder={folder} />
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Link href={`/dashboard/${folder.parentId ? folder.parentId : ""}`}>
              <ChevronLeft className="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors duration-300" />
            </Link>
            <h2 className="text-lg font-semibold">Material teorico</h2>
            <NewItemButton folderId={id} />
          </div>
          <FolderContentList folders={folder.subfolders} files={folder.files} />
        </div>
      </div>
    </main>
  )
}

