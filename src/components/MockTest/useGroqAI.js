"use client"

import { useState } from "react"

const GROQ_API_KEY = "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"
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

export function useGroqAI() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateQuestions = async (topic, count = 5) => {
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
              content: `You are an AI that generates multiple-choice questions for career skills practice. Focus on creating questions that test and improve knowledge and skills related to ${topic} in a professional context. Each question should have 4 options with one correct answer.`,
            },
            {
              role: "user",
              content: `Generate ${count} multiple-choice questions about ${topic} in a professional setting. Provide the questions as a JSON array of objects, where each object has the following structure: { question: string, options: string[], correctAnswer: string }`,
            },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to generate questions: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      const content = data.choices[0].message.content
      const questionsJson = JSON.parse(content)

      if (!Array.isArray(questionsJson)) {
        throw new Error("AI response is not an array of questions")
      }

      return questionsJson
    } catch (error) {
      console.error("Error generating questions:", error)
      setError(error.message || "Failed to generate questions. Please try again later.")
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const generateCareerPath = async (topic) => {
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
              content: `You are an AI career advisor that generates career paths and skill progressions.`,
            },
            {
              role: "user",
              content: `Generate a career path for someone interested in ${topic}. Provide a JSON array of 5 skills or milestones, where each object has the following structure: { name: string, description: string }`,
            },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to generate career path: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      const content = data.choices[0].message.content
      const careerPathJson = JSON.parse(content)

      if (!Array.isArray(careerPathJson)) {
        throw new Error("AI response is not an array of career path steps")
      }

      return careerPathJson
    } catch (error) {
      console.error("Error generating career path:", error)
      setError(error.message || "Failed to generate career path. Please try again later.")
      return []
    } finally {
      setIsLoading(false)
    }
  }

  return { generateQuestions, generateCareerPath, isLoading, error }
}

