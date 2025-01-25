import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("OII");
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude and Longitude are required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from Nominatim");
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch data from Nominatim:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
