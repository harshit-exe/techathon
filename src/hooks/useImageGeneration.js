"use client"

import { useState } from "react"

const UNSPLASH_ACCESS_KEY = 'y0cRoX5rAQIeqdDBveF9gYTndha7d5I8-RwxmprTaxY'

export function useImageGeneration() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateImage = async (prompt) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${encodeURIComponent(prompt)}&client_id=${UNSPLASH_ACCESS_KEY}`,
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data.urls.regular
    } catch (error) {
      console.error("Error generating image:", error)
      setError(error.message || "Failed to generate image. Using placeholder.")
      return `https://via.placeholder.com/400x200?text=${encodeURIComponent(prompt)}`
    } finally {
      setIsLoading(false)
    }
  }

  return { generateImage, isLoading, error }
}

