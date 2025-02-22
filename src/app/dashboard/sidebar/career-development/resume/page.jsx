"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Plus, ArrowRight, Download, Upload, CheckCircle, XCircle, Eye, Loader2, AlertTriangle } from "lucide-react"

// ATS keywords categorized by industry/job role
const atsKeywords = {
  general: ["leadership", "teamwork", "communication", "problem-solving", "analytical", "innovative"],
  tech: [
    "javascript",
    "react",
    "node.js",
    "python",
    "aws",
    "docker",
    "kubernetes",
    "machine learning",
    "data analysis",
  ],
  marketing: ["seo", "social media", "content strategy", "analytics", "branding", "campaign management"],
  finance: ["financial analysis", "budgeting", "forecasting", "risk management", "investment"],
  // Add more categories as needed
}

const actionVerbs = [
  "achieved",
  "improved",
  "developed",
  "managed",
  "created",
  "implemented",
  "led",
  "increased",
  "reduced",
  "negotiated",
]

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
    },
    professionalSummary: "",
    workExperience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        year: "",
      },
    ],
    skills: [],
  })

  const [atsScore, setAtsScore] = useState(0)
  const [atsKeywordsFound, setAtsKeywordsFound] = useState([])
  const [atsMissingKeywords, setAtsMissingKeywords] = useState([])
  const [atsFormatIssues, setAtsFormatIssues] = useState([])
  const [atsActionVerbScore, setAtsActionVerbScore] = useState(0)
  const [atsSuggestions, setAtsSuggestions] = useState([])
  const [pdfPreview, setPdfPreview] = useState(null)

  const [isGenerating, setIsGenerating] = useState(false)

  const calculateAtsScore = useCallback(() => {
    let score = 0
    const foundKeywords = []
    const missingKeywords = []
    const formatIssues = []
    const suggestions = []
    let actionVerbCount = 0

    const fullText = JSON.stringify(formData).toLowerCase()

    // Check keywords
    Object.values(atsKeywords)
      .flat()
      .forEach((keyword) => {
        if (fullText.includes(keyword.toLowerCase())) {
          score += 2
          foundKeywords.push(keyword)
        } else {
          missingKeywords.push(keyword)
        }
      })

    // Check keyword density
    const wordCount = fullText.split(/\s+/).length
    const keywordDensity = foundKeywords.length / wordCount
    if (keywordDensity < 0.01) {
      suggestions.push("Consider increasing the use of relevant keywords throughout your resume.")
    } else if (keywordDensity > 0.05) {
      suggestions.push("Be careful not to overuse keywords. Aim for natural integration.")
    }

    // Check formatting issues
    if (formData.personalInfo.fullName.length > 30) {
      formatIssues.push("Name might be too long for ATS parsing")
    }
    if (!formData.personalInfo.email.includes("@")) {
      formatIssues.push("Invalid email format")
    }
    if (formData.workExperience.some((exp) => exp.description.length > 1000)) {
      formatIssues.push("Some job descriptions might be too long for ATS")
    }

    // Check use of action verbs
    formData.workExperience.forEach((exp) => {
      actionVerbs.forEach((verb) => {
        if (exp.description.toLowerCase().includes(verb)) {
          actionVerbCount++
        }
      })
    })
    const actionVerbScore = Math.min((actionVerbCount / formData.workExperience.length) * 10, 10)
    setAtsActionVerbScore(actionVerbScore)
    score += actionVerbScore

    // Add points for having all sections filled out
    if (formData.personalInfo.fullName) score += 5
    if (formData.personalInfo.email) score += 5
    if (formData.personalInfo.phone) score += 5
    if (formData.personalInfo.location) score += 5
    if (formData.professionalSummary) score += 10
    if (formData.workExperience.length > 0) score += 15
    if (formData.education.length > 0) score += 10
    if (formData.skills.length > 0) score += 10

    // Normalize score to 100
    score = Math.min(Math.round(score), 100)

    // Generate suggestions
    if (score < 60) {
      suggestions.push(
        "Your resume needs significant improvement to pass ATS scans. Focus on adding relevant keywords and improving your content.",
      )
    } else if (score < 80) {
      suggestions.push(
        "Your resume is on the right track, but could use some enhancements to perform better in ATS scans.",
      )
    } else {
      suggestions.push(
        "Great job! Your resume is well-optimized for ATS scans. Keep refining to maintain its effectiveness.",
      )
    }

    setAtsScore(score)
    setAtsKeywordsFound(foundKeywords)
    setAtsMissingKeywords(missingKeywords)
    setAtsFormatIssues(formatIssues)
    setAtsSuggestions(suggestions)
  }, [formData])

  useEffect(() => {
    calculateAtsScore()
  }, [calculateAtsScore])

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      // Create FormData
      const formData = new FormData()
      formData.append("resume", file)

      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/parse-resume", {
          method: "POST",
          body: formData,
        })

        const parsedData = await response.json()

        // Update form state with parsed data
        setFormData(parsedData)
      } catch (error) {
        console.error("Error parsing resume:", error)
      }
    }
  }

  const generateResume = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate resume")
      }

      const data = await response.json()
      setPdfPreview(`data:application/pdf;base64,${data.pdf}`)
    } catch (error) {
      console.error("Error generating resume:", error)
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadPdf = () => {
    if (pdfPreview) {
      const link = document.createElement("a")
      link.href = pdfPreview
      link.download = "resume.pdf"
      link.click()
    }
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-[#191919]">
        <h1 className="text-2xl font-bold">
          <span className="text-[#6366f1]">S</span>hikhaVerse
        </h1>
        <Button className="bg-[#6366f1] hover:bg-[#5355d1] text-white rounded-full gap-2 px-6">
          Join Metaverse <ArrowRight className="w-4 h-4" />
        </Button>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex gap-8">
          {/* Form Section */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Resume Builder</h2>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="flex items-center gap-2 cursor-pointer bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white px-4 py-2 rounded-lg"
                >
                  <Upload className="w-4 h-4" />
                  Upload Resume
                </label>
              </div>
            </div>

            {/* ATS Score Card */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 space-y-4">
              <h3 className="flex items-center gap-2 text-[15px] font-semibold text-gray-200">🎯 ATS Score</h3>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-[#6366f1]">{atsScore}%</div>
                <Progress value={atsScore} className="w-2/3" indicatorcolor="bg-[#6366f1]" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Keywords found:</p>
                <div className="flex flex-wrap gap-2">
                  {atsKeywordsFound.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Missing important keywords:</p>
                <div className="flex flex-wrap gap-2">
                  {atsMissingKeywords.slice(0, 5).map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-red-500/20 text-red-500 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                    >
                      <XCircle className="w-3 h-3" />
                      {keyword}
                    </span>
                  ))}
                  {atsMissingKeywords.length > 5 && (
                    <span className="text-gray-400 text-xs">and {atsMissingKeywords.length - 5} more...</span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Formatting issues:</p>
                <div className="flex flex-col gap-2">
                  {atsFormatIssues.map((issue, index) => (
                    <span key={index} className="text-yellow-500 text-xs flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {issue}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Action Verb Usage:</p>
                <Progress value={atsActionVerbScore * 10} className="w-full" indicatorcolor="bg-[#6366f1]" />
                <p className="text-xs text-gray-400">Score: {atsActionVerbScore.toFixed(1)}/10</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Suggestions for improvement:</p>
                <ul className="list-disc list-inside text-xs text-gray-300">
                  {atsSuggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 space-y-4">
              <h3 className="flex items-center gap-2 text-[15px] font-semibold text-gray-200">
                👤 Personal Information
              </h3>
              <Input
                placeholder="Enter your full name"
                className="bg-[#2A2A2A] border-none h-11 rounded-lg text-gray-300 placeholder:text-gray-500"
                value={formData.personalInfo.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, fullName: e.target.value },
                  })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Enter your email"
                  className="bg-[#2A2A2A] border-none h-11 rounded-lg text-gray-300 placeholder:text-gray-500"
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, email: e.target.value },
                    })
                  }
                />
                <Input
                  placeholder="Enter your phone number"
                  className="bg-[#2A2A2A] border-none h-11 rounded-lg text-gray-300 placeholder:text-gray-500"
                  value={formData.personalInfo.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, phone: e.target.value },
                    })
                  }
                />
              </div>
              <Input
                placeholder="City, Country"
                className="bg-[#2A2A2A] border-none h-11 rounded-lg text-gray-300 placeholder:text-gray-500"
                value={formData.personalInfo.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, location: e.target.value },
                  })
                }
              />
            </div>

            {/* Professional Summary */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 space-y-4">
              <h3 className="flex items-center gap-2 text-[15px] font-semibold text-gray-200">
                💼 Professional Summary
              </h3>
              <Textarea
                placeholder="Write a brief summary of your professional experience and goals"
                className="bg-[#2A2A2A] border-none min-h-[120px] rounded-lg text-gray-300 placeholder:text-gray-500"
                value={formData.professionalSummary}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    professionalSummary: e.target.value,
                  })
                }
              />
            </div>

            {/* Work Experience */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="flex items-center gap-2 text-[15px] font-semibold text-gray-200">📋 Work Experience</h3>
                <Button
                  size="sm"
                  className="bg-transparent hover:bg-[#2A2A2A] text-[#6366f1] gap-2 rounded-lg border border-[#6366f1]"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      workExperience: [
                        ...formData.workExperience,
                        {
                          company: "",
                          position: "",
                          startDate: "",
                          endDate: "",
                          description: "",
                        },
                      ],
                    })
                  }
                >
                  Add Experience <Plus className="w-4 h-4" />
                </Button>
              </div>

              {formData.workExperience.map((exp, index) => (
                <div key={index} className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Enter company name"
                      className="bg-[#2A2A2A] border-none h-11 rounded-lg text-gray-300 placeholder:text-gray-500"
                      value={exp.company}
                      onChange={(e) => {
                        const newExp = [...formData.workExperience]
                        newExp[index].company = e.target.value
                        setFormData({ ...formData, workExperience: newExp })
                      }}
                    />
                    <Input
                      placeholder="Enter your position"
                      className="bg-[#2A2A2A] border-none h-11 rounded-lg text-gray-300 placeholder:text-gray-500"
                      value={exp.position}
                      onChange={(e) => {
                        const newExp = [...formData.workExperience]
                        newExp[index].position = e.target.value
                        setFormData({ ...formData, workExperience: newExp })
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="MM/YYY"
                      className="bg-[#2A2A2A] border-none h-11 rounded-lg text-gray-300 placeholder:text-gray-500"
                      value={exp.startDate}
                      onChange={(e) => {
                        const newExp = [...formData.workExperience]
                        newExp[index].startDate = e.target.value
                        setFormData({ ...formData, workExperience: newExp })
                      }}
                    />
                    <Input
                      placeholder="MM/YYY or Present"
                      className="bg-[#2A2A2A] border-none h-11 rounded-lg text-gray-300 placeholder:text-gray-500"
                      value={exp.endDate}
                      onChange={(e) => {
                        const newExp = [...formData.workExperience]
                        newExp[index].endDate = e.target.value
                        setFormData({ ...formData, workExperience: newExp })
                      }}
                    />
                  </div>
                  <Textarea
                    placeholder="Describe your responsibilities and achievements"
                    className="bg-[#2A2A2A] border-none min-h-[100px] rounded-lg text-gray-300 placeholder:text-gray-500"
                    value={exp.description}
                    onChange={(e) => {
                      const newExp = [...formData.workExperience]
                      newExp[index].description = e.target.value
                      setFormData({ ...formData, workExperience: newExp })
                    }}
                  />
                  {index > 0 && (
                    <Button
                      variant="ghost"
                      className="text-red-500 hover:text-red-600 hover:bg-transparent p-0 h-auto font-normal"
                      onClick={() => {
                        const newExp = [...formData.workExperience]
                        newExp.splice(index, 1)
                        setFormData({ ...formData, workExperience: newExp })
                      }}
                    >
                      🗑 Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="flex items-center gap-2 text-[15px] font-semibold text-gray-200">📚 Education</h3>
                <Button
                  size="sm"
                  className="bg-transparent hover:bg-[#2A2A2A] text-[#6366f1] gap-2 rounded-lg border border-[#6366f1]"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      education: [
                        ...formData.education,
                        {
                          institution: "",
                          degree: "",
                          year: "",
                        },
                      ],
                    })
                  }
                >
                  Add Education <Plus className="w-4 h-4" />
                </Button>
              </div>

              {formData.education.map((edu, index) => (
                <div key={index} className="space-y-4 pt-4">
                  <Input
                    placeholder="Enter school/university name"
                    className="bg-[#2A2A2A] border-none h-11 rounded-lg text-gray-300 placeholder:text-gray-500"
                    value={edu.institution}
                    onChange={(e) => {
                      const newEdu = [...formData.education]
                      newEdu[index].institution = e.target.value
                      setFormData({ ...formData, education: newEdu })
                    }}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Enter degree/certification"
                      className="bg-[#2A2A2A] border-none h-11 rounded-lg text-gray-300 placeholder:text-gray-500"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEdu = [...formData.education]
                        newEdu[index].degree = e.target.value
                        setFormData({ ...formData, education: newEdu })
                      }}
                    />
                    <Input
                      placeholder="Year of completion"
                      className="bg-[#2A2A2A] border-none h-11 rounded-lg text-gray-300 placeholder:text-gray-500"
                      value={edu.year}
                      onChange={(e) => {
                        const newEdu = [...formData.education]
                        newEdu[index].year = e.target.value
                        setFormData({ ...formData, education: newEdu })
                      }}
                    />
                  </div>
                  {index > 0 && (
                    <Button
                      variant="ghost"
                      className="text-red-500 hover:text-red-600 hover:bg-transparent p-0 h-auto font-normal"
                      onClick={() => {
                        const newEdu = [...formData.education]
                        newEdu.splice(index, 1)
                        setFormData({ ...formData, education: newEdu })
                      }}
                    >
                      🗑 Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="flex items-center gap-2 text-[15px] font-semibold text-gray-200">👨‍💻 Skills</h3>
                <Button
                  size="sm"
                  className="bg-transparent hover:bg-[#2A2A2A] text-[#6366f1] gap-2 rounded-lg border border-[#6366f1]"
                  onClick={() => {
                    const newSkill = document.getElementById("skillInput").value
                    if (newSkill) {
                      setFormData({
                        ...formData,
                        skills: [...formData.skills, newSkill],
                      })
                      document.getElementById("skillInput").value = ""
                    }
                  }}
                >
                  Add Skill <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Input
                id="skillInput"
                placeholder="Add your skills (e.g. Project Management, JavaScript, Communication)"
                className="bg-[#2A2A2A] border-none h-11 rounded-lg text-gray-300 placeholder:text-gray-500"
              />
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-[#6366f1]/20 text-[#6366f1] px-4 py-1.5 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => {
                        const newSkills = [...formData.skills]
                        newSkills.splice(index, 1)
                        setFormData({ ...formData, skills: newSkills })
                      }}
                      className="text-[#6366f1] hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="w-[400px]">
            <div className="bg-[#1A1A1A] rounded-xl p-6 sticky top-6">
              <h3 className="text-[15px] font-semibold mb-4 text-gray-200">Preview</h3>
              {pdfPreview ? (
                <iframe src={pdfPreview} className="w-full h-[500px] mb-4 rounded-lg" />
              ) : (
                <div className="bg-[#2A2A2A] rounded-lg aspect-[1/1.4] mb-4 flex items-center justify-center text-gray-500">
                  Resume Preview
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  className="flex-1 gap-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white"
                  onClick={generateResume}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" /> Generate Preview
                    </>
                  )}
                </Button>
                <Button
                  className="flex-1 gap-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white"
                  onClick={downloadPdf}
                  disabled={!pdfPreview || isGenerating}
                >
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

