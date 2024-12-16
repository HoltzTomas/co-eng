import { SubjectDashboard } from "./components/SubjectDashboard"

export default function Page({ params }: { params: { id: string } }) {
  return (
        <main className="flex-1 overflow-auto bg-gray-100">
          <div className="container mx-auto p-6">
            <SubjectDashboard subjectId={params.id} />
          </div>
        </main>
  )
}

