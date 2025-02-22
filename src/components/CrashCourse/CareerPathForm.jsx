"use client"

import { useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Target } from "lucide-react"

export default function CareerPathForm({ onSubmit, isLoading, setIsScrapingLoading, setScrapingError }) {
  const [input, setInput] = useState("")

  const handleInputChange = (e) => setInput(e.target.value)

  const scrapeWebsite = async (url) => {
    setIsScrapingLoading(true)
    setScrapingError(null)
    try {
      const response = await axios.get("/api/scrape", {
        params: { url },
        timeout: 30000, // 30 seconds timeout
      })
      return response.data
    } catch (error) {
      console.error("Error scraping website:", error)
      if (error.code === "ECONNABORTED") {
        setScrapingError("Request timed out. The website might be slow or unavailable.")
      } else if (error.response && error.response.status === 404) {
        setScrapingError("The requested page was not found. Please check the URL and try again.")
      } else {
        setScrapingError("Failed to scrape website content. Please check the URL and try again.")
      }
      throw error
    } finally {
      setIsScrapingLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let scrapedContent = null

    if (input.startsWith("http")) {
      scrapedContent = await scrapeWebsite(input)
    }

    onSubmit(input, scrapedContent)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-black/90 backdrop-blur-md p-8 rounded-xl shadow-xl border border-[#4F46E5]"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter a job title, skill, or career website URL"
          className="flex-grow py-6 text-lg rounded-xl border-2 border-[#4F46E5] focus:border-[#57FF31] focus:ring-2 focus:ring-[#57FF31] bg-black text-white"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-[#4F46E5] to-[#57FF31] hover:from-[#4F46E5] hover:to-[#57FF31] text-black font-bold py-6 px-6 rounded-xl transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Target className="mr-2 h-5 w-5" />
              Generate Career Path
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

