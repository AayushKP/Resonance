"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

interface CloudinaryImage {
  asset_id?: string;
  public_id?: string;
  secure_url: string;
  width?: number;
  height?: number;
}

interface POC {
  name: string;
  role: string;
  phone: string;
  email?: string;
}

interface ApiResponse {
  resources?: CloudinaryImage[];
  images?: (string | CloudinaryImage)[];
}

interface ResourceItem {
  secure_url?: string;
  url?: string;
  width?: number;
  height?: number;
  public_id?: string;
  asset_id?: string;
}

export default function Cadence() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [displayedImages, setDisplayedImages] = useState<CloudinaryImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [initialImagesCount] = useState<number>(4);
  const [imagesReady, setImagesReady] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const leftSectionRef = useRef<HTMLDivElement>(null);

  const MAX_IMAGES = 20;
  const IMAGES_PER_LOAD = 5;

  // POC Data
  const pocs: POC[] = [
    {
      name: "Anirban Chandra",
      role: "Student Coordinator",
      phone: "+91 94348 83745",
    },
    {
      name: "Sanjana Ganguly",
      role: "Student Coordinator",
      phone: "+91 82405 90343",
    },
    {
      name: "Saikat Sana",
      role: "Student Coordinator",
      phone: "+91 82508 81177",
    }
  ];

  // Generate unique key for each image
  const getUniqueKey = (img: CloudinaryImage, index: number) => {
    return `${img.asset_id || ''}-${img.public_id || ''}-${img.secure_url}-${index}`;
  };

  // Load more images function
  const loadMoreImages = useCallback(() => {
    if (loadingMore || currentIndex >= images.length || currentIndex >= MAX_IMAGES) return;

    setLoadingMore(true);
    setTimeout(() => {
      const remainingImages = Math.min(MAX_IMAGES - currentIndex, images.length - currentIndex);
      const nextBatch = Math.min(IMAGES_PER_LOAD, remainingImages);
      const nextImages = images.slice(currentIndex, currentIndex + nextBatch);
      
      setDisplayedImages(prev => [...prev, ...nextImages]);
      setCurrentIndex(prev => prev + nextBatch);
      setLoadingMore(false);
    }, 500);
  }, [currentIndex, images, loadingMore]);

  // Scroll event handler
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    if (scrollPercentage > 0.7 && !loadingMore && currentIndex < images.length && currentIndex < MAX_IMAGES) {
      loadMoreImages();
    }
  }, [loadMoreImages, loadingMore, currentIndex, images.length]);

  // Fetch images immediately and independently
  useEffect(() => {
    async function fetchImages() {
      try {
        console.log("Fetching images from /api/gallery...");
        const res = await fetch("/api/gallery");

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json() as ApiResponse | CloudinaryImage[] | { images: (string | CloudinaryImage)[] };
        console.log("API Response received:", data);

        let resources: CloudinaryImage[] = [];

        // Handle different response formats
        if (Array.isArray(data)) {
          resources = data.map((d: string | CloudinaryImage) =>
            typeof d === "string" 
              ? { secure_url: d } 
              : { 
                  secure_url: d.secure_url, 
                  width: d.width, 
                  height: d.height, 
                  public_id: d.public_id,
                  asset_id: d.asset_id 
                }
          );
        } else if (data && 'resources' in data && Array.isArray(data.resources)) {
          resources = data.resources.map((r: ResourceItem) => ({
            secure_url: r.secure_url || r.url || '',
            width: r.width,
            height: r.height,
            public_id: r.public_id,
            asset_id: r.asset_id,
          }));
        } else if (data && 'images' in data && Array.isArray(data.images)) {
          resources = data.images.map((u: string | CloudinaryImage) => 
            typeof u === "string" 
              ? { secure_url: u } 
              : { 
                  secure_url: u.secure_url,
                  width: u.width,
                  height: u.height,
                  public_id: u.public_id,
                  asset_id: u.asset_id
                }
          );
        } else {
          console.error("Unexpected API response format:", data);
          throw new Error("Unexpected API response format");
        }

        if (resources.length === 0) {
          throw new Error("No images found in response");
        }

        // Limit to MAX_IMAGES and set immediately
        const limitedResources = resources.slice(0, MAX_IMAGES);
        setImages(limitedResources);
        
        // Set initial images immediately
        const initialCount = Math.min(4, limitedResources.length);
        setDisplayedImages(limitedResources.slice(0, initialCount));
        setCurrentIndex(initialCount);
        setImagesReady(true);
        
      } catch (err) {
        console.error("Error fetching images:", err);
        setError(err instanceof Error ? err.message : "Failed to load images");
        setImagesReady(true);
      }
    }

    fetchImages();
  }, []);

  // Page loading progress - independent of images
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const loadingTimer = setTimeout(() => {
      setLoadingProgress(100);
      setTimeout(() => setPageLoading(false), 500);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimer);
    };
  }, []);

  // Add scroll listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  // Page loader
  if (pageLoading) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
        >
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => {
              const xPos = (i * 7 + 13) % 100;
              const yPos = (i * 11 + 17) % 100;
              const xEnd = (xPos + 30) % 100;
              const yEnd = (yPos + 40) % 100;
              const duration = 3 + (i % 3);
              const delay = (i % 5) * 0.4;
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ 
                    left: `${xPos}%`,
                    top: `${yPos}%`,
                    backgroundColor: 'rgba(192, 192, 192, 0.2)'
                  }}
                  initial={{ scale: 0 }}
                  animate={{
                    y: [`0%`, `${yEnd}%`],
                    x: [`0%`, `${xEnd}%`],
                    scale: [0, 1, 0],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay: delay
                  }}
                />
              );
            })}
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotate: 0,
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeOut"
              }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 border-4 border-t-transparent border-r-transparent border-b-transparent rounded-full"
                style={{ borderTopColor: '#C0C0C0' }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-12 border-2 border-t-transparent border-r-transparent border-b-transparent rounded-full"
                style={{ borderRightColor: 'rgba(192, 192, 192, 0.5)' }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-16 border border-t-transparent border-r-transparent border-b-transparent rounded-full"
                style={{ borderBottomColor: 'rgba(192, 192, 192, 0.3)' }}
              />
              
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full blur-xl"
                style={{ backgroundColor: 'rgba(192, 192, 192, 0.2)' }}
              />

              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/images/cadencelogo.png"
                  alt="Loading Cadence"
                  width={250}
                  height={250}
                  priority
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-64 h-12 bg-gray-800 rounded-full overflow-hidden border relative"
                style={{ borderColor: 'rgba(192, 192, 192, 0.3)' }}
              >
                <div className="absolute inset-0 flex flex-col justify-around py-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-px bg-gray-700/50" />
                  ))}
                </div>
                
                <motion.div
                  className="h-full relative z-10"
                  style={{ 
                    background: 'linear-gradient(to right, rgba(192, 192, 192, 0.3), rgba(192, 192, 192, 0.6))'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 flex items-center justify-end pr-2">
                    {loadingProgress > 10 && (
                      <motion.span
                        className="text-2xl"
                        style={{ color: '#C0C0C0' }}
                        animate={{
                          y: [0, -5, 0],
                          rotate: [-5, 5, -5]
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity
                        }}
                      >
                        ♪
                      </motion.span>
                    )}
                    {loadingProgress > 30 && (
                      <motion.span
                        className="text-xl ml-1"
                        style={{ color: '#C0C0C0' }}
                        animate={{
                          y: [0, -3, 0],
                          rotate: [5, -5, 5]
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.1
                        }}
                      >
                        ♫
                      </motion.span>
                    )}
                    {loadingProgress > 60 && (
                      <motion.span
                        className="text-lg ml-1"
                        style={{ color: '#C0C0C0' }}
                        animate={{
                          y: [0, -4, 0],
                          rotate: [-5, 5, -5]
                        }}
                        transition={{
                          duration: 0.7,
                          repeat: Infinity,
                          delay: 0.2
                        }}
                      >
                        ♬
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              </div>
              
              <motion.p
                className="text-sm text-gray-400 font-montserrat"
                key={loadingProgress}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {loadingProgress}%
              </motion.p>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none">
              {["♪", "♫", "♬", "♩"].map((note, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  style={{ color: 'rgba(192, 192, 192, 0.3)' }}
                  initial={{ 
                    x: `${25 + i * 20}%`,
                    y: "100%",
                    opacity: 0,
                    rotate: 0
                  }}
                  animate={{
                    y: ["-100%", "-100%"],
                    opacity: [0, 1, 1, 0],
                    rotate: [0, 360],
                    x: [`${25 + i * 20}%`, `${30 + i * 20}%`]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  {note}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  const silverGradientStyle = {
    background: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 2px 10px rgba(192, 192, 192, 0.3)',
    filter: 'drop-shadow(0 0 8px rgba(192, 192, 192, 0.4))'
  };

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen text-white pt-24 md:pt-32 pb-10 px-4 overflow-y-auto relative"
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`bg-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: 'rgba(192, 192, 192, 0.1)' }}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -20
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="rounded-3xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-8 lg:gap-12 lg:divide-x divide-white/20 items-start">
            {/* Left Section */}
            <motion.div 
              ref={leftSectionRef}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-8 lg:pr-8"
            >
              {/* Logo Section */}
              <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1, delay: 0.5 }}
  whileHover={{ 
    scale: 1.05,
    transition: { duration: 0.3 }
  }}
  className="rounded-2xl p-6 md:p-10 flex items-center justify-center"
>
  <motion.div
    animate={{
      y: [0, -15, 0]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <Image
      className="w-[350px] md:w-[450px] lg:w-[700px]"
      src="/images/cadencelogo.png"
      alt="cadence logo"
      width={700}
      height={700}
      priority
    />
  </motion.div>
</motion.div>

              {/* About Section */}
              <motion.div 
                initial={{ y: 80, opacity: 0, rotateX: 45 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  transition: { duration: 0.3 }
                }}
                className="rounded-2xl p-6 md:p-10 w-full bg-gradient-to-br from-transparent to-gray-900/20"
              >
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-cinzel-decorative mb-6 text-center"
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.3)",
                        "0 0 20px rgba(255,255,255,0.5)",
                        "0 0 10px rgba(255,255,255,0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    About <span style={silverGradientStyle}>Cadence</span>
                  </motion.span>
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7, duration: 1 }}
                  className="text-base md:text-lg lg:text-xl xl:text-2xl font-montserrat text-center text-white leading-relaxed"
                >
                  <span style={silverGradientStyle}>Cadence</span> is the flagship event of <span style={silverGradientStyle}>Resonance - the music club of HITK </span>, 
                 it&apos;s a day in which the the campus echoes and roars the voice of music. A celebration of sound, soul, and self-expression, <span style={silverGradientStyle}>Cadence</span>  brings together the most talented vocalists, instrumentalists, and bands from across the region to create an unforgettable symphony of melodies.
                 More than just a competition, <span style={silverGradientStyle}>Cadence</span>  is an emotion — a space where passion meets performance, where every beat echoes the spirit of creativity, and where the stage becomes a canvas for musical storytelling.
                 <span style={silverGradientStyle}>Cadence</span>  promises an experience that resonates long after the final note fades.
                </motion.p>
              </motion.div>

              {/* Events Header */}
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.8 }}
                className="text-3xl md:text-4xl lg:text-5xl font-cinzel-decorative mb-6 text-center"
              >
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(255,255,255,0.3)",
                      "0 0 20px rgba(255,255,255,0.5)",
                      "0 0 10px rgba(255,255,255,0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                >
                  <span style={{ 
                    ...silverGradientStyle,
                    textDecoration: 'underline',
                    textDecorationThickness: '2px',
                    textUnderlineOffset: '8px',
                    textDecorationColor: '#C0C0C0'
                  }}>Events</span> 
                </motion.span>
              </motion.h3>

              {/* Surkala */}
              <motion.div 
                initial={{ y: 80, opacity: 0, rotateX: 45 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  transition: { duration: 0.3 }
                }}
                className="rounded-2xl p-6 md:p-10 w-full bg-gradient-to-br from-transparent to-gray-900/20"
              >
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9, duration: 0.8 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-cinzel-decorative mb-6 text-center"
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.3)",
                        "0 0 20px rgba(255,255,255,0.5)",
                        "0 0 10px rgba(255,255,255,0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  >
                    <span style={silverGradientStyle}>Surkala</span> 
                  </motion.span>
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.1, duration: 1 }}
                  className="text-base md:text-lg lg:text-xl xl:text-2xl font-montserrat text-center text-white leading-relaxed"
                >
                  The <span style={silverGradientStyle}>EASTERN SOLO SINGING COMPETITION</span> is a
                  celebration of <span style={silverGradientStyle}>classical and contemporary vocal</span> 
                  traditions from across the East, Showcasing
                  exceptional solo talents in genres such as
                  <span style={silverGradientStyle}> Hindustani, Carnatic and other indigenous styles</span> 
                </motion.p>
              </motion.div>

              {/* VoxTech */}
              <motion.div 
                initial={{ y: 80, opacity: 0, rotateX: 45 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  transition: { duration: 0.3 }
                }}
                className="rounded-2xl p-6 md:p-10 w-full bg-gradient-to-br from-transparent to-gray-900/20"
              >
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.1, duration: 0.8 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-cinzel-decorative mb-6 text-center"
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.3)",
                        "0 0 20px rgba(255,255,255,0.5)",
                        "0 0 10px rgba(255,255,255,0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  >
                    <span style={silverGradientStyle}>VOXTECH</span> 
                  </motion.span>
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay:2.3, duration: 1 }}
                  className="text-base md:text-lg lg:text-xl xl:text-2xl font-montserrat text-center text-white leading-relaxed"
                >
                 VoxTech is a <span style={silverGradientStyle}>SOLO WESTERN SINGING EVENT</span>
                 that celebrates the art of vocal
                  performance, individual expression and
                  stage presence across diverse western
                  music genres such as <span style={silverGradientStyle}>pop, rock, jazz, blues and contemporary hits.</span>
                </motion.p>
              </motion.div>

              {/* Solo Sync */}
              <motion.div 
                initial={{ y: 80, opacity: 0, rotateX: 45 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 2.0, ease: "easeOut" }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  transition: { duration: 0.3 }
                }}
                className="rounded-2xl p-6 md:p-10 w-full bg-gradient-to-br from-transparent to-gray-900/20"
              >
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.3, duration: 0.8 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-cinzel-decorative mb-6 text-center"
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.3)",
                        "0 0 20px rgba(255,255,255,0.5)",
                        "0 0 10px rgba(255,255,255,0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                  >
                    <span style={silverGradientStyle}>Solo Sync</span>
                  </motion.span>
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5, duration: 1 }}
                  className="text-base md:text-lg lg:text-xl xl:text-2xl font-montserrat text-center text-white leading-relaxed"
                >
                  Solo Sync is the <span style={silverGradientStyle}>ultimate SOLO INSTRUMENTAL FACE OFF</span>, from soulful strings to electrifying
riffs and mesmerizing keys — it is all about
pure, unfiltered musical expression. No
lyrics. No limits. Just you and your
instrument in perfect sync!
                </motion.p>
              </motion.div>

              {/* Battle of Bands */}
              <motion.div 
                initial={{ y: 80, opacity: 0, rotateX: 45 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 2.2, ease: "easeOut" }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  transition: { duration: 0.3 }
                }}
                className="rounded-2xl p-6 md:p-10 w-full bg-gradient-to-br from-transparent to-gray-900/20"
              >
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 0.8 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-cinzel-decorative mb-6 text-center"
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.3)",
                        "0 0 20px rgba(255,255,255,0.5)",
                        "0 0 10px rgba(255,255,255,0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.0 }}
                  >
                    <span style={silverGradientStyle}>Battle of Bands</span>
                  </motion.span>
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.7, duration: 1 }}
                  className="text-base md:text-lg lg:text-xl xl:text-2xl font-montserrat text-center text-white leading-relaxed"
                >
                  Get ready for an adrenaline-pumping 
                  <span style={silverGradientStyle}> musical clash at Battle of Bands.</span> 
                  it&apos;s not just a contest
— it&apos;s a musical warzone where only the most
dynamic and crowd-moving band will claim
the crown. Turn up the volume and feel the
vibe — the stage is yours to conquer!
                </motion.p>
              </motion.div>

              {/* Resonance Band Performance */}
              <motion.div 
                initial={{ y: 80, opacity: 0, rotateX: 45 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 2.4, ease: "easeOut" }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  transition: { duration: 0.3 }
                }}
                className="rounded-2xl p-6 md:p-10 w-full bg-gradient-to-br from-transparent to-gray-900/20"
              >
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.7, duration: 0.8 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-cinzel-decorative mb-6 text-center"
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.3)",
                        "0 0 20px rgba(255,255,255,0.5)",
                        "0 0 10px rgba(255,255,255,0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                  >
                    <span style={silverGradientStyle}>Resonance Band Performance</span>
                  </motion.span>
                </motion.h3>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.9, duration: 1 }}
                  className="text-base md:text-lg lg:text-xl xl:text-2xl font-montserrat text-center text-white leading-relaxed"
                >
                  <p className="mb-4">
                    Get ready to groove as <span style={silverGradientStyle}>Resonance, the official band of Heritage Institute of Technology, takes the stage for a special live performance at Cadence 2025!</span>
                  </p>
                  <p className="mb-4">
                    Known for their electrifying energy
                    and soulful sound, Resonance promises
                    to set the mood with a power-packed mix
                    of classic hits, modern anthems, and
                    original tunes.
                  </p>
                  <p>
                    <span style={silverGradientStyle}>It&apos;s a musical experience that brings the spirit of Cadence to life.</span> Feel the rhythm, sing
                    along, and let Resonance strike the
                    perfect chord with you!
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Section - Sticky Images Gallery with Separate Scroll */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="w-full lg:pl-8"
            >
              {/* Sticky container */}
              <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-10rem)]">
                <div className="relative h-full">
                  {/* Scrollable image container */}
                  <div 
                    ref={scrollContainerRef}
                    className="flex flex-col gap-6 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50 pr-2"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#4B5563 rgba(31, 41, 55, 0.5)'
                    }}
                  >
                    {!imagesReady ? (
                      <>
                        {Array.from({ length: 4 }).map((_, i) => (
                          <motion.div
                            key={`loading-${i}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                            className="bg-gray-700/50 rounded-2xl border border-white/20 overflow-hidden aspect-[3/4] flex items-center justify-center animate-pulse w-full flex-shrink-0"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-10 h-10 border-4 border-t-transparent rounded-full"
                                style={{ borderColor: '#C0C0C0', borderTopColor: 'transparent' }}
                              />
                              <span className="text-gray-400 text-sm">Loading images...</span>
                            </div>
                          </motion.div>
                        ))}
                      </>
                    ) : error ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-700/50 rounded-2xl border border-white/20 p-8 text-center w-full"
                      >
                        <p className="text-red-400 mb-3 text-base">Error loading images</p>
                        <p className="text-gray-400 text-sm">{error}</p>
                        <p className="text-gray-500 text-xs mt-3">Check browser console for details</p>
                      </motion.div>
                    ) : displayedImages.length > 0 ? (
                      <>
                        {displayedImages.map((img, index) => (
                          <motion.div
                            key={getUniqueKey(img, index)}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ 
                              delay: 0.1 + (index * 0.08),
                              duration: 0.5,
                              ease: "easeOut"
                            }}
                            whileHover={{ 
                              scale: 1.03,
                              y: -8,
                              boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
                              transition: { duration: 0.3 }
                            }}
                            className="bg-gray-700/50 rounded-2xl border-2 border-white/20 overflow-hidden aspect-[3/4] flex-shrink-0 w-full group cursor-pointer relative shadow-xl"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                              initial={{ x: "-100%", y: "-100%" }}
                              whileHover={{ x: "100%", y: "100%" }}
                              transition={{ duration: 0.6 }}
                            />
                            
                            {/* Image overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                            
                            <Image
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                              src={img.secure_url}
                              alt={img.public_id || `cadence image ${index + 1}`}
                              width={img.width ?? 500}
                              height={img.height ?? 650}
                              priority={index < initialImagesCount}
                            />
                            
                            {/* Image number badge */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full z-20"
                            >
                              <span className="text-xs font-semibold" style={silverGradientStyle}>
                                {index + 1}
                              </span>
                            </motion.div>
                          </motion.div>
                        ))}
                        
                        {loadingMore && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gray-700/50 rounded-2xl border border-white/20 overflow-hidden aspect-[3/4] flex items-center justify-center w-full flex-shrink-0"
                          >
                            <div className="flex flex-col items-center gap-3">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-10 h-10 border-4 border-t-transparent rounded-full"
                                style={{ borderColor: '#C0C0C0', borderTopColor: 'transparent' }}
                              />
                              <span className="text-gray-400 text-sm">Loading more...</span>
                            </div>
                          </motion.div>
                        )}
                        
                        {!loadingMore && currentIndex >= Math.min(images.length, MAX_IMAGES) && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-700/30 rounded-2xl border border-white/10 p-8 text-center w-full flex-shrink-0"
                          >
                            <motion.p 
                              className="text-gray-400 text-base mb-2"
                              animate={{
                                textShadow: [
                                  "0 0 5px rgba(192, 192, 192, 0.3)",
                                  "0 0 10px rgba(192, 192, 192, 0.5)",
                                  "0 0 5px rgba(192, 192, 192, 0.3)"
                                ]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              ✨ You&apos;ve reached the end! ✨
                            </motion.p>
                            <p className="text-gray-500 text-sm mt-2">
                              {displayedImages.length} of {MAX_IMAGES} images loaded
                            </p>
                          </motion.div>
                        )}
                      </>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-700/50 rounded-2xl border border-white/20 p-8 text-center w-full"
                      >
                        <p className="text-gray-400 text-base mb-2">No images found</p>
                        <p className="text-gray-500 text-sm">
                          Images fetched: {images.length}<br/>
                          Check browser console for API response
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Scroll indicator */}
                  {imagesReady && !error && currentIndex < Math.min(images.length, MAX_IMAGES) && displayedImages.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none z-20"
                    >
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex flex-col items-center gap-1 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full"
                      >
                        <span className="text-xs text-gray-300 font-semibold">Scroll for more</span>
                        <svg 
                          className="w-5 h-5 text-gray-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 9l-7 7-7-7" 
                          />
                        </svg>
                      </motion.div>
                    </motion.div>
                  )}
                  
                  {/* Gradient fade at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Section */}
          <motion.footer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.0 }}
            className="mt-16 pt-12 border-t border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {/* Social Links Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.2, duration: 0.8 }}
                className="flex flex-col items-center md:items-start"
              >
                <h4 className="text-2xl font-cinzel-decorative mb-4" style={silverGradientStyle}>
                  Connect With Us
                </h4>
                <div className="flex gap-4">
                  <motion.a
                    href="https://www.instagram.com/cadence_resonancehitk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-pink-600 to-purple-600 p-4 rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href="https://drive.google.com/file/d/1HNkzyQjkZ-v3cSOliupFRpHpbivAjoq2/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-blue-600 to-cyan-600 p-4 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSerrM_SqBGzTPRvhl6Tt9iQHfcvMqS-qLPFlAvS5GgqZRIU5g/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-green-600 to-emerald-600 p-4 rounded-full hover:shadow-lg hover:shadow-green-500/50 transition-all"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </motion.a>
                </div>
                <br />

                <div className="flex flex-col font-bold gap-2 mt-4 text-sm text-white-800">
                  <p className="flex items-center gap-2">
                    <span className="text-pink-400">⏰</span> 9 A.M. Onwards
                  </p>
                  
                  <p className="flex items-center gap-2">
                    <span className="text-blue-400">📅</span> 2nd November, 2025
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-400">📍</span> Heritage Institute of Technology, Kolkata
                  </p>
                </div>
              </motion.div>

              {/* POC Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.4, duration: 0.8 }}
                className="lg:col-span-2"
              >
                <h4 className="text-2xl font-cinzel-decorative mb-6 text-center md:text-left" style={silverGradientStyle}>
                  Point of Contacts
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pocs.map((poc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 3.6 + index * 0.1, duration: 0.5 }}
                      whileHover={{ 
                        y: -5,
                        boxShadow: "0 10px 30px rgba(192, 192, 192, 0.2)",
                        transition: { duration: 0.3 }
                      }}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all"
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center mb-2">
                          <span className="text-2xl">👤</span>
                        </div>
                        <h5 className="text-lg font-bold" style={silverGradientStyle}>
                          {poc.name}
                        </h5>
                        <p className="text-sm text-gray-400 italic">{poc.role}</p>
                        <div className="mt-2 space-y-1">
                          <a 
                            href={`tel:${poc.phone}`}
                            className="flex items-center justify-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            {poc.phone}
                          </a>
                          {poc.email && (
                            <a 
                              href={`mailto:${poc.email}`}
                              className="flex items-center justify-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                              {poc.email}
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8, duration: 0.8 }}
              className="pt-8 border-t border-white/10 text-center"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-gray-400 text-sm">
                  © 2025 <span style={silverGradientStyle}>Cadence</span> - A flagship event by{" "}
                  <span style={silverGradientStyle}>Resonance, HITK</span>
                </p>
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-2xl"
                  >
                    🎵
                  </motion.span>
                  <p className="text-gray-400 text-sm">
                    Made with <span className="text-red-500">♥</span> by the Resonance Tech Team
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.footer>
        </motion.div>
      </div>

      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 10px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 10px;
        }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
        
        /* Firefox */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #4B5563 rgba(31, 41, 55, 0.5);
        }
      `}</style>
    </motion.div>
  );
}