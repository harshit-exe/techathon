import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Youtube, Book } from "lucide-react"

export default function ResourceLibrary({ careerPath }) {
  const allResources = careerPath.flatMap((stage) => stage.resources)

  const categorizeResource = (url) => {
    if (url.includes("youtube.com")) return "Video"
    if (url.includes("coursera.org") || url.includes("udemy.com")) return "Course"
    if (url.includes("github.com")) return "Code"
    return "Article"
  }

  return (
    <Card className="bg-black/50 backdrop-blur-md border border-white rounded-xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Resource Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allResources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center mb-2">
                {resource.url.includes("youtube.com") ? (
                  <Youtube className="w-5 h-5 mr-2 text-red-500" />
                ) : (
                  <Book className="w-5 h-5 mr-2 text-[#57FF31]" />
                )}
                <h3 className="text-lg font-semibold text-white truncate">{resource.title}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-2 truncate">{resource.url}</p>
              <Badge variant="secondary" className="bg-[#4F46E5] text-white">
                {categorizeResource(resource.url)}
              </Badge>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

