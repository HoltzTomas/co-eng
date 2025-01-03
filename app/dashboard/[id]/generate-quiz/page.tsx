import Quiz from "@/components/quiz";
import { getFilesByFolderId } from "@/lib/db/queries";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const files = await getFilesByFolderId(id);

  return (
    <main className="flex-1 overflow-auto bg-gray-100">
      <div className="flex container mx-auto p-6 space-y-4 h-full justify-center items-center">
        <Quiz files={files} />
      </div>
    </main>
  )
}
