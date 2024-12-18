'use client'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import { Message } from "@/components/message"

const messages = [
    {
        role: "assistant",
        content: "This is an example of a message from an assistant",
    },
    {
        role: "user",
        content: "This is an example of a message from a user",
    },
];

export function Chat({ id }: { id: string }) {
    const [input, setInput] = useState<string>("");

    return (
        <Card className="flex flex-col h-[90vh] max-w-[90%] mx-auto p-6 shadow-lg">
            {/* Header */}
            <div className="text-xl font-semibold text-zinc-800 mb-4 border-b pb-2">
                Chat Asistido
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 space-y-6 px-2">
                {messages.map((message, index) => (
                    <Message key={`${id}-${index}`} role={message.role} content={message.content} />
                ))}
            </ScrollArea>

            {/* Input Form */}
            <form
                className="flex items-center gap-4 mt-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (input.trim()) {
                        console.log("Send:", input);
                        setInput("");
                    }
                }}
            >
                <Input
                    placeholder="Send a message..."
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="flex-1"
                />
                <Button type="submit" className="flex items-center gap-2 px-6">
                    Send <Send size={18} />
                </Button>
            </form>
        </Card>
    );
}
