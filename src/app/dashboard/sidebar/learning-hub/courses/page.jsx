import Link from "next/link"
import { Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function PremiumCourses() {
  const courses = [
    {
      id: "web-development",
      title: "Web Development Tutorials",
      description: "Welcome to the Sigma Web Development Course - Web Development Tutorials in Hindi providing...",
      videoUrl: "https://www.youtube.com/embed/ESnrn1kAD4E",
      level: "Beginner",
      rating: 4.9,
      hours: 23,
      lessons: 10,
      students: 20000,
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: "generative-ai",
      title: "Generative AI Series",
      description:
        "An exciting YouTube playlist that takes you through the fascinating world of generative artificial...",
      videoUrl: "https://www.youtube.com/embed/jGwO_UgTS7I",
      level: "Intermediate",
      rating: 4.5,
      hours: 8,
      lessons: 5,
      students: 150000,
      tags: ["CHAT GPT", "Open AI", "Generative AI"],
    },
    {
      id: "flutter-dev",
      title: "Flutter Development Bootcamp",
      description:
        "Get started with Flutter development with this comprehensive bootcamp, covering all essential topics...",
      videoUrl: "https://www.youtube.com/embed/CD1Y2DmL5JM",
      level: "Beginner",
      rating: 4.7,
      hours: 30,
      lessons: 5,
      students: 58000,
      tags: ["Flutter"],
    },
    {
      id: "cyber-security",
      title: "Introduction to Cyber Security",
      description: "A comprehensive introduction to cyber security concepts and practices.",
      videoUrl: "https://www.youtube.com/embed/nzZkKoREEGo",
      level: "Intermediate",
      rating: 4.6,
      hours: 20,
      lessons: 5,
      students: 75000,
      tags: ["Cyber Security"],
    },
    {
      id: "game-dev",
      title: "Game Development with Unity",
      description: "Dive into game development with Unity, from beginner to advanced concepts.",
      videoUrl: "https://www.youtube.com/embed/XtQMytORBmM",
      level: "Advanced",
      rating: 4.4,
      hours: 40,
      lessons: 5,
      students: 62000,
      tags: ["Unity", "Game Development"],
    },
    {
      id: "android-developer",
      title: "App development with Android",
      description:
        "An exciting YouTube playlist that takes you through the fascinating world of generative artificial...",
      videoUrl: "https://www.youtube.com/embed/jGwO_UgTS7I",
      level: "Intermediate",
      rating: 4.5,
      hours: 8,
      lessons: 5,
      students: 150000,
      tags: ["CHAT GPT", "Open AI", "Generative AI"],
    },
  ]

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-emerald-500/10 text-emerald-500"
      case "intermediate":
        return "bg-orange-500/10 text-orange-500"
      case "advanced":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-primary/10 text-primary"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 p-4 flex flex-col">
            <div className="relative mb-4 rounded-lg overflow-hidden aspect-video">
              <iframe
                src={course.videoUrl}
                title={course.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              />
            </div>
            <div className="space-y-4 flex-1">
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p className="text-gray-400 text-sm line-clamp-2">{course.description}</p>
              <div className="flex items-center justify-between">
                <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(course.rating)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{course.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div>{course.hours} hours</div>
                <div>{course.lessons} lessons</div>
                <div>{course.students.toLocaleString()} students</div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {course.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="bg-gray-800 text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Link href={`/courses/${course.id}`} className="mt-4 w-full">
              <Button className="w-full" variant="secondary">
                Start Now
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

