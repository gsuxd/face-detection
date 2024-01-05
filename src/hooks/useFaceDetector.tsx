import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";
import { useState } from "react";
//@ts-expect-error 2305
import model from "../assets/model.tflite"
export default function useFaceDetector() {
  const [loading, setLoading] = useState(true);
let faceDetector: FaceDetector;
let lastVideoTime = -1;
  const [boundingBox, setBoundingBox] = useState<{
    x: number;
    y: number;
    height: number;
    width: number;
}[] | undefined>(undefined)
async function load() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  faceDetector = await FaceDetector.createFromModelPath(vision, model);
  await faceDetector.setOptions({ runningMode: "VIDEO" });
    setLoading(false);
  renderLoop();
}
   function renderLoop() {
     const video = document.getElementById("video")! as HTMLVideoElement;
     const startTimeMs = performance.now();
     if (video.currentTime !== lastVideoTime) {
       const res = faceDetector.detectForVideo(video, startTimeMs);

       lastVideoTime = video.currentTime;
       if (res.detections.length > 0) {
        const result = res.detections.map((val) => {
          if (val.boundingBox) {
            return {
              x: 950 - val.boundingBox?.width - val.boundingBox?.originX,
              y: 380 - val.boundingBox?.height - val.boundingBox?.originY,
              height: val.boundingBox.height,
              width: val.boundingBox.width
            }
          }
        })
        //@ts-expect-error 2302
        setBoundingBox(result)
       } else {
        setBoundingBox(undefined);
       }
     }

     requestAnimationFrame(() => {
       renderLoop();
     });
   }
  return { loading, load, boundingBox};
}
