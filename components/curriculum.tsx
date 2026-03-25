"use client"

import { useState, useEffect } from "react"
import { Play, Clock, CheckCircle2, Lock, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Module {
  id: number
  title: string
  description: string
  duration: string
  provider: "Shinko1" | "Airia" | "Both"
  topics: string[]
  isUnlocked: boolean
  videoId?: string
}

const modules: Module[] = [
  {
    id: 1,
    title: "Introduction to AI / LLM",
    description: "Understand the fundamentals of artificial intelligence and large language models",
    duration: "2 min",
    provider: "Shinko1",
    topics: ["What are LLMs?", "How AI models learn", "Key terminology", "Real-world applications"],
    isUnlocked: true,
    videoId: "H15l60QAkRM",
  },
  {
    id: 2,
    title: "Airia Overview",
    description: "Get a high-level introduction to the Airia platform and its core capabilities",
    duration: "6 min",
    provider: "Airia",
    topics: ["Platform overview", "Key features", "Use cases", "Getting started"],
    isUnlocked: true,
    videoId: "pCGlOuaw6ow",
  },
  {
    id: 3,
    title: "Agent Builder",
    description: "Learn how to build and configure AI agents in Airia",
    duration: "4 min",
    provider: "Airia",
    topics: ["Creating agents", "Agent configuration", "Prompt design", "Testing agents"],
    isUnlocked: true,
    videoId: "ExxJpHXyH5k",
  },
  {
    id: 4,
    title: "Connect Datasource",
    description: "Connect your AI agents to various data sources effectively",
    duration: "2 min",
    provider: "Airia",
    topics: ["Data connectors", "Vector databases", "RAG fundamentals", "Data preprocessing"],
    isUnlocked: true,
    videoId: "PcOYCnstTxQ",
  },
  {
    id: 5,
    title: "Model Choices",
    description: "Select the right model for your use case and optimize performance",
    duration: "4 min",
    provider: "Airia",
    topics: ["Model comparison", "Cost optimization", "Performance tuning", "Latency considerations"],
    isUnlocked: true,
    videoId: "qr7zgnbdey4",
  },
  {
    id: 6,
    title: "Creating Custom Tools",
    description: "Build custom tools to extend your AI agents with new capabilities",
    duration: "2 min",
    provider: "Airia",
    topics: ["Tool definitions", "API integrations", "Function calling", "Error handling"],
    isUnlocked: true,
    videoId: "y0aD8oHk22E",
  },
  {
    id: 7,
    title: "Airia Security",
    description: "Implement security best practices for AI applications in Airia",
    duration: "4 min",
    provider: "Airia",
    topics: ["Prompt injection", "Data privacy", "Access controls", "Audit logging"],
    isUnlocked: true,
    videoId: "HuL5xlJL970",
  },
  {
    id: 8,
    title: "Activity Feed",
    description: "Monitor and analyze your AI agents' activity and usage",
    duration: "3 min",
    provider: "Airia",
    topics: ["Usage monitoring", "Activity logs", "Analytics", "Troubleshooting"],
    isUnlocked: true,
    videoId: "oWiMGnrJTjw",
  },
]

type UserLevel = "Beginner" | "Explorer" | "Practitioner" | "Expert"

const levelUnlockMap: Record<UserLevel, number> = {
  Beginner: 2,
  Explorer: 4,
  Practitioner: 6,
  Expert: 8,
}

const tierProgression = [
  { threshold: 2, level: "Beginner" as UserLevel },
  { threshold: 4, level: "Explorer" as UserLevel },
  { threshold: 6, level: "Practitioner" as UserLevel },
  { threshold: 8, level: "Expert" as UserLevel },
]

function getEffectiveUnlock(baseMax: number, completedModules: number[]): { max: number; level: UserLevel } {
  let current = baseMax
  // Find the starting tier index
  let tierIndex = tierProgression.findIndex((t) => t.threshold === current)
  if (tierIndex === -1) tierIndex = tierProgression.length - 1

  // Keep promoting while all modules in the current tier are completed
  while (tierIndex < tierProgression.length - 1) {
    const allCompleted = Array.from({ length: current }, (_, i) => i + 1).every((id) =>
      completedModules.includes(id)
    )
    if (!allCompleted) break
    tierIndex++
    current = tierProgression[tierIndex].threshold
  }

  return { max: current, level: tierProgression[tierIndex].level }
}

function ProviderBadge({ provider }: { provider: Module["provider"] }) {
  if (provider === "Both") {
    return (
      <div className="flex gap-1">
        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
          Shinkō1
        </span>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
          Airia
        </span>
      </div>
    )
  }
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        provider === "Shinko1"
          ? "bg-primary/20 text-primary"
          : "bg-secondary text-secondary-foreground"
      }`}
    >
      {provider === "Shinko1" ? "Shinkō1" : provider}
    </span>
  )
}

interface CurriculumProps {
  userLevel?: UserLevel
  onAllComplete?: () => void
}

const COMPLETED_KEY = "shinko1-airia-completed-modules"

function loadCompleted(): number[] {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCompleted(ids: number[]) {
  try {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(ids))
  } catch {}
}

export function Curriculum({ userLevel, onAllComplete }: CurriculumProps) {
  const [expandedModule, setExpandedModule] = useState<number | null>(1)
  const [completedModules, setCompletedModules] = useState<number[]>([])

  useEffect(() => {
    setCompletedModules(loadCompleted())
  }, [])

  const baseMax = userLevel ? levelUnlockMap[userLevel] : modules.length
  const { max: maxUnlocked, level: effectiveLevel } = getEffectiveUnlock(baseMax, completedModules)

  const toggleModule = (id: number) => {
    setExpandedModule(expandedModule === id ? null : id)
  }

  const markComplete = (id: number) => {
    if (!completedModules.includes(id)) {
      const updated = [...completedModules, id]
      setCompletedModules(updated)
      saveCompleted(updated)
      if (updated.length >= maxUnlocked) {
        onAllComplete?.()
      }
    }
  }

  const progress = (completedModules.length / maxUnlocked) * 100

  return (
    <section id="curriculum" className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 border border-border bg-secondary px-4 py-2">
            <span className="text-sm font-semibold tracking-wide text-secondary-foreground uppercase">Pre Workshop</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            AI / Airia Curriculum
          </h2>
          <p className="mt-4 text-muted-foreground">
            Good to watch before the workshop — the more familiar you are, the more you'll get out of it
          </p>
        </div>

        {userLevel && (
          <div className="mb-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary">
                {effectiveLevel} Level
              </span>
              <span className="text-sm text-muted-foreground">
                {maxUnlocked} of {modules.length} modules unlocked
              </span>
            </div>
            {effectiveLevel !== userLevel && (
              <span className="text-xs text-primary">
                Leveled up from {userLevel} by completing all modules!
              </span>
            )}
          </div>
        )}

        <Card className="mb-8 border-border bg-card">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Your Progress</p>
              <p className="text-2xl font-bold text-foreground">
                {completedModules.length} of {maxUnlocked} completed
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-secondary"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-primary"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${progress}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {modules.map((module, index) => {
            const isUnlocked = module.id <= maxUnlocked

            return (
            <Card
              key={module.id}
              className={`border-border transition-all ${
                !isUnlocked
                  ? "opacity-60"
                  : completedModules.includes(module.id)
                    ? "bg-primary/5"
                    : "bg-card"
              }`}
            >
              <CardHeader
                className={isUnlocked ? "cursor-pointer" : "cursor-default"}
                onClick={() => isUnlocked && toggleModule(module.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        completedModules.includes(module.id)
                          ? "bg-primary text-primary-foreground"
                          : isUnlocked
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {completedModules.includes(module.id) ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : isUnlocked ? (
                        <span className="font-semibold">{index + 1}</span>
                      ) : (
                        <Lock className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {isUnlocked
                          ? module.description
                          : "Complete all current modules to unlock this one"}
                      </CardDescription>
                      <div className="mt-2 flex items-center gap-3">
                        <ProviderBadge provider={module.provider} />
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {module.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isUnlocked && (
                  <ChevronRight
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      expandedModule === module.id ? "rotate-90" : ""
                    }`}
                  />
                  )}
                </div>
              </CardHeader>

              {expandedModule === module.id && isUnlocked && (
                <CardContent className="border-t border-border pt-4">
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold text-foreground">Topics Covered</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {module.topics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {module.videoId ? (
                    <div className="space-y-3">
                      <div className="aspect-video w-full overflow-hidden border border-border">
                        <iframe
                          src={`https://www.youtube.com/embed/${module.videoId}`}
                          title={module.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full"
                        />
                      </div>
                      {!completedModules.includes(module.id) && (
                        <Button variant="outline" onClick={() => markComplete(module.id)}>
                          Mark as Complete
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Button className="gap-2">
                        <Play className="h-4 w-4" />
                        Watch Video
                      </Button>
                      {!completedModules.includes(module.id) && (
                        <Button variant="outline" onClick={() => markComplete(module.id)}>
                          Mark as Complete
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
