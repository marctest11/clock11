"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";

export default function CamareUesr() {
  const webcamRef = useRef<any>(null);
  const [capturedImage, setCapturedImage] = useState<any>(null);

  const capture = useCallback(() => {
    const imgSrc = webcamRef.current.getScreenshot();

    console.log("camera:", imgSrc);
    setCapturedImage(imgSrc);
  }, [webcamRef]);
  return (
    <div>
      {capturedImage ? (
        <img src={capturedImage} alt="Captured" style={{ maxWidth: "100%" }} />
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
          style={{ maxWidth: "100%" }}
        />
      )}
      <button onClick={capture}> Photoshoot!</button>
    </div>
  );
}
