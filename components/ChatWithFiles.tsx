'use client'
import { useChat } from "ai/react";
import { useState } from "react"
import { AlertTriangle, FileUp, RefreshCw, Send } from "lucide-react";

import { File } from "@/lib/db/types";
import { FileSelectionModal } from "@/components/file-selection-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Message } from "@/components/Message"
import { Badge } from "@/components/ui/badge";
import Typewriter from "@/components/ui/text-animations";

export function ChatWithFiles({ files }: { files: File[] }) {
  const { messages, input, handleInputChange, handleSubmit, error, reload, isLoading } = useChat({
    body: { provider: 'gemini' }
  });
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  return (
    <>
    <Card className="flex flex-col h-[90vh] max-w-[90%] mx-auto p-6 shadow-lg">
      {/* Header */}
      <CardHeader className="border-b px-6 py-4">
        <CardTitle className="text-xl text-primary">Chat de Asistencia</CardTitle>
      </CardHeader>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 space-y-6 px-2 pb-5">
        {messages.map((message, index) => (
          <Message key={index} role={message.role}>
            {message.role === "assistant" ? (
              <Typewriter text={message.content} />
            ) : (
              message.content
            )}
          </Message>
        ))}
        {error && (
          <Message key={`error-message`} role="system">
            <div className="flex items-center gap-2">
              <AlertTriangle className="inline-block text-red-500" />
              {error.message}
              <button className="flex justify-center items-center" onClick={() => { reload() }}>
                <RefreshCw size={18} />
              </button>
            </div>
          </Message>
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
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setIsFileModalOpen(true)}
            className="shrink-0"
          >
            <FileUp className="h-4 w-4" />
            <span className="sr-only">Seleccionar archivos</span>
          </Button>
          {selectedFiles.length > 0 && (
            <Badge
              variant="secondary"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {selectedFiles.length}
            </Badge>
          )}
        </div>
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
    <FileSelectionModal 
        isOpen={isFileModalOpen}
        onClose={() => setIsFileModalOpen(false)}
        onFilesSelect={setSelectedFiles}
        files={files}
      />
  </>
  );
}

