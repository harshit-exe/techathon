import { NextResponse } from "next/server"

const GROQ_API_KEY = "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"
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

export async function POST(request) {
  const { message, careerPath, scrapedData } = await request.json()

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: `You are an AI career advisor that helps users understand their career path and provides guidance based on the generated career path and scraped job information. Use the provided career path structure and scraped data to answer questions accurately and concisely.

Career Path: ${JSON.stringify(careerPath)}
Scraped Data: ${JSON.stringify(scrapedData)}

Provide helpful and specific advice based on the user's current stage in their career journey. Reference relevant skills, actions, and resources from the career path when appropriate.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to get response from Groq AI: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    return NextResponse.json({ message: aiResponse })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}

