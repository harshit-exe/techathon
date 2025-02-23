import { NextResponse } from "next/server"
import jsPDF from "jspdf"

export async function POST(req) {
  try {
    const formData = await req.json()

    // Generate PDF
    const pdfBuffer = await generateResumePDF(formData)

    // Return the PDF as a base64 encoded string
    return NextResponse.json({
      pdf: pdfBuffer.toString("base64"),
      message: "Resume generated successfully",
    })
  } catch (error) {
    console.error("Error generating resume:", error)
    return NextResponse.json({ error: "Failed to generate resume" }, { status: 500 })
  }
}

async function generateResumePDF(data) {
  const doc = new jsPDF()

  // Helper functions
  const addSection = (title, y) => {
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text(title.toUpperCase(), 20, y)
    return y + 10
  }

  const addSubSection = (title, y) => {
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text(title, 20, y)
    return y + 7
  }

  let y = 20

  // Header
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.text(data.personalInfo.fullName, 105, y, { align: "center" })
  y += 10
  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text(data.personalInfo.email, 105, y, { align: "center" })
  y += 7
  doc.text(data.personalInfo.phone, 105, y, { align: "center" })
  y += 7
  doc.text(data.personalInfo.location, 105, y, { align: "center" })
  y += 15

  // Professional Summary
  y = addSection("Professional Summary", y)
  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  const summaryLines = doc.splitTextToSize(data.professionalSummary, 170)
  doc.text(summaryLines, 20, y)
  y += summaryLines.length * 7 + 10

  // Work Experience
  y = addSection("Work Experience", y)
  data.workExperience.forEach((exp) => {
    y = addSubSection(exp.position, y)
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`${exp.company} | ${exp.startDate} - ${exp.endDate}`, 20, y)
    y += 7
    const descLines = doc.splitTextToSize(exp.description, 170)
    doc.text(descLines, 20, y)
    y += descLines.length * 7 + 10
  })

  // Education
  y = addSection("Education", y)
  data.education.forEach((edu) => {
    y = addSubSection(edu.degree, y)
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`${edu.institution}, ${edu.year}`, 20, y)
    y += 10
  })

  // Skills
  y = addSection("Skills", y)
  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  const skillsText = data.skills.join(", ")
  const skillsLines = doc.splitTextToSize(skillsText, 170)
  doc.text(skillsLines, 20, y)

  // Convert the PDF to a buffer
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"))
  return pdfBuffer
}

