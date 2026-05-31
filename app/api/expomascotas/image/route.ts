import { NextResponse } from "next/server";

export const runtime = "nodejs";

function isAllowedImageUrl(url: URL) {
  return (
    url.protocol === "https:" &&
    (url.hostname.endsWith(".digitaloceanspaces.com") ||
      url.hostname === "vetexoticapp.cl" ||
      url.hostname === "www.vetexoticapp.cl")
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json({ error: "Falta la URL de imagen." }, { status: 400 });
  }

  let remoteUrl: URL;
  try {
    remoteUrl = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "La URL de imagen no es válida." }, { status: 400 });
  }

  if (!isAllowedImageUrl(remoteUrl)) {
    return NextResponse.json({ error: "La URL de imagen no está permitida." }, { status: 403 });
  }

  try {
    const response = await fetch(remoteUrl.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "No se pudo obtener la imagen." }, { status: 502 });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const bytes = await response.arrayBuffer();

    return new NextResponse(bytes, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch {
    return NextResponse.json({ error: "No se pudo obtener la imagen." }, { status: 500 });
  }
}
