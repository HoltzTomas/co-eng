
export function Message({ role, children }: { role: string, children: React.ReactNode }) {
    return (
        <div
            className={`flex ${role === "user" ? "justify-end" : "justify-start"
                }`}
        >
            <div
                className={`max-w-[75%] px-4 py-2 rounded-lg mb-2 text-sm ${role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    } shadow-md`}
            >
                {children}
            </div>
        </div>
    );
}