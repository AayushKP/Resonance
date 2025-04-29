"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const allImages = Array.from(
  { length: 14 },
  (_, i) => `/images/scroll/img${i + 1}.png`
);

const imageRows = [
  allImages.slice(0, 5), // Row 1
  allImages.slice(5, 9), // Row 2
  allImages.slice(9, 14), // Row 3
];

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

      scrollVelocity.current = scrollVelocity.current * 0.9 + delta * 0.1; // Adjusted for even more damping (0.9)
      lastScrollY.current = currentScrollY;

      rowRefs.current.forEach((ref, idx) => {
        if (!ref) return;

        const direction = idx % 2 === 0 ? 1 : -1;

        const baseSpeed = [0.8, 0.2, 0.7]; // Slower speeds for more control and damping
        const speed = baseSpeed[idx] || 0.5;

        offsets.current[idx] +=
          scrollVelocity.current * speed * direction * 0.4;

        ref.style.transform = `translateX(${offsets.current[idx]}px) translateZ(0)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="space-y-14 w-full overflow-hidden pt-20 pb-40">
      {imageRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          //@ts-ignore
          ref={(el) => (rowRefs.current[rowIndex] = el!)}
          className="overflow-visible w-full will-change-transform"
        >
          <div className="flex gap-14 md:gap-14 px-6 w-max">
            {row.map((src, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 h-40 sm:h-64 md:h-96 w-[12rem] sm:w-[20rem] md:w-[30rem] origin-left opacity-90"
              >
                <Image
                  src={src}
                  alt={`Scroll image ${i}`}
                  width={600}
                  height={600}
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                />
                <div className="absolute inset-0 h-full w-full opacity-0 hover:opacity-80 transition-opacity bg-black pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
