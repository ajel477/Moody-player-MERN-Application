import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import "./FacialExpression.css";

export default function MoodDetector() {
  const videoRef = useRef(null);
  const [mood, setMood] = useState("Loading models...");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const intervalRef = useRef(null);

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

  // Start detection
  const startDetection = () => {
    if (!modelsLoaded) {
      alert("Models not loaded yet!");
      return;
    }

    if (detecting) return; // prevent multiple intervals

    setMood("Detecting...");
    setDetecting(true);

    intervalRef.current = setInterval(async () => {
      if (videoRef.current) {
        const detections = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();

        if (detections && detections.expressions) {
          const { happy, sad, surprised, neutral } = detections.expressions;

          // log scores
          

          // pick best mood
          const detectedMood = Object.keys(detections.expressions).reduce(
            (a, b) =>
              detections.expressions[a] > detections.expressions[b] ? a : b
          );
          setMood(detectedMood);
          console.log(detectedMood);
        } else {
          setMood("No face detected");
        }
      }
    }, 1000);
  };

  // Stop detection
  const stopDetection = () => {
    clearInterval(intervalRef.current);
    setDetecting(false);
    setMood("Detection stopped");
  };

  return (
    <div className="detector-container">

      <video ref={videoRef} autoPlay muted className="video-feed" />

      <div className="button-group">
        {!detecting ? (
          <button
            className={`btn start-btn ${!modelsLoaded ? "disabled" : ""}`}
            onClick={startDetection}
            disabled={!modelsLoaded}
          >
            Start Detection
          </button>
        ) : (
          <button className="btn stop-btn" onClick={stopDetection}>
            Stop Detection
          </button>
        )}
      </div>

      
    </div>
  );
}

