"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Palette, Hash, RefreshCw, Share2 } from "lucide-react"
import * as zodiacIcons from "./zodiac-icons"

const ZODIAC_SIGNS = [
  { name: "Aries", icon: zodiacIcons.Aries },
  { name: "Taurus", icon: zodiacIcons.Taurus },
  { name: "Gemini", icon: zodiacIcons.Gemini },
  { name: "Cancer", icon: zodiacIcons.Cancer },
  { name: "Leo", icon: zodiacIcons.Leo },
  { name: "Virgo", icon: zodiacIcons.Virgo },
  { name: "Libra", icon: zodiacIcons.Libra },
  { name: "Scorpio", icon: zodiacIcons.Scorpio },
  { name: "Sagittarius", icon: zodiacIcons.Sagittarius },
  { name: "Capricorn", icon: zodiacIcons.Capricorn },
  { name: "Aquarius", icon: zodiacIcons.Aquarius },
  { name: "Pisces", icon: zodiacIcons.Pisces },
]

const TECH_COLORS = [
  "GitHub Dark",
  "React Blue",
  "Vue Green",
  "Angular Red",
  "Python Blue",
  "Node Green",
  "TypeScript Blue",
  "Firebase Orange",
  "Go Blue",
  "Rust Orange",
]

export default function AstroTechPrediction() {
  const [date, setDate] = useState("")
  const [zodiacSign, setZodiacSign] = useState("")
  const [prediction, setPrediction] = useState("")
  const [luckyColor, setLuckyColor] = useState("")
  const [luckyNumber, setLuckyNumber] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
const GROQ_API_KEY = "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"
  const generatePrediction = async () => {
    if (!date || !zodiacSign) return

    setIsLoading(true)
    try {
      const techColor = getRandomTechColor()
      const techNumber = getRandomNumber(1, 42)

      const messages = [
        {
          role: "system",
          content: `You are TechStrologer, a witty AI that combines software development wisdom with astrological insights. 
          Your predictions should be:
          1. Tech-focused and practical
          2. Humorous and light-hearted
          3. Motivational and encouraging
          4. Include specific programming concepts or tools
          5. Incorporate the provided lucky color and number
          6. Use puns or wordplay related to coding and astrology
          Keep the response under 60 words and make it sound like advice from a fun, geeky friend.`,
        },
        {
          role: "user",
          content: `Generate a tech-focused, funny, and motivational prediction for a ${zodiacSign} developer born on ${date}. 
          Their lucky color is ${techColor} and lucky number is ${techNumber}. 
          Incorporate these into a coding or development context with a touch of cosmic humor.`,
        },
      ]

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          messages,
          max_tokens: 100,
          temperature: 0.8,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch prediction")
      }

      const data = await response.json()
      const newPrediction = data.choices[0].message.content.trim()

      setPrediction(newPrediction)
      setLuckyColor(techColor)
      setLuckyNumber(techNumber)
    } catch (error) {
      console.error("Error:", error)
      setPrediction("Oops! The cosmic compiler encountered an error. Please try again to debug the universe.")
    } finally {
      setIsLoading(false)
    }
  }

  const getRandomTechColor = () => TECH_COLORS[Math.floor(Math.random() * TECH_COLORS.length)]
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  const shareQuote = async () => {
    if (prediction) {
      try {
        await navigator.clipboard.writeText(prediction)
        alert("Prediction copied to clipboard! Share the cosmic code!")
      } catch (err) {
        console.error("Failed to copy prediction:", err)
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-center text-4xl md:text-5xl font-bold mb-12">
          <span className="text-[#57FF31]">Astro</span>Career prediction
        </h1>

        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-sm text-[#6366F1]">Date of Birth</label>
            <Input
              type="text"
              placeholder="YYYY / MM / DD"
              value={date}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "")
                const formattedValue = value.replace(/(\d{4})(\d{2})(\d{2})/, "$1 / $2 / $3")
                setDate(formattedValue.trim())
              }}
              className="border-[#57FF31] bg-transparent text-white placeholder-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#6366F1]">Select Your Zodiac Sign</label>
            <Select value={zodiacSign} onValueChange={setZodiacSign}>
              <SelectTrigger className="border-[#57FF31] bg-transparent text-white">
                <SelectValue placeholder="Select Zodiac Sign" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-[#57FF31]">
                {ZODIAC_SIGNS.map((sign) => (
                  <SelectItem key={sign.name} value={sign.name} className="text-white">
                    <div className="flex items-center gap-2">
                      <sign.icon className="w-5 h-5" />
                      {sign.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {prediction && (
          <div className="relative mt-12 mb-12 p-8 bg-gray-900/50 rounded-lg border border-[#6366F1]">
            <div className="absolute -top-5 -left-3 text-[#6366F1] text-6xl">"</div>
            <p className="text-center text-xl md:text-2xl font-medium leading-relaxed text-white">{prediction}</p>
            <div className="absolute -bottom-5 -right-3 text-[#6366F1] text-6xl rotate-180">"</div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 border border-[#57FF31] rounded-lg bg-gray-900/30">
            <div className="flex items-center gap-2 mb-2">
              <Palette className="h-5 w-5 text-[#57FF31]" />
              <span className="text-[#6366F1]">Auspicious Color</span>
            </div>
            <p className="text-xl text-white">{luckyColor || "Generate to reveal"}</p>
          </div>

          <div className="p-4 border border-[#57FF31] rounded-lg bg-gray-900/30">
            <div className="flex items-center gap-2 mb-2">
              <Hash className="h-5 w-5 text-[#57FF31]" />
              <span className="text-[#6366F1]">Lucky Number</span>
            </div>
            <p className="text-xl text-white">{luckyNumber || "Generate to reveal"}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={generatePrediction}
            disabled={!date || !zodiacSign || isLoading}
            className="bg-[#6366F1] hover:bg-[#6366F1]/90 text-white px-6 py-3 rounded-xl text-lg font-semibold"
          >
            <RefreshCw className={`mr-2 h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
            Generate New Insights
          </Button>
          <Button
            onClick={shareQuote}
            disabled={!prediction}
            className="border-2 border-[#57FF31] text-[#57FF31] hover:bg-[#57FF31]/10 px-6 py-3 rounded-xl text-lg font-semibold"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share Quote
          </Button>
        </div>

        <footer className="text-center text-sm text-gray-400 pt-8">© 2024 DishaMarg. All rights reserved.</footer>
      </div>
    </div>
  )
}

