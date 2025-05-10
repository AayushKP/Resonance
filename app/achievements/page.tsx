"use client";

import React from "react";
import { motion } from "framer-motion";
import achievements from "@/lib/data/achievements.json";

const hoverVariants = {
  scale: 1.02,
  transition: {
    duration: 0.4,
    ease: "easeInOut",
    delay: 0.1,
  },
};

const restVariants = {
  scale: 1,
  transition: {
    duration: 0.3,
    ease: "easeInOut",
  },
};

export default function Achievements() {
  return (
    <div className="min-h-screen w-full px-5 lg:px-20 bg-transparent pt-32 flex flex-col items-center justify-center">
      {achievements.map((achievement, idx) => {
        const event = achievement.event;
        const participants = achievement.participants;

        return (
          <motion.div
            key={idx}
            className="w-full backdrop-blur bg-transparent rounded-xl px-6 py-8 text-white overflow-hidden flex flex-col justify-start"
            whileHover="hover"
            initial="rest"
            animate="rest"
            variants={{ hover: hoverVariants, rest: restVariants }}
          >
            <div className="text-xl md:text-3xl lg:text-4xl xxl:text-5xl font-cinzel-decorative break-words w-full">
              {event.split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  variants={{
                    hover: {
                      y: [0, -10, 0],
                      transition: {
                        delay: index * 0.05 + 0.2,
                        duration: 0.6,
                        ease: "easeInOut",
                      },
                    },
                    rest: { y: 0 },
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
            <p className="text-left mt-2 text-sm text-gray-100 ">
              <span className="text-xl font-cinzel-decorative text-metal">
                {achievement.award} {achievement.year}
              </span>
              <span className="flex flex-wrap gap-2 mt-2">
                {participants.map((participant, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 px-2 py-1 rounded-md font-cinzel-decorative"
                  >
                    {participant.trim()}
                  </span>
                ))}
              </span>
            </p>
            <div className="w-full h-[2px] bg-gray-300/40 mt-4" />
          </motion.div>
        );
      })}
    </div>
  );
}
