"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

export default function Gallery() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/gallery");

        if (!res.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await res.json();
        setImages(data.resources || []);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, []);

  // Skeleton component
  const Skeleton = () => (
    <div className="h-[100dvh] w-full pt-32 pb-8 relative">
      <div className="text-center text-4xl text-white font-cinzel-decorative mb-6 z-30 relative">
        GALLERY
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-8 z-30 relative">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="w-full h-64 bg-gray-700 animate-pulse rounded-lg"
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="w-full h-64 bg-gray-700 animate-pulse rounded-lg"
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="w-full h-64 bg-gray-700 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Distribute images into 3 columns based on height
  const columns = [[], [], []] as CloudinaryImage[][];
  const columnHeights = [0, 0, 0];

  images.forEach((img) => {
    const smallestColumnIndex = columnHeights.indexOf(
      Math.min(...columnHeights)
    );
    columns[smallestColumnIndex].push(img);
    columnHeights[smallestColumnIndex] += img.height / img.width;
  });

  const [leftColumn, middleColumn, rightColumn] = columns;

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="h-[100dvh] w-full pt-32 pb-8 relative">
          <div className="text-center text-5xl text-white font-cinzel-decorative mb-6 z-30 relative">
            GALLERY
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-8 z-30 relative">
            <div className="flex flex-col gap-4">
              {leftColumn.map((img) => (
                <motion.div
                  key={img.asset_id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative w-full rounded-lg overflow-hidden"
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
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {middleColumn.map((img) => (
                <motion.div
                  key={img.asset_id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative w-full rounded-lg overflow-hidden"
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
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {rightColumn.map((img) => (
                <motion.div
                  key={img.asset_id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative w-full rounded-lg overflow-hidden"
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
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
