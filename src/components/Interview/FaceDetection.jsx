"use client"
import { useRef, useEffect, useState } from "react"
import * as faceDetection from "@mediapipe/face_detection"
import * as camera_utils from "@mediapipe/camera_utils"
import * as drawing_utils from "@mediapipe/drawing_utils"
import * as faceMesh from "@mediapipe/face_mesh"

export function FaceDetection({ onBehaviorUpdate }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [faceDetector, setFaceDetector] = useState(null)
  const [faceMeshDetector, setFaceMeshDetector] = useState(null)

  useEffect(() => {
    const loadDetectors = async () => {
      const detector = new faceDetection.FaceDetection({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      })
      detector.setOptions({
        model: "short",
        minDetectionConfidence: 0.5,
      })
      detector.onResults(onFaceDetectionResults)
      setFaceDetector(detector)

      const meshDetector = new faceMesh.FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      })
      meshDetector.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      })
      meshDetector.onResults(onFaceMeshResults)
      setFaceMeshDetector(meshDetector)
    }

    loadDetectors()
  }, [])

  useEffect(() => {
    if (videoRef.current && faceDetector && faceMeshDetector) {
      const camera = new camera_utils.Camera(videoRef.current, {
        onFrame: async () => {
          await faceDetector.send({ image: videoRef.current })
          await faceMeshDetector.send({ image: videoRef.current })
        },
        width: 640,
        height: 480,
      })
      camera.start()
    }
  }, [faceDetector, faceMeshDetector])

  const onFaceDetectionResults = (results) => {
    const canvasCtx = canvasRef.current.getContext("2d")
    canvasCtx.save()
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height)
    if (results.detections.length > 0) {
      for (const face of results.detections) {
        drawing_utils.drawRectangle(canvasCtx, face.boundingBox, {
          color: "blue",
          lineWidth: 4,
          fillColor: "#00000000",
        })
      }
    }
    canvasCtx.restore()
  }

  const onFaceMeshResults = (results) => {
    const canvasCtx = canvasRef.current.getContext("2d")
    canvasCtx.save()
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        drawing_utils.drawConnectors(canvasCtx, landmarks, faceMesh.FACEMESH_TESSELATION, {
          color: "#C0C0C070",
          lineWidth: 1,
        })
        drawing_utils.drawConnectors(canvasCtx, landmarks, faceMesh.FACEMESH_RIGHT_EYE, { color: "#FF3030" })
        drawing_utils.drawConnectors(canvasCtx, landmarks, faceMesh.FACEMESH_LEFT_EYE, { color: "#30FF30" })
        drawing_utils.drawConnectors(canvasCtx, landmarks, faceMesh.FACEMESH_FACE_OVAL, { color: "#E0E0E0" })
      }
    }
    canvasCtx.restore()

    // Analyze behavior based on face mesh results
    if (results.multiFaceLandmarks.length > 0) {
      const behavior = analyzeBehavior(results.multiFaceLandmarks[0])
      onBehaviorUpdate(behavior)
    }
  }

  const analyzeBehavior = (landmarks) => {
    // This is a simplified behavior analysis. In a real application, you would use more sophisticated methods.
    const leftEye = landmarks[159]
    const rightEye = landmarks[386]
    const mouthLeft = landmarks[61]
    const mouthRight = landmarks[291]

    const eyeDistance = Math.sqrt(Math.pow(leftEye.x - rightEye.x, 2) + Math.pow(leftEye.y - rightEye.y, 2))
    const mouthWidth = Math.sqrt(Math.pow(mouthLeft.x - mouthRight.x, 2) + Math.pow(mouthLeft.y - mouthRight.y, 2))

    return {
      attentiveness: eyeDistance > 0.15 ? "High" : "Low",
      engagement: mouthWidth > 0.1 ? "High" : "Low",
      timestamp: new Date().toISOString(),
    }
  }

  return (
    <div className="relative w-full h-[480px]">
      <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover" />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover" width={640} height={480} />
    </div>
  )
}

