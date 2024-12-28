import { getFilesBySubjectId, getSubjectById } from "@/lib/db/queries"
import { DashboardOptions } from "@/components/dashboard-options"
import { FileList } from "@/components/file-list"
import { auth } from "@/lib/auth";
import { UploadButton } from "@/components/upload-button";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params

  const session = await auth();
  if (!session || !session.user || !session.user.email)  redirect("/login");

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
            <UploadButton subjectId={id} userEmail={session.user.email} />
          </div>
          <FileList initialFiles={initialFiles} />
        </div>
      </div>
    </main>
  )
}

