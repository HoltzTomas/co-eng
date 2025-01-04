/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react"
import { File } from "@/lib/db/types";
import { Question, questionsSchema } from "@/lib/schemas/quiz";
import { experimental_useObject } from "ai/react";
import { toast } from "@/hooks/use-toast";
import QuizOptions from "./quiz-options";
import QuizPlayer from "./quiz-player";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { motion } from "framer-motion";

export default function Quiz({ files }: { files: File[] }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [numQuestions, setNumQuestions] = useState(5);
  const { submit, object: partialQuestions, isLoading } = experimental_useObject({
    api: "/api/generate-quiz",
    schema: questionsSchema,
    initialValue: undefined,
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudo generar el quiz. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    },
    onFinish: ({ object }) => {
      if (object && object.length > 0) {
        setQuestions(object);
        console.log(object);
      }
    },
  });

  if (questions.length === 0) {
    const progress = partialQuestions ? (partialQuestions.length / numQuestions) * 100 : 0;

    return (
      <div className="w-full max-w-md mx-auto space-y-4">
        <QuizOptions files={files} onSubmit={(data) => {
          submit(data);
          setNumQuestions(data.numQuestions);
        }} />
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="flex flex-col space-y-2 p-6">
              <div className="w-full space-y-1">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <div className="w-full space-y-2">
                <div className="items-center space-x-2 text-sm">
                  <span className="text-muted-foreground">
                    {partialQuestions
                      ? `Generating question ${partialQuestions.length + 1} of ${numQuestions}`
                      : "Analyzing PDF content"}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    )
  }
  else {
    return (
      <QuizPlayer questions={questions} onReset={() => { setQuestions([]) }} />
    )
  }
}
