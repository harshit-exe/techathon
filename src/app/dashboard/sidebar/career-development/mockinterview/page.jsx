"use client"
import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AlertCircle, Maximize, Minimize } from "lucide-react"
import { useGroqAI } from "@/components/Interview/useGroqAI"
import { useVoiceInput } from "@/components/Interview/useVoiceInput"
import { useTextToSpeech } from "@/components/Interview/useTextToSpeech"
import { QuestionAnswer } from "@/components/Interview/QuestionAnswer"
import { BehaviorTracker } from "@/components/Interview/BehaviorTracker"
import { FaceDetection } from "@/components/Interview/FaceDetection"

const defaultCareerPaths = [
  { value: "software-engineering", label: "Software Engineering" },
  { value: "data-science", label: "Data Science" },
  { value: "ux-design", label: "UX Design" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "cybersecurity", label: "Cybersecurity" },
]

const educationLevels = [
  { value: "high-school", label: "High School" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "graduate", label: "Graduate" },
]

export default function CareerGuidanceInterviewSimulator() {
  const [careerPaths, setCareerPaths] = useState(defaultCareerPaths)
  const [selectedCareerPath, setSelectedCareerPath] = useState("")
  const [educationLevel, setEducationLevel] = useState("undergraduate")
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isInterviewStarted, setIsInterviewStarted] = useState(false)
  const [isAnswering, setIsAnswering] = useState(false)
  const [behaviorData, setBehaviorData] = useState([])
  const [error, setError] = useState(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [useAIVoice, setUseAIVoice] = useState(true)
  const [interviewDuration, setInterviewDuration] = useState(15)
  const [timeRemaining, setTimeRemaining] = useState(15 * 60)
  const [showTimer, setShowTimer] = useState(true)
  const [careerFitScore, setCareerFitScore] = useState(0)
  const [questionCount, setQuestionCount] = useState(0)
  const [overallPerformance, setOverallPerformance] = useState(0)
  const [newCareerPath, setNewCareerPath] = useState("")
  const [isIntroduction, setIsIntroduction] = useState(true)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [interviewHistory, setInterviewHistory] = useState([])
  const [currentTab, setCurrentTab] = useState("interview")
  const [faceDetectionWarning, setFaceDetectionWarning] = useState(null)

  const { generateQuestion, evaluateAnswer, isLoading, error: aiError } = useGroqAI()
  const { startListening, stopListening, resetTranscript, transcript, isListening, error: voiceError } = useVoiceInput()
  const { speak, stop: stopSpeaking } = useTextToSpeech()

  const speakWithTracking = useCallback(
    (text) => {
      setIsSpeaking(true)
      speak(text)
    },
    [speak],
  )

  const startInterview = useCallback(async () => {
    if (!selectedCareerPath) return
    setIsInterviewStarted(true)
    setError(null)
    setTimeRemaining(interviewDuration * 60)
    setQuestionCount(0)
    setOverallPerformance(0)
    setIsIntroduction(true)
    setInterviewHistory([])
    try {
      const introQuestion = `Welcome to your personalized career guidance session for ${selectedCareerPath}. To start, could you tell me about your background, interests, and why you're considering this career path?`
      setCurrentQuestion(introQuestion)
      setQuestionCount((prev) => prev + 1)
      if (useAIVoice) speakWithTracking(introQuestion)
    } catch (err) {
      setError("Failed to start the career guidance session. Please try again.")
      setIsInterviewStarted(false)
    }
  }, [selectedCareerPath, interviewDuration, useAIVoice, speakWithTracking])

  const startAnswering = useCallback(() => {
    setIsAnswering(true)
    setError(null)
    resetTranscript()
    startListening()
  }, [startListening, resetTranscript])

  const stopAnswering = useCallback(async () => {
    setIsAnswering(false)
    stopListening()
    setUserAnswer(transcript)
    try {
      const evaluation = await evaluateAnswer(currentQuestion, transcript)
      setFeedback(evaluation)
      if (useAIVoice) speakWithTracking(evaluation)

      const score = extractCareerFitScore(evaluation)
      setCareerFitScore(score)
      setOverallPerformance((prev) => (prev * (questionCount - 1) + score) / questionCount)

      setInterviewHistory((prev) => [
        ...prev,
        {
          question: currentQuestion,
          answer: transcript,
          feedback: evaluation,
          score: score,
        },
      ])
    } catch (err) {
      setError("Failed to evaluate the answer. Please try again.")
    }
  }, [stopListening, transcript, currentQuestion, evaluateAnswer, useAIVoice, questionCount, speakWithTracking])

  const nextQuestion = useCallback(async () => {
    setError(null)
    try {
      if (isIntroduction) {
        setIsIntroduction(false)
      }
      const question = await generateQuestion(selectedCareerPath)
      setCurrentQuestion(question)
      setQuestionCount((prev) => prev + 1)
      if (useAIVoice) speakWithTracking(question)
      setUserAnswer("")
      setFeedback("")
      setCareerFitScore(0)
    } catch (err) {
      setError("Failed to generate the next question. Please try again.")
    }
  }, [selectedCareerPath, generateQuestion, useAIVoice, isIntroduction, speakWithTracking])

  const handleStopSpeaking = useCallback(() => {
    stopSpeaking()
    setIsSpeaking(false)
  }, [stopSpeaking])

  const handleBehaviorUpdate = useCallback((newBehavior) => {
    setBehaviorData((prevData) => [...prevData, newBehavior])
  }, [])

  const handleFaceDetectionWarning = useCallback((warning) => {
    setFaceDetectionWarning(warning)
  }, [])

  const stopInterview = useCallback(() => {
    setIsInterviewStarted(false)
    setCurrentQuestion("")
    setUserAnswer("")
    setFeedback("")
    handleStopSpeaking()
    stopListening()
    exitFullScreen()
  }, [stopListening, handleStopSpeaking])

  const addNewCareerPath = useCallback(() => {
    if (newCareerPath.trim() !== "") {
      setCareerPaths((prev) => [
        ...prev,
        { value: newCareerPath.toLowerCase().replace(/\s+/g, "-"), label: newCareerPath },
      ])
      setNewCareerPath("")
    }
  }, [newCareerPath])

  const toggleFullScreen = useCallback(() => {
    if (!isFullScreen) {
      enterFullScreen()
    } else {
      exitFullScreen()
    }
  }, [isFullScreen])

  const enterFullScreen = useCallback(() => {
    const element = document.documentElement
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
    setIsFullScreen(true)
  }, [])

  const exitFullScreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
    setIsFullScreen(false)
  }, [])

  useEffect(() => {
    if (aiError) setError(aiError)
    if (voiceError) setError(voiceError)
  }, [aiError, voiceError])

  useEffect(() => {
    let timer
    if (isInterviewStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      stopInterview()
    }
    return () => clearInterval(timer)
  }, [isInterviewStarted, timeRemaining, stopInterview])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isInterviewStarted && document.hidden) {
        setShowWarning(true)
      }
    }

    const handleBeforeUnload = (e) => {
      if (isInterviewStarted) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isInterviewStarted])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const extractCareerFitScore = (evaluation) => {
    // This is a placeholder function. In a real application, you would
    // implement logic to extract a numerical career fit score from the
    // AI's evaluation text.
    return Math.random() * 100 // Placeholder: returns a random score between 0 and 100
  }

  return (
    <div
      className={`min-h-screen min-w-screen bg-black bg-contain text-white p-4 ${isFullScreen ? "fixed inset-0 z-50" : ""}`}
    >
          <h1 className="text-3xl font-poppins text-[#ffffff] text-center">AI Career Guidance Assistant</h1>
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          {isInterviewStarted && (
            <div className="flex items-center space-x-4">
              {showTimer && <div className="text-xl font-bold text-[#f72b2b]">Time: {formatTime(timeRemaining)}</div>}
              <Button variant="outline" onClick={toggleFullScreen} className="bg-gray-800 hover:bg-gray-700">
                {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
              <Button variant="destructive" onClick={stopInterview} className="bg-red-600 hover:bg-red-700">
                End Session
              </Button>
            </div>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4 bg-red-900 text-white">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {showWarning && (
          <Alert variant="warning" className="mb-4 bg-yellow-900 text-white">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              You've switched tabs or left the session. Please stay focused on your career guidance.
            </AlertDescription>
          </Alert>
        )}

        {faceDetectionWarning && (
          <Alert variant="warning" className="mb-4 bg-yellow-900 text-white">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Face Detection Warning</AlertTitle>
            <AlertDescription>{faceDetectionWarning}</AlertDescription>
          </Alert>
        )}

        {!isInterviewStarted ? (
          <Card className="max-w-2xl mx-auto bg-gray-800 text-white border-[#34daff] border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center text-[#70c6ff]">
                Explore Your Career Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-8 text-center">
                Get personalized career guidance with AI-powered insights and real-time feedback
              </p>
              <div className="flex flex-col items-center gap-4">
                <Select onValueChange={setSelectedCareerPath}>
                  <SelectTrigger className="w-full bg-gray-700 text-white border-[#6366F1]">
                    <SelectValue placeholder="Choose career path" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white">
                    {careerPaths.map((path) => (
                      <SelectItem key={path.value} value={path.value}>
                        {path.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Add new career path"
                    value={newCareerPath}
                    onChange={(e) => setNewCareerPath(e.target.value)}
                    className="bg-gray-700 text-white border-[#6366F1]"
                  />
                  <Button onClick={addNewCareerPath} className="bg-[#2f2f62] hover:bg-[#4F46E5] text-white">
                    Add
                  </Button>
                </div>
                <Select value={educationLevel} onValueChange={setEducationLevel}>
                  <SelectTrigger className="w-full bg-gray-700 text-white border-[#6366F1]">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white">
                    {educationLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="w-full">
                  <Label htmlFor="session-duration" className="text-sm font-medium text-gray-300 mb-2">
                    Session Duration: {interviewDuration} minutes
                  </Label>
                  <Slider
                    id="session-duration"
                    min={5}
                    max={30}
                    step={5}
                    value={[interviewDuration]}
                    onValueChange={(value) => setInterviewDuration(value[0])}
                    className="bg-white "
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="ai-voice" checked={useAIVoice} onCheckedChange={setUseAIVoice} />
                  <Label htmlFor="ai-voice" className="text-sm font-medium text-gray-300">
                    Use AI Voice
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="show-timer" checked={showTimer} onCheckedChange={setShowTimer} />
                  <Label htmlFor="show-timer" className="text-sm font-medium text-gray-300">
                    Show Timer
                  </Label>
                </div>
                <Button
                  onClick={startInterview}
                  disabled={!selectedCareerPath || isLoading}
                  className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white"
                >
                  {isLoading ? "Preparing Session..." : "Start Career Guidance Session"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex-grow overflow-hidden">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="interview" className="text-white">
                  Guidance Session
                </TabsTrigger>
                <TabsTrigger value="history" className="text-white">
                  Session History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="interview" className="flex-grow overflow-auto">
                <div className="grid md:grid-cols-2 gap-4 h-full">
                  <div className="space-y-4">
                    <FaceDetection onBehaviorUpdate={handleBehaviorUpdate} onWarning={handleFaceDetectionWarning} />
                    <BehaviorTracker behaviorData={behaviorData} />
                  </div>
                  <div className="space-y-4">
                    <QuestionAnswer
                      currentQuestion={currentQuestion}
                      userAnswer={userAnswer}
                      isAnswering={isAnswering}
                      transcript={transcript}
                      isSpeaking={isSpeaking}
                      feedback={feedback}
                      startAnswering={startAnswering}
                      stopAnswering={stopAnswering}
                      handleStopSpeaking={handleStopSpeaking}
                      speakWithTracking={speakWithTracking}
                      useAIVoice={useAIVoice}
                      nextQuestion={nextQuestion}
                    />
                    <Card className="bg-gray-800 text-white border-[#6366F1] border-2">
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-2 text-[#6366F1]">Career Fit Metrics</h3>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Career Fit Score</span>
                              <span>{careerFitScore.toFixed(2)}%</span>
                            </div>
                            <Progress
                              value={careerFitScore}
                              className="w-full bg-gray-700"
                              indicatorColor="bg-[#57FF31]"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Overall Performance</span>
                              <span>{overallPerformance.toFixed(2)}%</span>
                            </div>
                            <Progress
                              value={overallPerformance}
                              className="w-full bg-gray-700"
                              indicatorColor="bg-[#57FF31]"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history" className="flex-grow overflow-auto">
                <Card className="bg-gray-800 text-white border-[#6366F1] border-2">
                  <CardContent className="p-4">
                    <h2 className="text-2xl font-semibold mb-4 text-[#6366F1]">Session History</h2>
                    {interviewHistory.map((item, index) => (
                      <div key={index} className="mb-4 p-4 bg-gray-700 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2 text-[#6366F1]">Question {index + 1}:</h3>
                        <p className="text-gray-300 mb-2">{item.question}</p>
                        <h4 className="text-md font-semibold mb-1 text-[#57FF31]">Your Answer:</h4>
                        <p className="text-gray-400 mb-2">{item.answer}</p>
                        <h4 className="text-md font-semibold mb-1 text-[#57FF31]">Feedback:</h4>
                        <p className="text-gray-400 mb-2">{item.feedback}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-300">Career Fit Score:</span>
                          <span className="text-sm font-bold text-[#57FF31]">{item.score.toFixed(2)}%</span>
                        </div>
                        <Progress
                          value={item.score}
                          className="w-full mt-1 bg-gray-700"
                          indicatorColor="bg-[#57FF31]"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}

