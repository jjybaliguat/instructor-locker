import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

type QRCodeRendererProps = {
  text: string | undefined; // the text/data to encode
  size?: number; // optional size in pixels
};

const QRCodeRenderer: React.FC<QRCodeRendererProps> = ({ text, size = 256 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, text, {
        width: size,
        margin: 2,
        errorCorrectionLevel: "H",
      }, (error : any) => {
        if (!error) setIsReady(true);
      });
    }
  }, [text, size]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas ref={canvasRef} />
      {isReady && (
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Download QR Code
        </button>
      )}
    </div>
  );
};

export default QRCodeRenderer;
