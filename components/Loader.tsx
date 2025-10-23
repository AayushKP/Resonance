"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface LoaderProps {
  onLoadingComplete?: () => void;
}

export default function Loader({ onLoadingComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const duration = 2500;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        return next >= 100 ? 100 : next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Fixed positions to avoid hydration errors
  const floatingNotes = [
    { id: 0, note: "♪", delay: 0, duration: 4, x: 10, size: 30 },
    { id: 1, note: "♫", delay: 0.3, duration: 4.5, x: 20, size: 25 },
    { id: 2, note: "♬", delay: 0.6, duration: 3.5, x: 30, size: 35 },
    { id: 3, note: "♩", delay: 0.9, duration: 4.2, x: 40, size: 28 },
    { id: 4, note: "♭", delay: 1.2, duration: 3.8, x: 50, size: 32 },
    { id: 5, note: "♮", delay: 1.5, duration: 4.3, x: 60, size: 26 },
    { id: 6, note: "♯", delay: 1.8, duration: 4, x: 70, size: 30 },
    { id: 7, note: "♪", delay: 0.2, duration: 3.9, x: 80, size: 29 },
    { id: 8, note: "♫", delay: 0.5, duration: 4.1, x: 90, size: 27 },
    { id: 9, note: "♬", delay: 0.8, duration: 3.7, x: 15, size: 31 },
    { id: 10, note: "♩", delay: 1.1, duration: 4.4, x: 25, size: 24 },
    { id: 11, note: "♭", delay: 1.4, duration: 3.6, x: 35, size: 33 },
    { id: 12, note: "♮", delay: 1.7, duration: 4.2, x: 45, size: 28 },
    { id: 13, note: "♯", delay: 0.1, duration: 4, x: 55, size: 30 },
    { id: 14, note: "♪", delay: 0.4, duration: 4.3, x: 65, size: 26 },
    { id: 15, note: "♫", delay: 0.7, duration: 3.8, x: 75, size: 32 },
    { id: 16, note: "♬", delay: 1, duration: 4.1, x: 85, size: 29 },
    { id: 17, note: "♩", delay: 1.3, duration: 3.9, x: 95, size: 27 },
    { id: 18, note: "♭", delay: 1.6, duration: 4.2, x: 5, size: 31 },
    { id: 19, note: "♮", delay: 1.9, duration: 3.7, x: 95, size: 28 },
  ];

  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onAnimationComplete={() => onLoadingComplete?.()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Floating Musical Notes */}
      {floatingNotes.map((item) => (
        <motion.div
          key={item.id}
          initial={{
            opacity: 0,
            y: "100vh",
            x: `${item.x}vw`,
            rotate: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: "-20vh",
            x: `${item.x + (item.id % 2 === 0 ? 10 : -10)}vw`,
            rotate: 360,
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-yellow-500/30 pointer-events-none text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl"
        >
          {item.note}
        </motion.div>
      ))}

      {/* Animated Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: [0.5, 1.1, 1],
          opacity: [0, 1, 1],
        }}
        transition={{
          duration: 1.5,
          times: [0, 0.6, 1],
          ease: "easeOut",
        }}
        className="relative z-10"
      >
        {/* Rotating Ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-36 h-36 xs:w-44 xs:h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 border-2 border-yellow-500/30 rounded-full" />
        </motion.div>

        {/* Pulsing effect behind logo */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl sm:blur-2xl lg:blur-3xl"
        />

        {/* Logo */}
        <motion.img
          src="/images/resonance.png"
          alt="Resonance Logo"
          animate={{
            scale: [1, 1.05, 1],
            filter: [
              "drop-shadow(0 0 20px rgba(234, 179, 8, 0.5))",
              "drop-shadow(0 0 40px rgba(234, 179, 8, 0.8))",
              "drop-shadow(0 0 20px rgba(234, 179, 8, 0.5))",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 object-contain relative z-10"
        />
      </motion.div>

      {/* Progress Bar with Percentage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute bottom-12 xs:bottom-14 sm:bottom-16 md:bottom-20 lg:bottom-24 flex flex-col items-center gap-2 xs:gap-3 sm:gap-4 px-4"
      >
        {/* Percentage */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-white text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-cinzel-decorative tracking-wider"
        >
          {Math.round(progress)}%
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-48 xs:w-56 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] h-1.5 xs:h-2 sm:h-2 md:h-2.5 bg-white/10 rounded-full overflow-hidden relative">
          {/* Animated Background Glow */}
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />

          {/* Progress Fill */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: 0.1,
              ease: "easeOut",
            }}
            className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 relative overflow-hidden"
          >
            {/* Shimmer Effect */}
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </motion.div>
        </div>

        {/* Musical Note Animation at Progress Bar Ends */}
        <div className="absolute -left-6 xs:-left-7 sm:-left-8 md:-left-10 top-1/2 -translate-y-1/2">
          <motion.span
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-yellow-400 text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
          >
            ♪
          </motion.span>
        </div>
        <div className="absolute -right-6 xs:-right-7 sm:-right-8 md:-right-10 top-1/2 -translate-y-1/2">
          <motion.span
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="text-yellow-400 text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
          >
            ♫
          </motion.span>
        </div>
      </motion.div>

      {/* Corner Musical Notes */}
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-4 left-4 xs:top-6 xs:left-6 sm:top-8 sm:left-8 md:top-10 md:left-10 text-yellow-500/40 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
      >
        ♬
      </motion.div>
      <motion.div
        animate={{
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-4 right-4 xs:top-6 xs:right-6 sm:top-8 sm:right-8 md:top-10 md:right-10 text-yellow-500/40 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
      >
        ♩
      </motion.div>
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-4 left-4 xs:bottom-6 xs:left-6 sm:bottom-8 sm:left-8 md:bottom-10 md:left-10 text-yellow-500/40 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
      >
        ♪
      </motion.div>
      <motion.div
        animate={{
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-4 right-4 xs:bottom-6 xs:right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 text-yellow-500/40 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
      >
        ♫
      </motion.div>
    </motion.div>
  );
}
