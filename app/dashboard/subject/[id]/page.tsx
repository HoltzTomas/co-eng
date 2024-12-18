import { SubjectDashboard } from "./components/SubjectDashboard"
import { FileList } from "@/components/file-list"
import { files } from "@/data/files"

export default function Page({ params }: { params: { id: string } }) {
  return (
        <main className="flex-1 overflow-auto bg-gray-100">
          <div className="container mx-auto p-6 space-y-4">
            <SubjectDashboard subjectId={params.id} />
            <FileList initialFiles={files} />
          </div>
        </main>
  )
}

