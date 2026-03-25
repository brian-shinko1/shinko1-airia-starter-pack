"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Quiz", href: "#quiz" },
  { label: "Workshop", href: "#workshop" },
  { label: "AI/Airia", href: "#curriculum" },
  { label: "Gift", href: "#bonus" },
]

interface HeaderProps {
  onRetakeQuiz?: () => void
  onStartOver?: () => void
}

export function Header({ onRetakeQuiz, onStartOver }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1))
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: "-40% 0px -55% 0px" }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img src="/shinko1-logo-final.svg" alt="Shinkō1" className="h-6 w-auto" />
          </div>
          <span className="text-muted-foreground/50">×</span>
          <div className="flex items-center gap-2">
            <img src="/airia-logo.png" alt="Airia" className="h-8 w-auto" />
          </div>
        </div>

        <nav className="hidden items-center justify-center gap-8 md:flex">
          {navItems.map((item) => {
            const id = item.href.slice(1)
            const isActive = activeSection === id
            return (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm tracking-wide transition-colors underline-offset-4 ${
                  isActive
                    ? "text-foreground underline"
                    : "text-muted-foreground hover:text-foreground hover:underline"
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center justify-end gap-3 md:flex">
          {onRetakeQuiz && (
            <button
              onClick={onRetakeQuiz}
              className="text-xs tracking-wide text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Retake Quiz
            </button>
          )}
          {onStartOver && (
            <button
              onClick={onStartOver}
              className="text-xs tracking-wide text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Start Over
            </button>
          )}
          {!onRetakeQuiz && !onStartOver && (
            <Button size="sm" className="tracking-wide">Get Started</Button>
          )}
        </div>

        <button
          className="col-start-3 flex justify-end md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {onRetakeQuiz && (
              <button
                onClick={() => { onRetakeQuiz(); setMobileMenuOpen(false) }}
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Retake Quiz
              </button>
            )}
            {onStartOver && (
              <button
                onClick={() => { onStartOver(); setMobileMenuOpen(false) }}
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Start Over
              </button>
            )}
            {!onRetakeQuiz && !onStartOver && (
              <Button size="sm" className="mt-2 w-full">
                Get Started
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
