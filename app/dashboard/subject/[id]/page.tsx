import { redirect } from "next/navigation";

import { DashboardOptions } from "@/components/dashboard-options"
import { FileList } from "@/components/file-list"
import { UploadButton } from "@/components/upload-button";

import { getSubjectWithFiles } from "@/lib/db/queries"

type Params = Promise<{ id: string }>

export default async function Page({ params }: { params: Params}) {
  const { id } = await params;

  const subject = await getSubjectWithFiles(id);
  if (!subject) redirect("/dashboard");

  return (
    <main className="flex-1 overflow-auto bg-gray-100">
      <div className="container mx-auto p-6 space-y-4">
        <DashboardOptions subject={subject} />
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Material teorico</h2>
            <UploadButton subjectId={id} />
          </div>
          <FileList files={subject.files} />
        </div>
      </div>
    </main>
  )
}

