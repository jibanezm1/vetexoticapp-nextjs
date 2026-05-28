"use client";

import { useEffect, useRef } from "react";

interface QRCodeProps {
  url: string;
}

export default function QRCode({ url }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!url || !canvasRef.current) return;

    // Usamos una API de QR via imagen (no requiere dependencia)
    // Cargamos la imagen del QR generada por Google Charts API
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=1a1a2e&margin=10`;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = 220;
      canvas.height = 220;
      // Fondo blanco redondeado
      ctx.fillStyle = "#ffffff";
      ctx.roundRect(0, 0, 220, 220, 12);
      ctx.fill();
      ctx.drawImage(img, 0, 0, 220, 220);
    };
    img.src = qrUrl;
  }, [url]);

  if (!url) {
    return (
      <div style={{
        width: 220, height: 220,
        background: "rgba(255,255,255,0.05)",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.3)",
        margin: "0 auto"
      }}>
        Generando QR...
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <canvas
        ref={canvasRef}
        width={220}
        height={220}
        style={{ borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
      />
    </div>
  );
}
