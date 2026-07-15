import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with server-side environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "eya_alankara/products";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided for upload" },
        { status: 400 }
      );
    }

    // Convert uploaded file to base64 buffer for Cloudinary SDK
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:${file.type || "image/png"};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary with automatic optimization settings
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder,
      resource_type: "image",
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      transformation: [
        { quality: "auto", fetch_format: "auto" },
      ],
    });

    return NextResponse.json({
      success: true,
      publicId: uploadResult.public_id,
      url: uploadResult.secure_url,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
    });
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to upload image to Cloudinary",
        details: error,
      },
      { status: 500 }
    );
  }
}
