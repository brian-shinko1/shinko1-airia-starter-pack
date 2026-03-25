"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

function extractDomain(url: string): string {
  try {
    const cleaned = url.startsWith("http") ? url : `https://${url}`
    const domain = new URL(cleaned).hostname.replace("www.", "")
    return domain
  } catch {
    return url
  }
}

async function callAiriaAPI(userInput: string): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userInput }),
  })
  if (!res.ok) throw new Error("API error")
  const data = await res.json()
  // Airia returns the response in `output` or `result`
  return data.output ?? data.result ?? data.message ?? JSON.stringify(data)
}

export function Chatbot() {
  const [companyUrl, setCompanyUrl] = useState("")
  const [urlSubmitted, setUrlSubmitted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages, isTyping])

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!companyUrl.trim()) return

    const domain = extractDomain(companyUrl.trim())
    setUrlSubmitted(true)

    const userMsg: Message = { id: 0, role: "user", content: companyUrl.trim() }
    setMessages([userMsg])
    setIsTyping(true)

    try {
      const reply = await callAiriaAPI(
        `Analyse this company website and identify the top AI use cases for their business: ${domain}`
      )
      setMessages([userMsg, { id: 1, role: "assistant", content: reply }])
    } catch {
      setMessages([userMsg, { id: 1, role: "assistant", content: "Sorry, I couldn't reach the API. Please try again." }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSend = async (messageText?: string) => {
    const text = messageText || input
    if (!text.trim()) return

    const userMessage: Message = { id: messages.length, role: "user", content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const reply = await callAiriaAPI(text)
      setMessages((prev) => [...prev, { id: prev.length, role: "assistant", content: reply }])
    } catch {
      setMessages((prev) => [...prev, { id: prev.length, role: "assistant", content: "Sorry, something went wrong. Please try again." }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <section id="chatbot" className="bg-secondary/20 py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 border border-border bg-card px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Powered by Airia</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Discover Your Company's AI Use Cases
          </h2>
          <p className="mt-4 text-muted-foreground">
            Enter your company URL and we'll surface the highest-impact AI opportunities for your organisation
          </p>
        </div>

        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-primary">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">Company Use Case Discovery</CardTitle>
                <CardDescription>Powered by Airia — tailored to your business</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {!urlSubmitted ? (
              <div className="flex flex-col items-center justify-center gap-6 px-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center border border-border bg-secondary">
                  <Globe className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Enter your company URL</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We'll analyse your business and suggest the most relevant AI use cases
                  </p>
                </div>
                <form onSubmit={handleUrlSubmit} className="flex w-full max-w-md gap-2">
                  <Input
                    value={companyUrl}
                    onChange={(e) => setCompanyUrl(e.target.value)}
                    placeholder="e.g. yourcompany.com"
                    className="flex-1"
                    type="text"
                    autoFocus
                  />
                  <Button type="submit" disabled={!companyUrl.trim()} className="gap-2">
                    Analyse
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            ) : (
              <>
                <div ref={scrollContainerRef} className="h-[400px] overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary">
                            <Bot className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] px-4 py-3 text-sm ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground"
                          }`}
                        >
                          {message.role === "user" ? (
                            <div className="whitespace-pre-wrap">{message.content}</div>
                          ) : (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                ul: ({ children }) => <ul className="mb-2 list-disc pl-4">{children}</ul>,
                                ol: ({ children }) => <ol className="mb-2 list-decimal pl-4">{children}</ol>,
                                li: ({ children }) => <li className="mb-1">{children}</li>,
                                table: ({ children }) => (
                                  <div className="my-2 overflow-x-auto">
                                    <table className="w-full border-collapse text-xs">{children}</table>
                                  </div>
                                ),
                                thead: ({ children }) => <thead className="border-b border-border">{children}</thead>,
                                th: ({ children }) => (
                                  <th className="px-3 py-2 text-left font-semibold text-foreground">{children}</th>
                                ),
                                td: ({ children }) => (
                                  <td className="border-b border-border/50 px-3 py-2 align-top">{children}</td>
                                ),
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          )}
                        </div>
                        {message.role === "user" && (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-secondary">
                            <User className="h-4 w-4 text-secondary-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary">
                          <Bot className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div className="bg-secondary px-4 py-3">
                          <div className="flex gap-1">
                            <span className="h-2 w-2 animate-bounce bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                            <span className="h-2 w-2 animate-bounce bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                            <span className="h-2 w-2 animate-bounce bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask a follow-up question..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button onClick={() => handleSend()} disabled={!input.trim() || isTyping} size="icon">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
