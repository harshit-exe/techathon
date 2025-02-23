"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Briefcase, TrendingUp, BookOpen } from "lucide-react"
import { useGroqAI } from "@/components/CrashCourse/useGroqAI"
import BentoGrid from "@/components/CrashCourse/BentoGrid"
import CareerPathForm from "@/components/CrashCourse/CareerPathForm"
import CareerPathDisplay from "@/components/CrashCourse/CareerPathDisplay"
import SkillsRadarChart from "@/components/CrashCourse/SkillsRadarChart"
import CareerTimeline from "@/components/CrashCourse/CareerTimeline"
import CareerChat from "@/components/CrashCourse/CareerChat"
import ResourceLibrary from "@/components/CrashCourse/ResourceLibrary"


export default function AICareerPathGenerator() {
  const [input, setInput] = useState("")
  const [careerPath, setCareerPath] = useState(null)
  const [isScrapingLoading, setIsScrapingLoading] = useState(false)
  const [isPresent, setIsPresent] = useState(false)
  const [scrapingError, setScrapingError] = useState(null)
  const [scrapedData, setScrapedData] = useState(null)
  const { generateCareerPath, isLoading, error: careerPathError } = useGroqAI()

  const handleSubmit = async (formInput, scrapedContent) => {
    setInput(formInput)
    setIsPresent(true)
    setScrapedData(scrapedContent)

    try {
      const generatedCareerPath = await generateCareerPath(formInput, scrapedContent)
      setCareerPath(generatedCareerPath)
    } catch (error) {
      console.error("Error generating career path:", error)
      setScrapingError("Failed to generate career path. Please try again.")
    }
  }

  useEffect(() => {
    if (careerPath) {
      // Animate the appearance of the career path content
      const elements = document.querySelectorAll(".career-path-content")
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("animate-fadeIn")
        }, index * 200)
      })
    }
  }, [careerPath])

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="container mx-auto p-8">
        <h1 className="text-6xl font-extrabold mb-8 text-center  ">
         <span className="text-[#57FF31]">C</span>areer Path Generator
        </h1>

        {!isPresent && <BentoGrid />}

        <CareerPathForm
          onSubmit={handleSubmit}
          isLoading={isLoading || isScrapingLoading}
          setIsScrapingLoading={setIsScrapingLoading}
          setScrapingError={setScrapingError}
        />

        {(scrapingError || careerPathError) && (
          <Alert
            variant="destructive"
            className="mb-4 bg-red-900 border-l-4 border-red-500 text-white p-4 rounded-xl animate-shake"
          >
            <AlertCircle className="h-6 w-6 mr-2" />
            <AlertTitle className="font-bold">Error</AlertTitle>
            <AlertDescription>{scrapingError || careerPathError}</AlertDescription>
          </Alert>
        )}

        {careerPath && (
          <div className="mt-8 grid gap-8 animate-fadeIn text-white ">
            <Card className="bg-black/50 backdrop-blur-md border border-white rounded-xl overflow-hidden">
              <Tabs defaultValue="outline" className="w-full">
                <TabsList className="w-full grid grid-cols-4 bg-black/50 rounded-t-xl">
                  <TabsTrigger
                    value="outline"
                    className="text-lg font-semibold data-[state=active]:bg-[#4F46E5] data-[state=active]:text-white"
                  >
                    <Briefcase className="w-5 h-5 mr-2" />
                    Career Path
                  </TabsTrigger>
                  {/* <TabsTrigger
                    value="skills"
                    className="text-lg font-semibold data-[state=active]:bg-[#4F46E5] data-[state=active]:text-white"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Skills Analysis
                  </TabsTrigger>
                  <TabsTrigger
                    value="timeline"
                    className="text-lg font-semibold data-[state=active]:bg-[#4F46E5] data-[state=active]:text-white"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Career Timeline
                  </TabsTrigger> */}
                  <TabsTrigger
                    value="chat"
                    className="text-lg font-semibold data-[state=active]:bg-[#4F46E5] data-[state=active]:text-white"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Career Chat
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="outline" className="p-6 career-path-content">
                  <CareerPathDisplay careerPath={careerPath} />
                </TabsContent>
                <TabsContent value="skills" className="p-6 career-path-content">
                  <SkillsRadarChart careerPath={careerPath} />
                </TabsContent>
                <TabsContent value="timeline" className="p-6 career-path-content">
                  <CareerTimeline careerPath={careerPath} />
                </TabsContent>
                <TabsContent value="chat" className="p-6 career-path-content">
                  <CareerChat careerPath={careerPath} scrapedData={scrapedData} />
                </TabsContent>
              </Tabs>
            </Card>
            <ResourceLibrary careerPath={careerPath} />
          </div>
        )}
      </div>
    </div>
  )
}

