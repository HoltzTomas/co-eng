export function Message({ role, content }: { role: string, content: string }) {
    return (role === "assistant" || role === "user") && (
        <div
            className={`flex ${role === "user" ? "justify-end" : "justify-start"
                }`}
        >
            <div
                className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    } shadow-md`}
            >
                {content}
            </div>
        </div>
    );
}