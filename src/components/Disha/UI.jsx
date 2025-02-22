"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { FaBook, FaCode, FaLightbulb, FaLink, FaQuestionCircle } from "react-icons/fa"
import { useChat } from "@/hooks/useChat"

export const UI = ({ hidden, ...props }) => {
  const input = useRef()
  const [showResources, setShowResources] = useState(false)
  const { chat, loading, cameraZoomed, setCameraZoomed, message, tutorResponse, isAudioReady } = useChat()

  const sendMessage = () => {
    const text = input.current.value
    if (!loading && !message) {
      chat(text)
      input.current.value = ""
    }
  }

  if (hidden) {
    return null
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <h1 className="font-black text-2xl flex items-center">
            <FaCode className="mr-2" /> Virtual Coding Tutor
          </h1>
          <p className="text-sm text-gray-600">Your AI companion for learning to code</p>
        </div>
        <div className="w-full flex flex-col items-end justify-center gap-4">
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="pointer-events-auto bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
          >
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            )}
          </button>
        </div>
        {tutorResponse && (
          <div className="pointer-events-auto w-[50vw]  flex justify-evenly gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 w-1/2 max-h-[60vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaLightbulb className="mr-2 text-yellow-500" /> {tutorResponse.topic}
              </h2>
              <p className="mb-4  text-gray-700">{tutorResponse.explanation}</p>
              {tutorResponse.codeExample && (
                <div className="bg-gray-100 p-4 rounded-md mb-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <FaCode className="mr-2 text-blue-500" /> Code Example
                  </h3>
                  <pre className="text-sm overflow-x-auto">
                    <code>{tutorResponse.codeExample}</code>
                  </pre>
                </div>
              )}
              {!isAudioReady && <div className="text-sm text-gray-500 italic">Generating audio response...</div>}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 w-1/2 max-h-[60vh] overflow-y-auto"
            >
              {tutorResponse.infographic && (
                <img
                  src={tutorResponse.infographic || "/placeholder.svg"}
                  alt="Infographic"
                  className="w-full mb-4 rounded-lg"
                />
              )}
              <button
                onClick={() => setShowResources(!showResources)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full flex items-center justify-center w-full mb-4 transition-all duration-300"
              >
                <FaBook className="mr-2" /> {showResources ? "Hide Resources" : "Show Resources"}
              </button>
              {showResources && tutorResponse.resources && tutorResponse.resources.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <FaLink className="mr-2 text-green-500" /> Additional Resources
                  </h3>
                  <ul className="space-y-2">
                    {tutorResponse.resources.map((resource, index) => (
                      <li key={index} className="mb-2">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center"
                        >
                          <FaLink className="mr-2" /> {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        )}
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-full bg-opacity-50 bg-white backdrop-blur-md shadow-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500"
            placeholder="Ask about a programming topic..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage()
              }
            }}
          />
          <button
            disabled={loading || message}
            onClick={sendMessage}
            className={`bg-blue-500 hover:bg-blue-600 text-white p-4 px-8 font-semibold uppercase rounded-full shadow-lg transition-all duration-300 flex items-center ${
              loading || message ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            <FaQuestionCircle className="mr-2" /> Ask
          </button>
        </div>
      </div>
    </>
  )
}

