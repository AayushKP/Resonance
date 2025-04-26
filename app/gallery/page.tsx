"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

export default function Gallery() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/gallery");

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch images");
        }

        const data = await res.json();
        setImages(data.resources || []);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    }

    fetchImages();
  }, []);

  const verticalImages = images.filter((img) => img.height > img.width);
  const horizontalImages = images.filter((img) => img.width >= img.height);

  const splitIndex = Math.ceil(verticalImages.length / 2);
  const leftColumn = verticalImages.slice(0, splitIndex);
  const rightColumn = verticalImages.slice(splitIndex);

  return (
    <div className="h-[100dvvh] w-full pt-32 pb-8 relative">
      <div className="text-center text-6xl text-white font-sanskrit mb-12 z-30 relative">
        GALLERY
      </div>

      {error && (
        <div className="text-red-500 text-center text-lg mb-6 z-50 relative">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-8 z-30 relative">
        <div className="flex flex-col gap-4">
          {leftColumn.map((img) => (
            <div
              key={img.asset_id}
              className="relative w-full h-auto rounded-lg overflow-hidden z-30"
            >
              <Image
                src={img.secure_url}
                alt={img.public_id.split("/").pop() || "Gallery image"}
                width={img.width}
                height={img.height}
                className="w-full h-auto object-cover"
                loading="lazy"
                quality={75}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {horizontalImages.map((img) => (
            <div
              key={img.asset_id}
              className="relative w-full h-auto rounded-lg overflow-hidden z-30"
            >
              <Image
                src={img.secure_url}
                alt={img.public_id.split("/").pop() || "Gallery image"}
                width={img.width}
                height={img.height}
                className="w-full h-auto object-cover"
                loading="lazy"
                quality={75}
              />
            </div>
          ))}
        </div>

        {/* Right column (verticals) */}
        <div className="flex flex-col gap-4">
          {rightColumn.map((img) => (
            <div
              key={img.asset_id}
              className="relative w-full h-auto rounded-lg overflow-hidden z-30"
            >
              <Image
                src={img.secure_url}
                alt={img.public_id.split("/").pop() || "Gallery image"}
                width={img.width}
                height={img.height}
                className="w-full h-auto object-cover"
                loading="lazy"
                quality={75}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
