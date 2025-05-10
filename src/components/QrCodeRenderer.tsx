"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid"; // Install this with `npm install uuid`
import { useSession } from "next-auth/react";

type Props = {
  text: string | undefined; // this must be required to avoid undefined errors
  size?: number;
};

export default function QRCodeRenderer({ text, size = 256 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {data, update} = useSession()
  const user = data?.user

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
    a.download = `qr-${generatedCode? generatedCode : text}.png`;
    a.click();
  };

  const handleGenerateCode = async() => {
    const randomCode = uuidv4(); // or custom string generation
    setGeneratedCode(randomCode);

    setLoading(true);

    try {
      const response = await fetch(`/api/qr`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: user?.id,
          code: randomCode
        })
      })
      const data = await response.json()
      // console.log(data)
      if(response.ok){
        update()
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, randomCode, {
            width: 256,
            margin: 2,
            errorCorrectionLevel: "H",
          });
        }
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas ref={canvasRef} />
      <div className="flex gap-2 items-center">
        <button
          disabled={loading}
          onClick={handleGenerateCode}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Generating..." : "Generate QR"}
        </button>
        <button
          onClick={handleDownload}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download QR
        </button>
      </div>
    </div>
  );
}
