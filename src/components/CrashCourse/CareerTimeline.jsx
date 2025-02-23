import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"
import { Briefcase } from "lucide-react"

export default function CareerTimeline({ careerPath }) {
  return (
    <VerticalTimeline>
      {careerPath.map((stage, index) => (
        <VerticalTimelineElement
          key={index}
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "white" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          date={`Stage ${index + 1}`}
          iconStyle={{ background: "rgb(33, 150, 243)", color: "white" }}
          icon={<Briefcase />}
        >
          <h3 className="vertical-timeline-element-title text-white">{stage.title}</h3>
          <p>{stage.description}</p>
          <ul className="mt-2">
            {stage.milestones.map((milestone, mIndex) => (
              <li key={mIndex} className="text-sm text-white">
                {milestone}
              </li>
            ))}
          </ul>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  )
}

