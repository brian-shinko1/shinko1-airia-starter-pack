"use client"

import { Gift, Cpu, Bot, ArrowRight, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const agents = [
  {
    id: 1,
    name: "LLM Model Recommendation Agent",
    provider: "Shinko1",
    description:
      "Get personalized recommendations for the best AI model based on your specific use case, budget, and performance requirements.",
    features: [
      "Analyzes your requirements",
      "Compares 100+ models",
      "Cost-benefit analysis",
      "Performance benchmarks",
      "Integration guidance",
    ],
    icon: Cpu,
    href: "https://prodaus.airia.ai/catalog?assistantId=39d57d9a-738a-4b94-8493-87827ac5ae70",
  },
  {
    id: 2,
    name: "Company Use Case Discovery Agent",
    provider: "Airia",
    description:
      "Enter your company URL and uncover the highest-impact AI opportunities tailored to your business.",
    features: [
      "Analyses your company website",
      "Identifies top AI use cases",
      "Industry-specific insights",
      "Follow-up Q&A chat",
      "Powered by Airia",
    ],
    icon: Bot,
    href: "https://prodaus.airia.ai/catalog?assistantId=250b8d45-ed51-47c0-8ff9-a3105a0b84b1",
  },
]

export function BonusAgents() {
  return (
    <section id="bonus" className="bg-secondary/20 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2">
            <Gift className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Exclusive Bonus</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Your Gift: 2 Starter Agents
          </h2>
          <p className="mt-4 text-muted-foreground">
            Complete the program and receive these powerful AI agents to kickstart your journey
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {agents.map((agent) => {
            const Icon = agent.icon
            return (
              <Card
                key={agent.id}
                className="relative overflow-hidden border-border bg-card transition-all hover:border-primary/50"
              >
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/5 blur-2xl" />
                <CardHeader>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        agent.provider === "Shinko1"
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {agent.provider}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{agent.name}</CardTitle>
                  <CardDescription className="text-sm">{agent.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 space-y-2">
                    {agent.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full gap-2" variant="outline" asChild>
                    <a href={agent.href ?? "#"} target="_blank" rel="noopener noreferrer">
                      Preview Agent
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground">Ready to Get Started?</h3>
          <p className="mt-2 text-muted-foreground">
            Complete the quiz, explore use cases, and watch the demo videos to unlock your agents.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2">
              Begin Day 0 Program
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
