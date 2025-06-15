"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, X, Loader2 } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const snehaDescription = `I'm Sneha Mandal, a passionate and driven undergraduate student specializing in frontend development. Currently, I'm expanding my expertise into backend technologies and exploring the evolving landscape of Web3. I believe that continuous learning is the key to staying ahead in tech, and I'm committed to honing my skills across the full stack. In parallel with my development journey, I'm delving into the fascinating domain of Quantum Computing—a field I believe holds the potential to unlock a new era of computation. To me, it's not just a subject of study, but a gateway to the future, a possible key to what I call the quantum world lock. Outside the realm of technology, I have a deep appreciation for physics, especially astronomy and quantum mechanics, which fuel my curiosity and inspire my thinking. When I'm not coding or reading about the cosmos, you'll find me immersed in books, playing the piano, or expressing creativity through sketching. These pursuits ground me and keep my imagination alive, adding balance to my analytical side.`

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I am Sneha Mandal's AI Assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isOpen, loading])

  function isAboutSneha(text: string) {
    const lowered = text.toLowerCase()
    return (
      lowered.includes("sneha mandal") ||
      lowered.includes("who is sneha") ||
      lowered.includes("about sneha") ||
      lowered.includes("tell me about sneha") ||
      lowered.includes("your creator")
    )
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")

    // If the question is specifically about Sneha, reply locally
    if (isAboutSneha(input)) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: snehaDescription },
      ])
      return
    }

    setLoading(true)
    // Otherwise, call Gemini API via our route for general conversation
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply },
      ])
    } catch (e) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, there was an error contacting the AI service." },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Gradient style
  const gradient =
    "bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400"
  const gradientText =
    "bg-gradient-to-tr from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent"
  const gradientBorder =
    "p-[2px] bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 rounded-2xl"

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg flex items-center justify-center z-50 ${gradient}`}
          style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.25)" }}
        >
          <MessageSquare className="h-7 w-7 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-[350px] max-w-[90vw] z-50 ${gradientBorder}`} style={{ boxShadow: "0 4px 32px 0 rgba(0,0,0,0.45)" }}>
          <div className="rounded-2xl bg-black/90 flex flex-col">
            {/* Header */}
            <div className={`flex items-center justify-between px-4 py-3 rounded-t-2xl ${gradient}`}>
              <span className="font-semibold text-white drop-shadow-md">Sneha Mandal's AI Assistant</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
              style={{ maxHeight: 350 }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-xl px-4 py-2 max-w-[80%] text-base shadow-md ${
                      message.role === "user"
                        ? "bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 text-white font-medium drop-shadow-md"
                        : "bg-zinc-900 text-zinc-100"
                    }`}
                    style={
                      message.role === "user"
                        ? { boxShadow: "0 2px 8px 0 rgba(255,0,255,0.15)" }
                        : { boxShadow: "0 2px 8px 0 rgba(0,0,0,0.15)" }
                    }
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-xl px-4 py-2 max-w-[80%] text-base shadow-md bg-zinc-900 text-zinc-100 flex items-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" />
                    Thinking...
                  </div>
                </div>
              )}
            </div>
            {/* Input */}
            <div className="flex gap-2 p-3 border-t border-white/10 bg-black/80 rounded-b-2xl">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="bg-black/60 border-none text-white placeholder:text-purple-200 focus:ring-2 focus:ring-pink-400"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                className={`h-10 w-10 rounded-full flex items-center justify-center ${gradient} shadow-md hover:scale-105 transition-transform disabled:opacity-50`}
                disabled={loading}
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : <Send className="h-5 w-5 text-white" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 