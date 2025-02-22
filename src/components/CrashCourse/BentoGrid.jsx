import { Card, CardContent } from "@/components/ui/card"
import { Zap, Brain, Rocket } from "lucide-react"

export default function BentoGrid() {
  const features = [
    {
      icon: Zap,
      title: "Quick Career Planning",
      description: "Generate personalized career paths in seconds!",
      color: "text-[#57FF31]",
    },
    {
      icon: Brain,
      title: "AI-Powered Guidance",
      description: "Leverage AI to create tailored career advice.",
      color: "text-[#4F46E5]",
    },
    {
      icon: Rocket,
      title: "Boost Your Career",
      description: "Accelerate your professional growth with AI insights.",
      color: "text-[#57FF31]",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="bg-black/90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-[#4F46E5]"
        >
          <CardContent className="p-6 flex flex-col items-center">
            <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
            <h2 className="text-2xl font-bold mb-2 text-white">{feature.title}</h2>
            <p className="text-center text-gray-300">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

