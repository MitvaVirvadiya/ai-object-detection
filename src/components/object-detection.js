"use client";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSsdLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "@/utils/render-prediction";

let detectInterval;

function ObjectDetection() {
  const [isLoading, setIsLoading] = useState(true);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runCoco = async () => {
    setIsLoading(true);
    const model = await cocoSsdLoad();
    setIsLoading(false);

    detectInterval = setInterval(() => {
      runObjectDetection(model);
    }, 10);
  };

  const runObjectDetection = async (model) => {
    if (
      canvasRef.current &&
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      canvasRef.current.width = webcamRef.current.video.videoWidth;
      canvasRef.current.height = webcamRef.current.video.videoHeight;

      const detectedObject = await model.detect(
        webcamRef.current.video,
        undefined,
        0.6
      );

      console.log(detectedObject);

      const context = canvasRef.current.getContext("2d");
      renderPredictions(detectedObject, context);
    }
  };

  const showMyVideo = () => {
    if (
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      const currentWidth = webcamRef.current.video.videoWidth;
      const currentHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = currentWidth;
      webcamRef.current.video.height = currentHeight;
    }
  };

  useEffect(() => {
    runCoco();
    showMyVideo();
  }, []);

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="gradient-title">AI Model Loading...</div>
      ) : (
        <div className="relative flex justify-center items-center gradient p-1.5 rounded-md">
          <Webcam
            ref={webcamRef}
            className="rounded-md w-full lg:h-[720px]"
            muted
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-99999 w-full lg:h-[720px]"
          />
        </div>
      )}
    </div>
  );
}

export default ObjectDetection;
