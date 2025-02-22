import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function BehaviorTracker({ behaviorData }) {
  const latestBehavior = behaviorData[behaviorData.length - 1] || {}

  const calculateOverallEngagement = () => {
    if (behaviorData.length === 0) return 0
    const engagementCount = behaviorData.filter((data) => data.engagement === "High").length
    return (engagementCount / behaviorData.length) * 100
  }

  const calculateOverallAttentiveness = () => {
    if (behaviorData.length === 0) return 0
    const attentivenessCount = behaviorData.filter((data) => data.attentiveness === "High").length
    return (attentivenessCount / behaviorData.length) * 100
  }

  return (
    <Card className="bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-[#6366F1]">Behavior Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-1">Current Engagement</h3>
            <div className="text-lg font-semibold text-[#57FF31]">{latestBehavior.engagement || "N/A"}</div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-1">Current Attentiveness</h3>
            <div className="text-lg font-semibold text-[#57FF31]">{latestBehavior.attentiveness || "N/A"}</div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-1">Overall Engagement</h3>
            <Progress
              value={calculateOverallEngagement()}
              className="w-full bg-gray-700"
              indicatorColor="bg-[#57FF31]"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-1">Overall Attentiveness</h3>
            <Progress
              value={calculateOverallAttentiveness()}
              className="w-full bg-gray-700"
              indicatorColor="bg-[#57FF31]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

