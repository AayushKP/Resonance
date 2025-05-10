"use client";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import coordinators from "@/lib/data/coordinators.json";
import Image from "next/image";

export default function HorizontalScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - clientWidth
            : scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const scrollWidth = scrollContainer.scrollWidth;
      const clientWidth = scrollContainer.clientWidth;

      scrollContainer.scrollLeft = (scrollWidth - clientWidth) / 4;
    }
  }, []);

  return (
    <div className="relative w-full">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2"
        aria-label="Scroll Left"
      >
        <ChevronLeft className="w-8 h-8 text-white hover:text-yellow-600 transition" />
      </button>

      <div
        ref={scrollRef}
        className="overflow-x-auto whitespace-nowrap py-10 scrollbar-hide scroll-smooth"
      >
        <div className="flex flex-row gap-6 w-max">
          {coordinators.map((coordinator, i) => (
            <div key={i} className="flex flex-row items-center gap-6 px-2">
              <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden outline-2 outline-offset-1 outline-white/80 relative">
                <Image
                  priority
                  src={coordinator.src}
                  alt={coordinator.alt || `Coordinator ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-80 flex flex-col cursor-pointer justify-center h-44 py-3 gap-1 rounded-xl backdrop-blur-lg bg-black/10 border px-4 transform transition-transform duration-500 hover:scale-105 ease-in-out">
                <div className="text-lg whitespace-normal font-cinzel-decorative overflow-hidden">
                  {coordinator.name}
                </div>
                <div className="text-sm font-cinzel-decorative-bold text-metal whitespace-normal overflow-hidden">
                  {coordinator.role}
                </div>
                <div className="text-xs text-white font-montserrat whitespace-normal overflow-hidden">
                  {coordinator.about}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2"
        aria-label="Scroll Right"
      >
        <ChevronRight className="w-8 h-8 text-white hover:text-yellow-600  transition" />
      </button>
    </div>
  );
}
