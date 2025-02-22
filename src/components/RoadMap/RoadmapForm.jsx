"use client"

import { useState } from "react"
import { useGroqAI } from "./useGroqAI"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"

const careerPaths = [
  { value: "software-developer", label: "Software Developer", icon: "mdi:laptop-code" },
  { value: "data-scientist", label: "Data Scientist", icon: "mdi:chart-scatter-plot" },
  { value: "ux-designer", label: "UX Designer", icon: "mdi:palette-outline" },
  { value: "product-manager", label: "Product Manager", icon: "mdi:briefcase-outline" },
  { value: "cybersecurity-analyst", label: "Cybersecurity Analyst", icon: "mdi:shield-lock-outline" },
  { value: "ai-engineer", label: "AI Engineer", icon: "mdi:robot-outline" },
  { value: "cloud-architect", label: "Cloud Architect", icon: "mdi:cloud-outline" },
  { value: "devops-engineer", label: "DevOps Engineer", icon: "mdi:infinity" },
]

const skillLevels = [
  { value: "beginner", label: "Beginner", icon: "mdi:sprout" },
  { value: "intermediate", label: "Intermediate", icon: "mdi:tree" },
  { value: "advanced", label: "Advanced", icon: "mdi:palm-tree" },
]

const focusAreas = [
  { value: "technical-skills", label: "Technical Skills", icon: "mdi:code-tags" },
  { value: "soft-skills", label: "Soft Skills", icon: "mdi:account-group" },
  { value: "industry-knowledge", label: "Industry Knowledge", icon: "mdi:briefcase" },
  { value: "project-management", label: "Project Management", icon: "mdi:clipboard-check" },
  { value: "leadership", label: "Leadership", icon: "mdi:account-supervisor" },
  { value: "innovation", label: "Innovation", icon: "mdi:lightbulb-on" },
]

export default function RoadmapForm({ setRoadmapData, onComplete }) {
  const [careerPath, setCareerPath] = useState("")
  const [skillLevel, setSkillLevel] = useState("")
  const [timeframe, setTimeframe] = useState(12)
  const [selectedFocusAreas, setSelectedFocusAreas] = useState([])
  const [includeCertifications, setIncludeCertifications] = useState(false)
  const [customGoals, setCustomGoals] = useState("")
  const { generateSubtasks, isLoading, error } = useGroqAI()

  const handleFocusAreaToggle = (area) => {
    setSelectedFocusAreas((prev) => (prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const prompt = `Create a detailed career development roadmap for a ${skillLevel} level ${careerPath} with a timeframe of ${timeframe} months. 
                    Focus areas: ${selectedFocusAreas.join(", ")}. 
                    ${includeCertifications ? "Include relevant certifications." : ""}
                    Custom goals: ${customGoals}
                    For each step in the roadmap, provide:
                    1. A clear title starting with "Step: "
                    2. Required skills, each prefixed with "- Skill: "
                    3. Recommended resources (with URLs) prefixed with "- Resource: "
                    4. If applicable, recommended certifications
                    Ensure the roadmap is comprehensive and aligned with industry standards.`
    const roadmapData = await generateSubtasks(prompt)

    if (roadmapData && roadmapData.nodes && roadmapData.edges) {
      setRoadmapData(roadmapData)
      onComplete()
    } else {
      console.error("Invalid roadmap data received:", roadmapData)
    }
  }

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="space-y-8 bg-black text-white p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="careerPath" className="text-lg font-medium text-white mb-3">
              Career Path:
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {careerPaths.map((path) => (
                <Tooltip key={path.value} content={path.label}>
                  <Button
                    type="button"
                    onClick={() => setCareerPath(path.value)}
                    variant={careerPath === path.value ? "default" : "outline"}
                    className={`flex items-center justify-center h-16 ${careerPath === path.value ? "bg-indigo-600 text-white" : "bg-gray-800 text-white border-indigo-600"}`}
                  >
                    <Icon icon={path.icon} className="w-8 h-8" />
                  </Button>
                </Tooltip>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="skillLevel" className="text-lg font-medium text-white mb-3">
              Skill Level:
            </Label>
            <div className="flex justify-between">
              {skillLevels.map((level) => (
                <Tooltip key={level.value} content={level.label}>
                  <Button
                    type="button"
                    onClick={() => setSkillLevel(level.value)}
                    variant={skillLevel === level.value ? "default" : "outline"}
                    className={`flex flex-col items-center justify-center h-24 w-24 ${skillLevel === level.value ? "bg-indigo-600 text-white" : "bg-gray-800 text-white border-indigo-600"}`}
                  >
                    <Icon icon={level.icon} className="w-10 h-10 mb-2" />
                    <span className="text-xs">{level.label}</span>
                  </Button>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="timeframe" className="text-lg font-medium text-white mb-3">
            Timeframe: {timeframe} months
          </Label>
          <Slider
            id="timeframe"
            min={1}
            max={60}
            step={1}
            value={[timeframe]}
            onValueChange={(value) => setTimeframe(value[0])}
            className="w-full"
          />
        </div>

        <div>
          <Label className="text-lg font-medium text-white mb-3">Focus Areas:</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {focusAreas.map((area) => (
              <Button
                key={area.value}
                type="button"
                onClick={() => handleFocusAreaToggle(area.value)}
                variant={selectedFocusAreas.includes(area.value) ? "default" : "outline"}
                className={`flex items-center justify-start h-12 ${selectedFocusAreas.includes(area.value) ? "bg-indigo-600 text-white" : "bg-gray-800 text-white border-indigo-600"}`}
              >
                <Icon icon={area.icon} className="w-5 h-5 mr-2" />
                <span>{area.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <Switch id="certifications" checked={includeCertifications} onCheckedChange={setIncludeCertifications} />
          <Label htmlFor="certifications" className="ml-2 text-white">
            Include Certifications
          </Label>
        </div>

        <div>
          <Label htmlFor="customGoals" className="text-lg font-medium text-white mb-3">
            Custom Goals:
          </Label>
          <Input
            id="customGoals"
            value={customGoals}
            onChange={(e) => setCustomGoals(e.target.value)}
            placeholder="Enter any specific goals or areas you want to focus on"
            className="bg-gray-800 text-white border-indigo-600"
          />
        </div>

        <Button
          type="submit"
          className="w-full text-lg font-semibold h-12 bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={isLoading || !careerPath || !skillLevel}
        >
          {isLoading ? (
            <>
              <Icon icon="eos-icons:loading" className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Icon icon="carbon:roadmap" className="mr-2" />
              Generate Career Roadmap
            </>
          )}
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </TooltipProvider>
  )
}

