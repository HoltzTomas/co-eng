"use client";

import { FileSelectionModal } from "./file-selection-modal"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { File } from "@/lib/db/types";
import { Upload } from "lucide-react";

export default function QuizOptions({ files, onSubmit }: { files: File[], onSubmit: (data: { filesid: string[], numQuestions: number }) => void }) {
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [numQuestions, setNumQuestions] = useState(5);

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-700 dark:text-gray-300">Create Your Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (files.length === 0) return;
              onSubmit({ filesid: selectedFiles.map(file => file.id!), numQuestions });
            }}
          >
            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed border-2 hover:border-solid transition-all duration-200"
              onClick={() => setIsFileModalOpen(true)}
            >
              <Upload className="mr-2 h-4 w-4" />
              {selectedFiles.length === 0 ? "Select Files" : `${selectedFiles.length} File/s Selected`}
            </Button>
            <Label htmlFor="num-questions" className="block text-center mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Number of Questions</Label>
            <Input
              id="num-questions"
              name="numQuestions"
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              min={1}
              max={20}
              className="text-center"
            />
            <Button
              type="submit"
              disabled={selectedFiles.length === 0}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
            >
              Generate Quiz
            </Button>
          </form>
        </CardContent>
      </Card>
      <FileSelectionModal
        isOpen={isFileModalOpen}
        onClose={() => setIsFileModalOpen(false)}
        onFilesSelect={setSelectedFiles}
        files={files}
      />
    </>
  )
}
