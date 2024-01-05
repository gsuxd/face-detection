import useFaceDetector from "./hooks/useFaceDetector";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Camera } from "react-camera-pro";
function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const faceDetector = useFaceDetector();
  const results = useMemo(() => faceDetector.boundingBox?.map((val) => (
    <motion.div style={{
      top: 0,
      position: "absolute",      
      zIndex: 1000,
    }}
    animate={{ ...val, y: val.y * -1}}
    >
      <h4 className="text-red-600 font-medium text-2xl">PUTA ENCONTRADA</h4>
      <motion.div style={{
        borderColor: "red",
        borderWidth: "1rem",
      }}
      animate={{ ...val, y: 0, x: 0}}
      >
      </motion.div>
    </motion.div>
  )) ?? [], [faceDetector.boundingBox])
  return (
    <>
      <Card>
        <CardHeader>
          <h2 className="ext-black font-medium text-2xl">Detector de putas</h2>
        </CardHeader>
        <CardBody>
          <div
            className=""
            style={{
              position: "relative",
              width: 640,
              height: 480
            }}
          >
            <Camera
              aspectRatio={4 / 3}
              videoReadyCallback={() => faceDetector.load()}
              errorMessages={{
                canvas: "Error in canvas",
                noCameraAccessible: "No hay camaras puta",
                permissionDenied: "Me negaste el permiso idiota",
                switchCamera: "Error cambiando la jueputa camara",
              }}
            ></Camera>

            {faceDetector.boundingBox && results}
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default App;
