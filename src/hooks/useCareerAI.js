"use client"

import { useState } from "react"

const GROQ_API_KEY = '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'
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

export function useCareerAI() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
  
    const generateQuestions = async (count = 5) => {
      setIsLoading(true)
      setError(null)
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
                content: "You are an AI assistant that creates engaging career assessment questions for Gen Z users.",
              },
              {
                role: "user",
                content: `Generate ${count} unique, engaging questions about tech careers. Each question should have two contrasting options. Make them fun and relevant to Gen Z interests. Provide the response as a JSON array of objects, each with 'question', 'leftOption', 'rightOption', and 'imagePrompt' fields.`,
              },
            ],
            max_tokens: 1000,
            temperature: 0.7,
          }),
        })
  
        if (!response.ok) {
          throw new Error(`Failed to generate questions with Groq AI: ${response.status} ${response.statusText}`)
        }
  
        const data = await response.json()
        const content = data.choices[0].message.content
  
        // Attempt to parse the JSON response
        let questions
        try {
          questions = JSON.parse(content)
        } catch (parseError) {
          console.error("Error parsing Groq AI response:", parseError)
          console.log("Raw response:", content)
          // Attempt to extract JSON array from the response
          const match = content.match(/\[[\s\S]*\]/)
          if (match) {
            questions = JSON.parse(match[0])
          } else {
            throw new Error("Failed to parse questions from Groq AI response")
          }
        }
  
        if (!Array.isArray(questions)) {
          throw new Error("Groq AI response is not an array of questions")
        }
  
        return questions
      } catch (error) {
        console.error("Error generating questions with Groq AI:", error)
        setError(error.message || "Failed to generate questions. Please try again later.")
        return []
      } finally {
        setIsLoading(false)
      }
    }
  
    return { generateQuestions, isLoading, error }
  }
  