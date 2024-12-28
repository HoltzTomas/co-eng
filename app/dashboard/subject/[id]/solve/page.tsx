import { Chat } from "@/components/Chat";

export default function Page() {
    return (
        <main className="flex-1 overflow-auto bg-gray-100">
          <div className="container mx-auto p-6">
            <Chat id="id-example" />
          </div>
        </main>
    );
}