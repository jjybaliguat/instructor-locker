"use client"
import Image from "next/image";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BillingPage() {
  const [copied, setCopied] = useState(false);

  const gcashNumber = "09979112814"; // Replace with your GCash number
  const qrCodeUrl = "/my-qr.jpg"; // Place your QR code in public/images

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gcashNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md bg-card p-6 rounded-2xl shadow-lg space-y-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">Pay via GCash</h1>
        <p className="text-muted-foreground">
          Settle your unpaid balance to restore access. Scan the QR code or copy the number below.
        </p>

        <div className="flex justify-center">
          <Image
            src={qrCodeUrl}
            alt="GCash QR Code"
            width={200}
            height={200}
            className="rounded-lg border"
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="font-mono text-sm">{gcashNumber}</span>
          <Button size="icon" variant="ghost" onClick={copyToClipboard}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        {copied && (
          <p className="text-green-600 text-sm font-medium">Copied to clipboard!</p>
        )}

        <p className="text-xs text-muted-foreground">
          After sending payment, please notify the developer or send proof of payment to <br />
          <span className="font-semibold text-foreground">justinejeraldbaliguat@gmail.com</span>
        </p>
      </div>
    </div>
  );
}
