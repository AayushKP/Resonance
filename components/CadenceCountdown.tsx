"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CadenceCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const targetDate = new Date("2025-11-02T09:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isClient) {
    return null;
  }

  const silverGradientStyle = {
    background: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 0 8px rgba(192, 192, 192, 0.4))'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="mt-8 md:mt-12 flex flex-col items-center gap-3"
    >
      {/* Arrow and Text Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex flex-col items-center gap-1"
      >
        <motion.p
          animate={{ 
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-xs md:text-sm font-cinzel-decorative font-bold text-white/80"
          style={silverGradientStyle}
        >
          Click for Cadence 2.O
        </motion.p>
        <motion.svg
          animate={{ 
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-6 h-6 md:w-8 md:h-8"
          fill="none"
          stroke="url(#silverGradient)"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8E8E8" />
              <stop offset="50%" stopColor="#C0C0C0" />
              <stop offset="100%" stopColor="#A8A8A8" />
            </linearGradient>
          </defs>
          <path d="M12 5v14M12 19l-7-7M12 19l7-7" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.div>

      <Link href="/cadence2025">
        <motion.div
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 30px rgba(192, 192, 192, 0.6), 0 0 60px rgba(255, 215, 0, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(192, 192, 192, 0.3)",
              "0 0 30px rgba(192, 192, 192, 0.5)",
              "0 0 20px rgba(192, 192, 192, 0.3)"
            ]
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="relative bg-gradient-to-r from-gray-300/30 via-gray-200/40 to-gray-300/30 backdrop-blur-md rounded-full px-6 py-3 md:px-8 md:py-4 border border-white/40 cursor-pointer inline-flex items-center gap-3 md:gap-4 overflow-hidden group"
          style={{
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.2)"
          }}
        >
          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full" />
          
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{
              x: ["-100%", "200%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1
            }}
            style={{
              transform: "skewX(-20deg)"
            }}
          />

          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              opacity: [0.5, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: "radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%)",
              filter: "blur(10px)"
            }}
          />

          <h3 
            className="text-lg md:text-xl font-cinzel-decorative text-white font-bold whitespace-nowrap relative z-10"
            style={{
              color: '#FFFFFF',
            }}
          >
            <span className="text-metal">Cadence </span>2.0
          </h3>
          
          <div className="flex gap-1 md:gap-2 items-center relative z-10">
            <TimeUnit value={timeLeft.days} label="D" />
            <Separator />
            <TimeUnit value={timeLeft.hours} label="H" />
            <Separator />
            <TimeUnit value={timeLeft.minutes} label="M" />
            <Separator />
            <TimeUnit value={timeLeft.seconds} label="S" />
          </div>

          {/* Border glow on hover */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(192, 192, 192, 0.3))",
              padding: "2px",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude"
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.span
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-xl md:text-2xl text-white/80 font-bold font-cinzel-decorative leading-none"
        
      >
        {value.toString().padStart(2, "0")}
      </motion.span>
      <span 
        className="text-[8px] md:text-[10px] font-bold text-yellow-500 font-cinzel-decorative mt-0.5"
      >
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="text-lg md:text-xl text-yellow-400 font-bold font-cinzel-decorative"
      style={{
        textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(0, 0, 0, 0.3)'
      }}
    >
      :
    </motion.span>
  );
}