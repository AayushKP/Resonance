import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const folder = "Resonance";

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Missing Cloudinary environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }
    const authString = `${apiKey}:${apiSecret}`;
    const authToken = Buffer.from(authString).toString("base64");

    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?type=upload&search?expression=folder:${folder}/&max_results=100`;

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    // Check for errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Cloudinary API Error:", {
        status: response.status,
        statusText: response.statusText,
        errorData,
      });
      return NextResponse.json(
        { error: "Failed to fetch images", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ resources: data.resources || [] });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
