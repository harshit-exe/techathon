import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"

export function QuestionAnswer({
  currentQuestion,
  userAnswer,
  isAnswering,
  transcript,
  isSpeaking,
  feedback,
  startAnswering,
  stopAnswering,
  handleStopSpeaking,
  speakWithTracking,
  useAIVoice,
  nextQuestion,
}) {
  return (
    <Card className="bg-gray-900 text-white">
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-[#6366F1]">Current Question:</h2>
          <p className="text-lg text-gray-300">{currentQuestion}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-[#6366F1]">Your Answer:</h3>
          <p className="italic text-gray-400">{isAnswering ? transcript : userAnswer}</p>
        </div>
        <div className="flex gap-4 mb-6">
          {!isAnswering ? (
            <Button onClick={startAnswering} className="bg-[#57FF31] hover:bg-[#45CC27] text-black">
              <Mic className="mr-2 h-4 w-4" /> Start Answering
            </Button>
          ) : (
            <Button onClick={stopAnswering} className="bg-yellow-600 hover:bg-yellow-700 text-white">
              <MicOff className="mr-2 h-4 w-4" /> Stop Answering
            </Button>
          )}
          {isSpeaking ? (
            <Button onClick={handleStopSpeaking} variant="outline" className="border-[#6366F1] text-[#6366F1]">
              <VolumeX className="mr-2 h-4 w-4" /> Stop AI Voice
            </Button>
          ) : (
            <Button
              onClick={() => speakWithTracking(currentQuestion)}
              variant="outline"
              disabled={!useAIVoice}
              className="border-[#6366F1] text-[#6366F1]"
            >
              <Volume2 className="mr-2 h-4 w-4" /> Repeat Question
            </Button>
          )}
        </div>
        {feedback && (
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2 text-[#6366F1]">Feedback:</h3>
            <p className="text-gray-300">{feedback}</p>
          </div>
        )}
        <Button onClick={nextQuestion} className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white">
          Next Question
        </Button>
      </CardContent>
    </Card>
  )
}

