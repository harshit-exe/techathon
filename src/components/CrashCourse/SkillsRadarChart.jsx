import { Radar } from "react-chartjs-2"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js"

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function SkillsRadarChart({ careerPath }) {
  const allSkills = careerPath.flatMap((stage) => stage.skills)
  const uniqueSkills = [...new Set(allSkills)]
  const skillCounts = uniqueSkills.map((skill) => allSkills.filter((s) => s === skill).length)

  const data = {
    labels: uniqueSkills,
    datasets: [
      {
        label: "Skill Importance",
        data: skillCounts,
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderColor: "rgba(79, 70, 229, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: Math.max(...skillCounts),
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className="w-full h-[600px] flex items-center justify-center">
      <Radar data={data} options={options} />
    </div>
  )
}

