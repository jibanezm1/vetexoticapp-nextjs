import { randomUUID } from "crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const endpoint = process.env.SPACES_ENDPOINT;
const bucket = process.env.SPACES_BUCKET;
const accessKeyId = process.env.SPACES_ACCESS_KEY_ID;
const secretAccessKey = process.env.SPACES_SECRET_ACCESS_KEY;
const region = process.env.SPACES_REGION || "sfo3";

const spacesClient =
  endpoint && bucket && accessKeyId && secretAccessKey
    ? new S3Client({
        region,
        endpoint,
        credentials: { accessKeyId, secretAccessKey },
      })
    : null;

export async function POST(request: Request) {
  if (!spacesClient || !bucket || !endpoint) {
    return NextResponse.json(
      { error: "Faltan variables de entorno para DigitalOcean Spaces." },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const participantName = String(formData.get("participantName") || "participante");
    const species = String(formData.get("species") || "general");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No se recibió ninguna imagen." }, { status: 400 });
    }

    const extension = file.type.split("/")[1] || "jpg";
    const safeName = participantName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();

    const key = `expomascotas/${species}/${Date.now()}-${safeName || "participante"}-${randomUUID()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    await spacesClient.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type || "image/jpeg",
        ACL: "public-read",
      })
    );

    const publicBaseUrl = endpoint.startsWith("https://")
      ? endpoint.replace("https://", `https://${bucket}.`)
      : `https://${bucket}.${endpoint}`;

    return NextResponse.json({
      ok: true,
      url: `${publicBaseUrl}/${key}`,
      key,
    });
  } catch (error) {
    console.error("Error subiendo imagen a Spaces", error);
    return NextResponse.json({ error: "No se pudo subir la imagen." }, { status: 500 });
  }
}
