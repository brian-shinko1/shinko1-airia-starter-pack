"use client"

import { useState } from "react"
import { CheckCircle2, Circle, ArrowRight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  scores: number[]
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How would you describe your understanding of Large Language Models (LLMs)?",
    options: [
      "I've never heard of LLMs before",
      "I know they exist but don't understand how they work",
      "I understand the basics and have used ChatGPT or similar tools",
      "I have a solid understanding and have built applications with LLMs",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: 2,
    question: "Have you worked with AI agents or autonomous systems?",
    options: [
      "No, I'm not sure what AI agents are",
      "I've heard about them but never used one",
      "I've experimented with simple agent workflows",
      "I've built or deployed production AI agents",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: 3,
    question: "How familiar are you with prompt engineering?",
    options: [
      "I don't know what prompt engineering means",
      "I understand it's about crafting inputs for AI",
      "I've written prompts and understand best practices",
      "I'm proficient and use advanced techniques like few-shot learning",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: 4,
    question: "What's your experience with AI tools and APIs?",
    options: [
      "I've never used AI tools programmatically",
      "I've used no-code AI tools only",
      "I've integrated AI APIs into applications",
      "I've built custom AI solutions with multiple tools",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: 5,
    question: "How would you rate your knowledge of AI security and ethics?",
    options: [
      "I haven't thought about AI security",
      "I'm aware there are concerns but don't know details",
      "I understand basic security considerations",
      "I'm well-versed in AI safety, security, and ethical frameworks",
    ],
    scores: [0, 1, 2, 3],
  },
]

function getResultMessage(score: number): { level: string; message: string; recommendation: string } {
  if (score <= 3) {
    return {
      level: "Beginner",
      message: "You're just starting your AI journey!",
      recommendation:
        "Focus on the introductory videos about AI/LLM fundamentals. The workshop will help you build a strong foundation.",
    }
  }
  if (score <= 7) {
    return {
      level: "Explorer",
      message: "You have some AI knowledge to build upon!",
      recommendation:
        "Review all demo videos with attention to Tools, MCP, and Datasources. You'll benefit from hands-on practice.",
    }
  }
  if (score <= 11) {
    return {
      level: "Practitioner",
      message: "You have solid AI experience!",
      recommendation:
        "Focus on Model Optimization and Security sections. The workshop will help you refine your skills.",
    }
  }
  return {
    level: "Expert",
    message: "You're an AI power user!",
    recommendation:
      "Use the workshop to explore advanced configurations and help others. Consider leading discussions.",
  }
}

interface QuizProps {
  onComplete?: (level: string, score: number) => void
}

export function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(quizQuestions.length).fill(null)
  )
  const [showResults, setShowResults] = useState(false)

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const currentQ = quizQuestions[currentQuestion]

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = optionIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(Array(quizQuestions.length).fill(null))
    setShowResults(false)
  }

  const calculateScore = () => {
    return selectedAnswers.reduce((total, answerIndex, questionIndex) => {
      if (answerIndex !== null) {
        return total + quizQuestions[questionIndex].scores[answerIndex]
      }
      return total
    }, 0)
  }

  const score = calculateScore()
  const result = getResultMessage(score)

  return (
    <section id="quiz" className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How Familiar Are You with AI & Agents?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Take this quick assessment to identify your current knowledge level
          </p>
        </div>

        {!showResults ? (
          <Card className="border-border bg-card min-h-[480px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription>
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </CardDescription>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <CardTitle className="text-xl leading-relaxed">{currentQ.question}</CardTitle>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-all ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-primary bg-primary/10"
                        : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50"
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                    )}
                    <span className="text-sm text-foreground">{option}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === null}
                  className="gap-2"
                >
                  {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border bg-card">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <span className="text-3xl font-bold text-primary">{score}</span>
              </div>
              <CardTitle className="text-2xl">{result.level}</CardTitle>
              <CardDescription className="text-base">{result.message}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <h4 className="mb-2 font-semibold text-foreground">Our Recommendation</h4>
                <p className="text-sm text-muted-foreground">{result.recommendation}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Your Answers</h4>
                {quizQuestions.map((q, index) => (
                  <div key={q.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Q{index + 1}</span>
                    <span className="text-foreground">
                      {selectedAnswers[index] !== null
                        ? q.options[selectedAnswers[index]].slice(0, 40) + "..."
                        : "Not answered"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {onComplete && (
                  <Button
                    onClick={() => onComplete(result.level, score)}
                    className="w-full gap-2"
                  >
                    Continue to Content
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
                <Button onClick={handleRestart} variant="outline" className="w-full gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
