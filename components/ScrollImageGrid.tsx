"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import scrollImages from "@/public/data/scroll.json";

type ScrollImage = {
  img: string;
  alt: string;
};

// Split into rows
const splitIntoRows = (
  images: ScrollImage[],
  rowSizes: number[]
): ScrollImage[][] => {
  const rows: ScrollImage[][] = [];
  let index = 0;
  for (const size of rowSizes) {
    rows.push(images.slice(index, index + size));
    index += size;
  }
  return rows;
};

const rowSizes = [5, 5, 4];
const imageRows = splitIntoRows(scrollImages, rowSizes);

export default function ScrollingImageRows() {
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const offsets = useRef<number[]>(imageRows.map(() => 0));
  const lastScrollY = useRef<number>(0);
  const scrollVelocity = useRef<number>(0);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      scrollVelocity.current = scrollVelocity.current * 0.95 + delta * 0.05;
      lastScrollY.current = currentScrollY;

      rowRefs.current.forEach((ref, idx) => {
        if (!ref) return;

        const direction = idx % 2 === 0 ? 1 : -1;
        const baseSpeed = [0.6, 0.4, 0.5];
        const speed = baseSpeed[idx] || 0.5;

        offsets.current[idx] +=
          scrollVelocity.current * speed * direction * 0.6;

        const verticalWeightFactor = 0.3;
        const rawYOffset = scrollVelocity.current * verticalWeightFactor;
        const yOffset = Math.max(-5, Math.min(5, rawYOffset));

        ref.style.transform = `translate(${offsets.current[idx]}px, ${yOffset}px) translateZ(0)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="space-y-4 md:space-y-14 w-full overflow-hidden py-24">
      {imageRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          //@ts-expect-error
          ref={(el) => (rowRefs.current[rowIndex] = el!)}
          className="overflow-visible w-full will-change-transform"
        >
          <div className="flex gap-4 md:gap-14 px-6 w-max">
            {row.map((img, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 h-40 sm:h-64 md:h-96 w-[12rem] sm:w-[20rem] md:w-[30rem] origin-left group"
              >
                <Image
                  priority
                  src={img.img}
                  alt={img.alt || `Scroll image ${i}`}
                  width={600}
                  height={600}
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
