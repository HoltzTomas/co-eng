import { ChatWithFiles } from "@/components/ChatWithFiles";
import { getFilesBySubjectId } from "@/lib/db/queries";
type Params = Promise<{ id: string }>
  
  export default async function Page(props: { params: Params }) {
    const { id } = await props.params;
    const files = await getFilesBySubjectId(id);
  
    return (
      <main className="flex-1 overflow-auto bg-gray-100">
        <div className="container mx-auto p-6 space-y-4 h-full">
          <ChatWithFiles files={files} />
        </div>
      </main>
    );
  }
  