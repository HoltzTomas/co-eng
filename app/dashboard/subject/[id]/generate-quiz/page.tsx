import Quiz from "@/components/quiz";
import { getFilesBySubjectId } from "@/lib/db/queries";

type Params = Promise<{ id: string }>

export default async function Page(props: { params: Params }) {
    const { id } = await props.params;
    const files = await getFilesBySubjectId(id);

    return (
        <main className="flex-1 overflow-auto bg-gray-100">
            <div className="flex container mx-auto p-6 space-y-4 h-full justify-center items-center">
                <Quiz files={files} subject={id} />
            </div>
        </main>
    )
}
