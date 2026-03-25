"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Quiz } from "@/components/quiz"
import { Curriculum } from "@/components/curriculum"
import { WorkshopCurriculum } from "@/components/workshop-curriculum"
import { BonusAgents } from "@/components/bonus-agents"
import { Footer } from "@/components/footer"
import { AccessGate } from "@/components/access-gate"

function WorkshopReadyBanner() {
  return (
    <div className="border-y border-primary bg-primary px-6 py-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70 mb-2">Pre-Workshop Complete</p>
      <h3 className="text-2xl font-bold tracking-tight text-primary-foreground md:text-3xl">
        You're Ready for the Workshop!
      </h3>
      <p className="mt-2 text-primary-foreground/80">
        All pre-workshop content completed. See you at the Shinkō1 Workshop.
      </p>
    </div>
  )
}

type Step = "gate" | "quiz" | "content"
type UserLevel = "Beginner" | "Explorer" | "Practitioner" | "Expert"

const STORAGE_KEY = "shinko1-airia-state"

function loadPersistedState(): { step: Step; userLevel: UserLevel | null } {
  if (typeof window === "undefined") return { step: "gate", userLevel: null }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.step && (parsed.step === "gate" || parsed.step === "quiz" || parsed.step === "content")) {
        return { step: parsed.step, userLevel: parsed.userLevel ?? null }
      }
    }
  } catch {
    // ignore
  }
  return { step: "gate", userLevel: null }
}

function persistState(step: Step, userLevel: UserLevel | null) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, userLevel }))
  } catch {
    // ignore
  }
}

export default function Home() {
  const [step, setStep] = useState<Step>("gate")
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [workshopReady, setWorkshopReady] = useState(false)

  useEffect(() => {
    const persisted = loadPersistedState()
    setStep(persisted.step)
    setUserLevel(persisted.userLevel)
    setHydrated(true)
  }, [])

  const handleGateSuccess = () => {
    setStep("quiz")
    persistState("quiz", null)
  }

  const handleQuizComplete = (level: string, _score: number) => {
    const userLvl = level as UserLevel
    setStep("content")
    setUserLevel(userLvl)
    persistState("content", userLvl)
  }

  useEffect(() => {
    if (step === "content") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "instant" })
        })
      })
    }
  }, [step])

  const handleRetakeQuiz = () => {
    setStep("quiz")
    setUserLevel(null)
    persistState("quiz", null)
    localStorage.removeItem("shinko1-airia-completed-modules")
  }

  const handleStartOver = () => {
    setStep("gate")
    setUserLevel(null)
    persistState("gate", null)
  }

  // Avoid hydration mismatch — render nothing until client state is loaded
  if (!hydrated) {
    return <main className="min-h-screen bg-background" />
  }

  if (step === "gate") {
    return (
      <main className="min-h-screen bg-background">
        <AccessGate onSuccess={handleGateSuccess} />
      </main>
    )
  }

  if (step === "quiz") {
    return (
      <main className="min-h-screen bg-background">
        <Header onStartOver={handleStartOver} />
        <Quiz onComplete={handleQuizComplete} />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header onRetakeQuiz={handleRetakeQuiz} onStartOver={handleStartOver} />
      <Hero userLevel={userLevel ?? undefined} />
      <WorkshopCurriculum />
<Curriculum userLevel={userLevel ?? undefined} onAllComplete={() => setWorkshopReady(true)} />
      {workshopReady && <WorkshopReadyBanner />}
      <BonusAgents />
      <Footer />
    </main>
  )
}
