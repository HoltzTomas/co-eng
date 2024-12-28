import { ChatWithFiles } from "@/components/ChatWithFiles";
import { getFilesBySubjectId } from "@/lib/db/queries";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const files = await getFilesBySubjectId(Number(id));
    return (
        <main className="flex-1 overflow-auto bg-gray-100">
            <div className="container mx-auto p-6 space-y-4 h-full">
                <ChatWithFiles files={files}/>
            </div>
        </main>
    )
}