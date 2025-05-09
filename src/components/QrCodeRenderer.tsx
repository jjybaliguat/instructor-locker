"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

type Props = {
  text: string | undefined; // this must be required to avoid undefined errors
  size?: number;
};

export default function QRCodeRenderer({ text, size = 256 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!text) return; // ensure text is not undefined
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, text, {
        width: size,
        margin: 2,
        errorCorrectionLevel: "H",
      });
    }
  }, [text, size]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `qr-${text}.png`;
    a.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas ref={canvasRef} />
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download QR
      </button>
    </div>
  );
}
