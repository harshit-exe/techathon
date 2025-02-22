
import { NextResponse } from "next/server"
import PDFDocument from "pdfkit"

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
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 50, size: "A4" })
    const chunks = []

    doc.on("data", (chunk) => chunks.push(chunk))
    doc.on("end", () => resolve(Buffer.concat(chunks)))

    // Helper functions
    const addSection = (title) => {
      doc.fillColor("#333333").fontSize(16).font("Helvetica-Bold").text(title.toUpperCase())
      doc.moveDown(0.5)
    }

    const addSubSection = (title) => {
      doc.fillColor("#555555").fontSize(14).font("Helvetica-Bold").text(title)
      doc.moveDown(0.3)
    }

    // Set background color
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f4f4f4")

    // Header
    doc.fillColor("#333333").fontSize(28).font("Helvetica-Bold").text(data.personalInfo.fullName, { align: "center" })
    doc.moveDown(0.3)
    doc.fillColor("#555555").fontSize(14).font("Helvetica").text(data.personalInfo.email, { align: "center" })
    doc.moveDown(0.1)
    doc.text(data.personalInfo.phone, { align: "center" })
    doc.moveDown(0.1)
    doc.text(data.personalInfo.location, { align: "center" })
    doc.moveDown(1)

    // Horizontal line
    doc
      .moveTo(50, doc.y)
      .lineTo(doc.page.width - 50, doc.y)
      .stroke("#cccccc")
    doc.moveDown(1)

    // Professional Summary
    addSection("Professional Summary")
    doc.fillColor("#333333").fontSize(12).font("Helvetica").text(data.professionalSummary, { align: "justify" })
    doc.moveDown(1)

    // Work Experience
    addSection("Work Experience")
    data.workExperience.forEach((exp, index) => {
      addSubSection(exp.position)
      doc
        .fillColor("#555555")
        .fontSize(12)
        .font("Helvetica-Oblique")
        .text(`${exp.company} | ${exp.startDate} - ${exp.endDate}`)
      doc.moveDown(0.3)
      doc.fillColor("#333333").fontSize(12).font("Helvetica").text(exp.description, { align: "justify" })
      if (index < data.workExperience.length - 1) doc.moveDown(0.5)
    })
    doc.moveDown(1)

    // Education
    addSection("Education")
    data.education.forEach((edu, index) => {
      addSubSection(edu.degree)
      doc.fillColor("#555555").fontSize(12).font("Helvetica").text(`${edu.institution}, ${edu.year}`)
      if (index < data.education.length - 1) doc.moveDown(0.5)
    })
    doc.moveDown(1)

    // Skills
    addSection("Skills")
    const skillsPerRow = 3
    const skillBoxWidth = (doc.page.width - 100) / skillsPerRow
    const skillBoxHeight = 30
    let currentX = 50
    let currentY = doc.y

    data.skills.forEach((skill, index) => {
      doc.rect(currentX, currentY, skillBoxWidth - 10, skillBoxHeight).fill("#e6e6e6")
      doc
        .fillColor("#333333")
        .fontSize(12)
        .font("Helvetica")
        .text(skill, currentX + 5, currentY + 8, { width: skillBoxWidth - 20, align: "center" })

      currentX += skillBoxWidth
      if ((index + 1) % skillsPerRow === 0) {
        currentX = 50
        currentY += skillBoxHeight + 10
      }
    })

    // Footer with page number
    const pages = doc.bufferedPageRange()
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i)
      doc
        .fillColor("#999999")
        .fontSize(10)
        .font("Helvetica")
        .text(`Page ${i + 1} of ${pages.count}`, 0.5 * (doc.page.width - 100), doc.page.height - 50, {
          width: 100,
          align: "center",
          lineBreak: false,
        })
    }

    doc.end()
  })
}

