import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}

export async function POST(req) {
  try {
    const formData = await req.json()
    
    // Generate PDF
    const pdfBuffer = await generateResumePDF(formData)
    
    // Return the PDF as a base64 encoded string
    return NextResponse.json({ 
      pdf: pdfBuffer.toString('base64'),
      message: 'Resume generated successfully' 
    })
  } catch (error) {
    console.error('Error generating resume:', error)
    return NextResponse.json({ error: 'Failed to generate resume' }, { status: 500 })
  }
}

async function generateResumePDF(data) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' })
    const chunks = []

    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))

    // Helper function for consistent section styling
    const addSection = (title) => {
      doc.fontSize(16).font('Helvetica-Bold').text(title, { underline: true })
      doc.moveDown(0.5)
    }

    // Header
    doc.fontSize(24).font('Helvetica-Bold').text(data.personalInfo.fullName, { align: 'center' })
    doc.fontSize(12).font('Helvetica').text(data.personalInfo.email, { align: 'center' })
    doc.text(data.personalInfo.phone, { align: 'center' })
    doc.text(data.personalInfo.location, { align: 'center' })
    doc.moveDown(1)

    // Professional Summary
    addSection('Professional Summary')
    doc.fontSize(12).font('Helvetica').text(data.professionalSummary, { align: 'justify' })
    doc.moveDown(1)

    // Work Experience
    addSection('Work Experience')
    data.workExperience.forEach((exp, index) => {
      doc.fontSize(14).font('Helvetica-Bold').text(exp.position)
      doc.fontSize(12).font('Helvetica-Oblique').text(`${exp.company} | ${exp.startDate} - ${exp.endDate}`)
      doc.fontSize(12).font('Helvetica').text(exp.description, { align: 'justify' })
      if (index < data.workExperience.length - 1) doc.moveDown(0.5)
    })
    doc.moveDown(1)

    // Education
    addSection('Education')
    data.education.forEach((edu, index) => {
      doc.fontSize(14).font('Helvetica-Bold').text(edu.degree)
      doc.fontSize(12).font('Helvetica').text(`${edu.institution}, ${edu.year}`)
      if (index < data.education.length - 1) doc.moveDown(0.5)
    })
    doc.moveDown(1)

    // Skills
    addSection('Skills')
    const skillsPerRow = 3
    for (let i = 0; i < data.skills.length; i += skillsPerRow) {
      const rowSkills = data.skills.slice(i, i + skillsPerRow)
      doc.fontSize(12).font('Helvetica').text(rowSkills.join(' | '), { align: 'left' })
    }

    // Footer with page number
    const pages = doc.bufferedPageRange()
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i)
      doc.fontSize(10).font('Helvetica')
        .text(
          `Page ${i + 1} of ${pages.count}`,
          0.5 * (doc.page.width - 100),
          doc.page.height - 50,
          {
            width: 100,
            align: 'center',
            lineBreak: false,
          }
        )
    }

    doc.end()
  })
}
