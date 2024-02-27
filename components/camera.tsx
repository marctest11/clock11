"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Image from "next/image";

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
        <div className="relative w-full max-w-[500px] h-auto">
          <Image
            src={capturedImage}
            alt="Captured"
            layout="responsive"
            width={500}
            height={300}
          />
        </div>
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={500}
          height={300}
          className="flex justify-center"
        />
      )}
      <button onClick={capture}> Photoshoot!</button>
    </div>
  );
}
