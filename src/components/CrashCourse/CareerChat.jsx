"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send, User, Bot } from "lucide-react"
import Typewriter from "./Typewriter"

export default function CareerChat({ careerPath, scrapedData }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, careerPath, scrapedData }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from AI")
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.message, isTyping: true }])

      // Simulate typing effect
      setTimeout(() => {
        setMessages((prev) => prev.map((msg, idx) => (idx === prev.length - 1 ? { ...msg, isTyping: false } : msg)))
      }, data.message.length * 20) // Adjust timing based on message length
    } catch (error) {
      console.error("Error in chat:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="h-[70vh] flex flex-col bg-black/50 backdrop-blur-md shadow-xl rounded-xl overflow-hidden border border-white">
      <CardContent className="flex-grow flex flex-col p-4">
        <ScrollArea className="flex-grow mb-4 pr-4" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-start ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`p-3 rounded-xl max-w-[80%] ${message.role === "user" ? "bg-[#4F46E5]" : "bg-[#57FF31]"}`}
                >
                  {message.role === "assistant" && message.isTyping ? (
                    <Typewriter text={message.content} />
                  ) : (
                    <div className={message.role === "user" ? "text-white" : "text-black"}>{message.content}</div>
                  )}
                </div>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${message.role === "user" ? "bg-[#4F46E5] ml-3" : "bg-[#57FF31] mr-3"}`}
                >
                  {message.role === "user" ? (
                    <User className="text-white w-6 h-6" />
                  ) : (
                    <Bot className="text-black w-6 h-6" />
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-[#57FF31] p-2 rounded-xl">
                <Loader2 className="h-5 w-5 animate-spin text-black" />
              </div>
            </div>
          )}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex gap-3 mt-4">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your career path..."
            className="flex-grow text-lg rounded-xl border-2 border-white focus:border-[#57FF31] focus:ring-2 focus:ring-[#57FF31] bg-black text-white"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#57FF31] hover:from-[#4F46E5] hover:to-[#57FF31] text-black font-bold py-2 px-6 rounded-xl transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

