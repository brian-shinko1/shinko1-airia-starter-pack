"use client"

import { useState } from "react"
import { ChevronRight, Play, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WorkshopModule {
  id: number
  title: string
  description: string
  duration: string
  topics: string[]
  videoId?: string
}

const workshopModules: WorkshopModule[] = [
  {
    id: 1,
    title: "Introduction to Domain-Driven Design",
    description: "Understand the core philosophy of DDD — building software that reflects the real-world domain it serves.",
    duration: "2 min",
    topics: [
      "What is a domain?",
      "Ubiquitous language",
      "Strategic vs tactical design",
      "Why DDD matters for AI systems",
    ],
    videoId: 'yHfk1xTxrKc'
  },
  {
    id: 2,
    title: "What is Event Storming?",
    description: "A collaborative workshop technique for rapidly exploring complex business domains using sticky notes and domain events.",
    duration: "2 min",
    topics: [
      "Origin & purpose",
      "Who should be in the room",
      "The sticky note legend",
      "Big Picture vs Process Level",
    ],
    videoId: '02OHFMgg7eI'
  },
  {
    id: 3,
    title: "Running the Event Storm",
    description: "Step-by-step guide to facilitating an Event Storming session from start to finish.",
    duration: "2 min",
    topics: [
      "Domain events (orange)",
      "Commands & actors",
      "Aggregates & policies",
      "Hotspots",
    ],
    videoId: 'SfGPe5uR7IQ'
  },
  {
    id: 4,
    title: "Bounded Contexts & Context Maps",
    description: "Learn how to identify the natural seams in your domain and draw clear boundaries between subsystems.",
    duration: "2 min",
    topics: [
      "Identifying bounded contexts",
      "Context mapping patterns",
      "Upstream / downstream relationships",
      "Anti-corruption layers",
    ],
    videoId:'-5q1Gmjy0aM'
  },
  {
    id: 5,
    title: "From Event Storm to AI Workflows",
    description: "Bridge the gap between your domain model and AI agent design — where DDD meets AI.",
    duration: "2 min",
    topics: [
      "Domain events as AI triggers",
      "Aggregates as agent boundaries",
      "Policy automation with AI",
      "Designing AI-native workflows",
    ],
    videoId:'vvPqjS2x2uk'
  },
]

export function WorkshopCurriculum() {
  const [expandedModule, setExpandedModule] = useState<number | null>(1)

  return (
    <section id="workshop" className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 border border-primary bg-primary/10 px-4 py-2">
            <AlertCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold tracking-wide text-primary uppercase">Must Watch — All Attendees</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Shinkō1 Workshop
          </h2>
          <p className="mt-4 text-muted-foreground">
            This is the core workshop you are preparing for. Watch all modules before the session.
          </p>
        </div>

        <div className="space-y-4">
          {workshopModules.map((module, index) => (
            <Card
              key={module.id}
              className="border-border bg-card transition-all"
            >
              <CardHeader
                className="cursor-pointer"
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription className="mt-1">{module.description}</CardDescription>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {module.duration}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                      expandedModule === module.id ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </CardHeader>

              {expandedModule === module.id && (
                <CardContent className="border-t border-border pt-4">
                  <h4 className="mb-2 text-sm font-semibold text-foreground">Topics Covered</h4>
                  <ul className="mb-4 grid grid-cols-2 gap-2">
                    {module.topics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 shrink-0 bg-primary" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                  {module.videoId ? (
                    <div className="aspect-video w-full overflow-hidden border border-border">
                      <iframe
                        src={`https://www.youtube.com/embed/${module.videoId}`}
                        title={module.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                  ) : (
                    <Button className="gap-2">
                      <Play className="h-4 w-4" />
                      Watch Video
                    </Button>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
