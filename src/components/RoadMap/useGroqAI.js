"use client"

import { useState, useCallback } from "react"

const GROQ_API_KEY ="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"
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

export const useGroqAI = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateSubtasks = useCallback(async (prompt) => {
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
              content: "You are an AI assistant that creates detailed learning roadmaps for career development.",
            },
            { role: "user", content: prompt },
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to generate roadmap: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      const roadmapContent = data.choices[0].message.content

      // Parse the roadmap content into a structured format
      const roadmapData = parseRoadmapContent(roadmapContent)

      return roadmapData
    } catch (err) {
      setError("Failed to generate roadmap. Please try again.")
      console.error(err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Helper function to parse the AI-generated content into a structured format
  const parseRoadmapContent = (content) => {
    // This is a simplified parser. You might need to adjust it based on the actual output format from Groq AI.
    const lines = content.split("\n")
    const nodes = []
    const edges = []
    let currentNode = null

    lines.forEach((line, index) => {
      if (line.startsWith("Step ")) {
        if (currentNode) {
          nodes.push(currentNode)
        }
        currentNode = {
          id: `${index}`,
          type: "customNode",
          data: {
            label: line.substring(5),
            skills: [],
            resources: [],
            isExpanded: false,
          },
          position: { x: 0, y: index * 200 }, // Basic positioning
        }
      } else if (line.startsWith("- Skill: ")) {
        currentNode.data.skills.push(line.substring(9))
      } else if (line.startsWith("- Resource: ")) {
        const [name, url] = line.substring(11).split(" - ")
        currentNode.data.resources.push({ name, url })
      }
    })

    if (currentNode) {
      nodes.push(currentNode)
    }

    // Create edges between consecutive nodes
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({
        id: `e${i}-${i + 1}`,
        source: nodes[i].id,
        target: nodes[i + 1].id,
        type: "smoothstep",
        animated: true,
      })
    }

    return { nodes, edges }
  }

  return { generateSubtasks, isLoading, error }
}

