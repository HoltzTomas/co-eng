import { Chat } from "@/components/chat"

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    return (
        <main className="flex-1 overflow-auto bg-gray-100">
            <div className="container mx-auto p-6 space-y-4 h-full">
                <Chat subjectId={id}/>
            </div>
        </main>
    )
}