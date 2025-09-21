import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import "./FacialExpression.css";
import axios from "axios";

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef(null);
  const [mood, setMood] = useState("Loading models...");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detecting, setDetecting] = useState(false);

  // Load models once
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = `${import.meta.env.BASE_URL}models`;
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

      setModelsLoaded(true);
      setMood();
    };
    loadModels();
  }, []);

  // Start webcam
  useEffect(() => {
    if (!modelsLoaded) return;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Camera error:", err));
  }, [modelsLoaded]);

  // Modified startDetection to detect once
  const startDetection = async () => {
    if (!modelsLoaded) {
      alert("Models not loaded yet!");
      return;
    }

    if (detecting) return;

    setMood("Detecting...");
    setDetecting(true);

    try {
      if (videoRef.current) {
        const detections = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();

        if (detections && detections.expressions) {
  const allowedMoods = ["angry", "neutral", "happy", "sad"];
  const filtered = Object.fromEntries(
    Object.entries(detections.expressions).filter(([key]) =>
      allowedMoods.includes(key)
    )
  );

  const detectedMood = Object.keys(filtered).reduce(
    (a, b) => (filtered[a] > filtered[b] ? a : b)
  );
          setMood(detectedMood);
          console.log("Detected Mood:", detectedMood);
           axios.get(`http://localhost:3000/songs?mood=${detectedMood}`)
      .then((response) => {
        console.log(response.data);
        setSongs(response.data.song);
        
      })
        } else {
          setMood("No face detected");
          console.log("No face detected");
        }
      }
    } catch (error) {
      console.error("Detection error:", error);
      setMood("Detection failed");
    } finally {
      setDetecting(false);
    }
  };

  return (
    <div className="detector-container">
      <video ref={videoRef} autoPlay muted className="video-feed" />
      <div className="button-group">
        <button
          className={`btn start-btn ${!modelsLoaded ? "disabled" : ""}`}
          onClick={startDetection}
          disabled={!modelsLoaded || detecting}
        >
          Detect Mood
        </button>
      </div>
    </div>
  );
}
