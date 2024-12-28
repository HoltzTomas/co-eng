'use client'
import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Send } from "lucide-react";
import { Message } from "@/components/Message"
import Typewriter from "./ui/text-animations";

export function Chat({ id }: { id: string }) {
    const { messages, input, handleInputChange, handleSubmit, error, reload, isLoading } = useChat({
        body: { provider: 'gemini' }
    });

    return (
        <Card className="flex flex-col h-[90vh] max-w-[90%] mx-auto p-6 shadow-lg">
            {/* Header */}
            <div className="text-xl font-semibold text-zinc-800 mb-4 border-b pb-2">
                Chat Asistido
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 space-y-6 px-2 pb-5">
                {messages.map((message, index) => (
                    <Message key={`${id}-${index}`} role={message.role}>
                        <Typewriter text={message.content} speed={50} />
                    </Message>
                ))}
                {error && (
                    <>
                        <Message key={`error-message`} role="system">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="inline-block text-red-500" />
                                {error.message}
                                <button className="flex justify-center items-center" onClick={() => {reload()}}>
                                    <RefreshCw size={18} />
                                </button>
                            </div>
                        </Message>
                    </>
                )}
            </ScrollArea>

            {/* Input Form */}
            <form
                className="flex items-center gap-4 mt-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    input.trim()
                    handleSubmit(e);
                }}
            >
                <Input
                    placeholder="Send a message..."
                    value={input}
                    onChange={(event) => handleInputChange(event)}
                    className="flex-1"
                />
                <Button type="submit" className="flex items-center gap-2 px-6">
                    Send <Send size={18} />
                </Button>
            </form>
        </Card>
    );
}
