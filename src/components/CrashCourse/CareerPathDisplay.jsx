import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { FileText, Link, Code, BookOpen, ExternalLink, Globe, Youtube } from "lucide-react"

export default function CareerPathDisplay({ careerPath }) {
  return (
    <ScrollArea className="h-[70vh] pr-4">
      <Accordion type="single" collapsible className="w-full">
        {careerPath.map((stage, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#4F46E5]">
            <AccordionTrigger className="text-lg font-semibold hover:bg-[#4F46E5]/20 transition-colors duration-200">
              <div className="flex items-center">
                <FileText className="mr-2 text-[#57FF31]" />
                Stage {index + 1}: {stage.title}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-4 text-gray-300">{stage.description}</p>
              <StageSection title="Key Skills" icon={Link} items={stage.skills} />
              <StageSection title="Recommended Actions" icon={Code} items={stage.actions} />
              <StageSection title="Milestones" icon={BookOpen} items={stage.milestones} />
              <ResourcesSection resources={stage.resources} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  )
}

function StageSection({ title, icon: Icon, items }) {
  return (
    <>
      <h3 className="font-semibold mb-2 flex items-center text-[#57FF31]">
        <Icon className="mr-2" />
        {title}:
      </h3>
      <ul className="list-disc pl-6 mb-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-300">
            <Badge variant="secondary" className="mr-2 bg-[#4F46E5] text-white">
              {index + 1}
            </Badge>
            {item}
          </li>
        ))}
      </ul>
    </>
  )
}

function ResourcesSection({ resources }) {
  return (
    <>
      <h3 className="font-semibold mb-2 flex items-center text-[#57FF31]">
        <ExternalLink className="mr-2" />
        Resources:
      </h3>
      <ul className="list-none pl-0">
        {resources.map((resource, index) => (
          <li key={index} className="mb-2">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4F46E5] hover:text-[#57FF31] hover:underline flex items-center"
            >
              {resource.url.includes("youtube.com") ? (
                <Youtube className="mr-2 text-red-500" />
              ) : (
                <Globe className="mr-2 text-[#57FF31]" />
              )}
              {resource.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

