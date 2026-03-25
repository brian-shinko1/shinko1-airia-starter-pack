import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

type UserLevel = "Beginner" | "Explorer" | "Practitioner" | "Expert"

const levelVideoCount: Record<UserLevel, number> = {
  Beginner: 2,
  Explorer: 4,
  Practitioner: 6,
  Expert: 7,
}

interface HeroProps {
  userLevel?: UserLevel
}

export function Hero({ userLevel }: HeroProps) {
  const videoCount = userLevel ? levelVideoCount[userLevel] : 7

  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" style={{ animation: 'float 12s ease-in-out infinite' }} />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" style={{ animation: 'float 16s ease-in-out infinite reverse' }} />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Day 0 Program</span>
          </div>

          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Shinkō1 x Airia{" "}
            <span className="text-primary">Starter Pack</span>
          </h1>

          {userLevel ? (
            <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
              Welcome back, <span className="font-semibold text-primary">{userLevel}</span>!
              You have {videoCount} demo videos unlocked based on your assessment.
            </p>
          ) : (
            <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
              A private preparation program designed to get you ready for the workshop.
              Learn about AI, Agents, and discover your potential use cases.
            </p>
          )}

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2">
              Start Your Journey
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#curriculum">View Curriculum</a>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-4">
              <span className="text-3xl font-bold text-primary">{videoCount}</span>
              <span className="text-sm text-muted-foreground">
                {userLevel ? "Unlocked Videos" : "Demo Videos"}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-4">
              <span className="text-3xl font-bold text-primary">2</span>
              <span className="text-sm text-muted-foreground">Bonus Agents</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-4">
              <span className="text-3xl font-bold text-primary">1</span>
              <span className="text-sm text-muted-foreground">AI Chatbot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
