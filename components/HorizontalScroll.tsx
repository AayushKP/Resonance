"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  return (
    <div className="relative w-full">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2"
        aria-label="Scroll Left"
      >
        <ChevronLeft className="w-8 h-8 text-white hover:text-red-400 transition" />
      </button>

      <div
        ref={scrollRef}
        className="overflow-x-auto whitespace-nowrap py-10 scrollbar-hide scroll-smooth"
      >
        <div className="flex flex-row gap-6 w-max">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-row items-center gap-6">
              <div className="w-52 h-52 rounded-full bg-transparent border" />
              <div className="w-xs h-44 text-xs py-4 font-cinzel-decorative rounded-xl backdrop-blur-sm bg-black/10 border">
                About Co-ordinator
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
        <ChevronRight className="w-8 h-8 text-white hover:text-red-400 transition" />
      </button>
    </div>
  );
}
