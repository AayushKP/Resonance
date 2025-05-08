"use client";

import { motion } from "framer-motion";
import HorizontalScroll from "@/components/HorizontalScroll";
import ScrollingImageRows from "@/components/ScrollImageGrid";
import Image from "next/image";
import coordinators from "@/public/data/coordinators.json";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      <main className="z-30 relative flex flex-col items-center justify-center text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-52 md:mt-0 md:h-screen flex flex-col items-center justify-center text-center"
        >
          <section>
            <BlurFade>
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl xl:text-8xl 2xl:text-9xl text-metal font-cinzel-decorative mb-1 md:tracking-widest"
              >
                Resonance
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full flex justify-center"
              >
                <p className="text-2xl md:text-4xl max-w-2xl text-white tracking-tight opacity-90 font-sanskrit text-center">
                  <span>The Official Music Club of </span>
                  <span className="font-serif">HITK</span>
                </p>
              </motion.div>
            </BlurFade>
          </section>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-2"
        >
          <ScrollingImageRows />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-5 py-10"
        >
          <div className="absolute inset-0 bg-black/10 backdrop-blur-md rounded-xl z-0" />
          <div className="relative z-10 lg:px-20">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-cinzel-decorative mb-4 items-center">
                About <span className="text-metal">Resonance</span>
              </h2>
            </div>
            <div className="grid grid-rows-1 lg:grid-cols-2 lg:items-center gap-0 md:gap-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex justify-center lg:justify-start items-center"
              >
                <Image
                  className="w-[500px]"
                  src="/images/resonance.png"
                  alt="resonance logo"
                  width={300}
                  height={300}
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-xl 2xl:text-2xl font-montserrat text-justify text-white leading-relaxed px-3 md:px-5">
                  <span className="text-metal">Resonance</span> is more than
                  just a music club, it&apos;s a{" "}
                  <span className="text-metal">community of musicians</span> who
                  live for their craft. Whether you&apos;re into vocals or
                  instruments, bands or solo acts, this is where you&apos;ll
                  find people who understand your passion. At Resonance,{" "}
                  <span className="text-metal">we push each other to grow</span>
                  , to perform, and to create something meaningful together.
                  Over the years, we&apos;ve performed and won at some of the
                  biggest college fests like{" "}
                  <span className="text-metal">
                    IIT Kharagpur, CNMC AGON, Jadavpur Sanskriti,
                  </span>{" "}
                  and more. But beyond the achievements, what defines us is the
                  bond we share through music. If you&apos;re serious about
                  music, eager to collaborate, and ready to be part of something
                  bigger, then{" "}
                  <span className="text-metal">
                    Resonance is where you belong
                  </span>
                  .
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 text-4xl md:text-6xl font-cinzel-decorative w-full mb-10"
        >
          CO<span className="text-metal">ORDINATORS</span>
          <div className="flex flex-col items-center justify-center gap-10 py-10 px-4">
            <div className="flex flex-wrap justify-center gap-6 relative">
              {coordinators
                .slice(0, Math.ceil(coordinators.length / 2))
                .map((coordinator, i) => (
                  <motion.div
                    key={`c1-${i}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="w-28 h-28 md:w-32 md:h-32 lg:w-44 lg:h-44 rounded-full bg-transparent relative overflow-hidden"
                  >
                    <Image
                      priority
                      src={coordinator.src}
                      alt={coordinator.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-opacity-60" />
                  </motion.div>
                ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {coordinators
                .slice(Math.ceil(coordinators.length / 2))
                .map((coordinator, i) => (
                  <motion.div
                    key={`c2-${i}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="w-28 h-28 md:w-32 md:h-32 lg:w-44 lg:h-44 rounded-full bg-transparent relative overflow-hidden"
                  >
                    <Image
                      priority
                      src={coordinator.src}
                      alt={coordinator.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-opacity-60" />
                  </motion.div>
                ))}
            </div>
          </div>
          <HorizontalScroll />
        </motion.section>
      </main>
      <footer className="w-full backdrop-blur-xl bg-black/20 p-5 flex flex-col items-center gap-5 font-cinzel-decorative text-white relative">
        <div className="text-3xl">
          Contact <span className="text-metal">Us</span>
        </div>

        <div className="flex flex-col items-center gap-4 text-sm">
          <div className="flex flex-wrap justify-center gap-4">
            {coordinators.slice(0, 7).map((coordinator, index) => (
              <a
                key={index}
                href={`mailto:${coordinator.mail}`}
                target="_blank"
                className="cursor-pointer hover:text-yellow-500"
              >
                {coordinator.name}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {coordinators.slice(7, 10).map((coordinator, index) => (
              <a
                key={index + 7}
                href={`mailto:${coordinator.mail}`}
                target="_blank"
                className="cursor-pointer hover:text-yellow-500"
              >
                {coordinator.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:otriyo.ghosh.ece26@hitk.edu.in"
            aria-label="Email"
            target="_blank"
          >
            <svg
              className="w-7 h-7 text-white hover:text-yellow-500 transition"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 13 4 6.01V6h16ZM4 18v-9.19l7.39 6.16a1 1 0 0 0 1.22 0L20 8.81V18H4Z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/resonancehitk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg
              className="w-6 h-6 text-white hover:text-yellow-500 transition"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-2a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
            </svg>
          </a>
        </div>

        <div className="text-sm font-montserrat ">&copy; Resonance 2025</div>
      </footer>
    </div>
  );
}
