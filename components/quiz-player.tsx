'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Question } from '@/lib/schemas/quiz'
import { ScrollArea } from './ui/scroll-area'

export interface QuizState {
    currentQuestionIndex: number;
    userAnswers: (number | null)[];
    showResults: boolean;
  }

export default function QuizPlayer({ questions, onReset }: { questions: Question[], onReset: () => void }) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    userAnswers: new Array(questions.length).fill(null),
    showResults: false
  })

  const currentQuestion = questions[quizState.currentQuestionIndex]

  const handleAnswerSelect = (selectedIndex: number) => {
    setQuizState((prevState: QuizState) => ({
      ...prevState,
      userAnswers: prevState.userAnswers.map((ans, index) => 
        index === prevState.currentQuestionIndex ? selectedIndex : ans
      )
    }))
  }

  const handleNext = () => {
    if (quizState.currentQuestionIndex < questions.length - 1) {
      setQuizState(prevState => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1
      }))
    } else {
      setQuizState(prevState => ({ ...prevState, showResults: true }))
    }
  }

  const handlePrevious = () => {
    setQuizState(prevState => ({
      ...prevState,
      currentQuestionIndex: Math.max(0, prevState.currentQuestionIndex - 1),
      showResults: false
    }))
  }

  const handleRestart = () => {
    setQuizState({
      currentQuestionIndex: 0,
      userAnswers: new Array(questions.length).fill(null),
      showResults: false
    })
  }

  const calculateScore = () => {
    return quizState.userAnswers.reduce((score, answer, index) => {
        return score! + (answer === questions[index].answer ? 1 : 0)
    }, 0)
  }

  if (quizState.showResults) {
    const score = calculateScore();
    if (score === null || Number.isNaN(score)) handleRestart();
    const totalQuestions = questions.length
    const percentage = (score! / totalQuestions) * 100

    return (
      <Card className="w-full max-w-xl mx-auto overflow-hidden my-8">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="text-center text-3xl font-bold">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="text-center mb-4"
          >
            <div className="text-4xl font-bold mb-1">{score}/{totalQuestions}</div>
            <div className="text-xl text-gray-600 dark:text-gray-400">
              You scored {percentage.toFixed(0)}%
            </div>
          </motion.div>
          <ScrollArea className="h-[250px] rounded-md border p-4">
            <div className="space-y-4">
                {questions.map((question, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
                >
                    <h3 className="font-medium mb-2">{question.question}</h3>
                    <div className="flex items-center">
                    {quizState.userAnswers[index] === question.answer ? (
                        <CheckCircle className="text-green-500 mr-2 w-5" />
                    ) : (
                        <XCircle className="text-red-500 mr-2 w-5" />
                    )}
                    <p>
                        Your answer: {question.options[quizState.userAnswers[index] ?? -1] || "Not answered"}
                    </p>
                    </div>
                    {quizState.userAnswers[index] !== question.answer && (
                    <p className="text-green-600 dark:text-green-400 mt-1">
                        Correct answer: {question.options[question.answer]}
                    </p>
                    )}
                </motion.div>
                ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={handleRestart} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            Restart Quiz
          </Button>
          <Button onClick={onReset} className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white">
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate Another Quiz
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Question {quizState.currentQuestionIndex + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">{currentQuestion.question}</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={quizState.currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                className={`w-full p-4 text-left rounded-lg transition-colors duration-200 ${
                  quizState.userAnswers[quizState.currentQuestionIndex] === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleAnswerSelect(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={quizState.currentQuestionIndex === 0}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={handleNext}>
          {quizState.currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}