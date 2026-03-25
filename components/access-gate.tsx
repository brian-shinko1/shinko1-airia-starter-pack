"use client"

import { useState } from "react"
import { KeyRound, ArrowRight, AlertCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const VALID_KEY = "SHINKO1AIRIA"

interface AccessGateProps {
  onSuccess: () => void
}

export function AccessGate({ onSuccess }: AccessGateProps) {
  const [key, setKey] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (key.trim().toUpperCase() === VALID_KEY) {
      setError(false)
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" style={{ animation: 'float 12s ease-in-out infinite' }} />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" style={{ animation: 'float 16s ease-in-out infinite reverse' }} />
      </div>

      <div className="mx-auto w-full max-w-md px-6">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Day 0 Program</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Shinkō1 x Airia{" "}
            <span className="text-primary">Starter Pack</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Enter your access key to begin
          </p>
        </div>

        <Card className="border-border bg-card">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <KeyRound className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-xl">Access Key Required</CardTitle>
            <CardDescription>
              Enter the key provided to you to unlock the program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter your access key"
                  value={key}
                  onChange={(e) => {
                    setKey(e.target.value)
                    if (error) setError(false)
                  }}
                  className={error ? "border-destructive" : ""}
                  autoFocus
                />
                {error && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>Invalid access key. Please try again.</span>
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full gap-2" disabled={!key.trim()}>
                Unlock Program
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
