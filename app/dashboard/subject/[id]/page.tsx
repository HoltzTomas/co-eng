import { getFilesBySubjectId, getSubjectById } from "@/lib/db/queries"
import { DashboardOptions } from "@/components/dashboard-options"
import { FileList } from "@/components/file-list"
import { UploadButton } from "@/components/upload-button";
import { redirect } from "next/navigation";
import { currentUser } from '@clerk/nextjs/server'

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params
  const user = await currentUser()

  const subject = await getSubjectById(Number(id));
  if (!subject) redirect("/dashboard");

  const initialFiles = await getFilesBySubjectId(subject.id);

  return (
    <main className="flex-1 overflow-auto bg-gray-100">
      <div className="container mx-auto p-6 space-y-4">
        <DashboardOptions subject={subject} />
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Mis archivos</h2>
            <UploadButton subjectId={id} userEmail={user?.emailAddresses[0].emailAddress ?? ""} />
          </div>
          <FileList initialFiles={initialFiles} />
        </div>
      </div>
    </main>
  )
}

