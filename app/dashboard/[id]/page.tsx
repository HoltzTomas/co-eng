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
            <h2 className="text-lg font-semibold">Material teorico</h2>
            <NewItemButton folderId={id} />
          </div>
          <FolderContentList folders={folder.subfolders} files={folder.files} />
        </div>
      </div>
    </main>
  )
}

