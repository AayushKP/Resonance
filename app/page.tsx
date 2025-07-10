"use client";
import Head from "next/head";
import { motion } from "framer-motion";
import HorizontalScroll from "@/components/HorizontalScroll";
import ScrollingImageRows from "@/components/ScrollImageGrid";
import Image from "next/image";
import coordinators from "@/lib/data/coordinators.json";
import teacherCoordinator from "@/lib/data/teacherCoordinator.json";
import { BlurFade } from "@/components/magicui/blur-fade";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import alumni from "@/lib/data/alumni.json";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://resonance-hitk.com/"
        />
        <title>
          Resonance - Official Music Club of HITK
        </title>
        <meta
          name="description"
          content={
            "This is the official website of the music club of Heritage Institute of Technology,Kolkata (HITK)."
          }
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Resonance - Official Music Club of HITK"
        />
        <meta
          property="og:description"
          content={
            "This is the official website of the music club of Heritage Institute of Technology,Kolkata (HITK)."
          }
        />
        <meta
          property="og:image"
          content={"https://resonance-hitk.com/preview.jpg"}
        />
        <meta
          property="og:url"
          content={"https://resonance-hitk.com/"}
        />
        <meta
          name="twitter:image"
          content={"https://resonance-hitk.com/preview.jpg"}
        />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:title"
          content="Resonance - Official Music Club of HITK"
        />
        <meta
          name="twitter:description"
          content="This is the official website of the music club of Heritage Institute of Technology,Kolkata (HITK)."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Resonance",
              url: "https://resonance-hitk.com/",
              image:
                "https://resonance-hitk.com/preview.jpg",
            }),
          }}
        />
      </Head>
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
                  className="text-5xl md:text-8xl 2xl:text-9xl text-metal font-cinzel-decorative mb-1 md:tracking-widest"
                >
                  Resonance
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <p className="text-lg md:text-4xl max-w-2xl text-white tracking-tight opacity-90 font-sanskrit text-center">
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
            viewport={{ once: true }}
            className="relative mt-5 py-10"
          >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-md rounded-xl z-0" />
            <div className="relative z-10 lg:px-20">
              <div className="text-center">
                <h2 className="text-3xl md:text-6xl font-cinzel-decorative mb-4 items-center">
                  About{" "}
                  <span className="text-metal">
                    Resonance
                  </span>
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
                  <p className="text-md md:text-lg 2xl:text-2xl font-montserrat text-justify text-white leading-relaxed px-3 md:px-5">
                    <span className="text-metal">
                      Resonance
                    </span>{" "}
                    is more than just a music club,
                    it&apos;s a{" "}
                    <span className="text-metal">
                      community of musicians
                    </span>{" "}
                    who live for their craft. Whether
                    you&apos;re into vocals or instruments,
                    bands or solo acts, this is where
                    you&apos;ll find people who understand
                    your passion. At Resonance,{" "}
                    <span className="text-metal">
                      we push each other to grow
                    </span>
                    , to perform, and to create something
                    meaningful together. Over the years,
                    we&apos;ve performed and won at some of
                    the biggest college fests like{" "}
                    <span className="text-metal">
                      IIT Kharagpur, CNMC AGON, Jadavpur
                      Sanskriti,
                    </span>{" "}
                    and more. But beyond the achievements,
                    what defines us is the bond we share
                    through music. If you&apos;re serious
                    about music, eager to collaborate, and
                    ready to be part of something bigger,
                    then{" "}
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
            className="flex flex-col justify-start items-center mt-16 sm:mt-20"
          >
            <div className="font-cinzel-decorative text-3xl md:text-5xl xxl:text-6xl text-center">
              NOTABLE{" "}
              <span className="text-metal">ALUMNI</span>
            </div>

            <div className="grid grid-cols-3 gap-4 md:flex md:justify-center md:gap-6 py-8 px-2">
              {alumni.map((alum, index) => (
                <motion.div
                  key={`alum-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  className="flex-shrink-0 flex flex-col items-center w-full md:w-1/6"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                    }}
                    className="group w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-transparent relative overflow-hidden cursor-pointer"
                  >
                    <Image
                      priority
                      src={alum.src}
                      alt={
                        alum.alt ||
                        alum.name ||
                        `Alumni ${index + 1}`
                      }
                      fill
                      className="object-cover rounded-full"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-opacity-60 rounded-full" />
                  </motion.div>

                  <div className="text-center mt-3">
                    <div className="bg-white/10 backdrop-blur-sm p-2 px-3 rounded-md text-xs md:text-sm lg:text-base font-cinzel-decorative text-white">
                      {alum.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <VelocityScroll>
            Resonance{" "}
            <span className="text-metal">2025</span>
          </VelocityScroll>

          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-start items-center mt-10 sm:mt-20"
          >
            <div className="font-cinzel-decorative text-3xl md:text-5xl xxl:text-6xl">
              FACULTY{" "}
              <span className="text-metal">
                COORDINATORS
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-10">
              {teacherCoordinator.map(
                (coordinator, index) => {
                  const isOdd = index % 2 === 1;

                  return (
                    <motion.div
                      key={index}
                      initial={{
                        y: 40,
                        x: isOdd ? 80 : -80,
                      }}
                      whileInView={{
                        y: 0,
                        x: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className={`flex flex-col md:flex-row ${
                        isOdd ? "md:flex-row-reverse" : ""
                      } items-center gap-4`}
                    >
                      <div className="w-28 h-28 md:w-52 md:h-52 rounded-full overflow-hidden outline-1 outline-offset-1 outline-white/80 relative shrink-0">
                        <Image
                          priority
                          src={coordinator.src}
                          alt={
                            coordinator.alt ||
                            `Coordinator ${index + 1}`
                          }
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="w-64 md:w-80 flex flex-col cursor-pointer justify-center h-32 md:h-44 py-3 gap-1 rounded-xl backdrop-blur-xl bg-black/10 border px-4 transform transition-transform duration-500 hover:scale-105 ease-in-out">
                        <div className="text-md whitespace-normal font-cinzel-decorative overflow-hidden">
                          {coordinator.name}
                        </div>
                        <a
                          href={`mailto:${coordinator.mail}`}
                        >
                          <div className="text-xs tracking-wider text-metal whitespace-normal font-Montserrat overflow-hidden">
                            {coordinator.mail}
                          </div>
                        </a>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-14 text-3xl md:text-5xl font-cinzel-decorative w-full mb-8 sm:mb-10"
          >
            CO<span className="text-metal">ORDINATORS</span>
            <div className="flex flex-col items-center justify-center gap-8 py-10 px-2 sm:hidden">
              {(() => {
                const pattern = [3, 2];
                const rows = [];
                let index = 0;
                let count = 0;

                while (index < coordinators.length) {
                  const groupSize =
                    pattern[count % pattern.length];
                  const group = coordinators.slice(
                    index,
                    index + groupSize
                  );
                  rows.push(group);
                  index += groupSize;
                  count++;
                }

                return rows.map((group, rowIndex) => (
                  <div
                    key={`mobile-row-${rowIndex}`}
                    className="flex flex-wrap justify-center gap-4"
                  >
                    {group.map((coordinator, i) => (
                      <motion.div
                        key={`mobile-coord-${rowIndex}-${i}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.05,
                        }}
                        className="w-28 h-28 rounded-full bg-transparent relative overflow-hidden"
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
                ));
              })()}
            </div>
            <div className="hidden sm:flex flex-col items-center justify-center gap-10 py-10 px-2">
              <div className="flex flex-wrap justify-center gap-6">
                {coordinators
                  .slice(0, 5)
                  .map((coordinator, i) => (
                    <motion.div
                      key={`desktop-1-${i}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.05,
                      }}
                      className="w-28 h-28 lg:w-36 lg:36 xl:w-40 xl:h-40 rounded-full bg-transparent relative overflow-hidden"
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
                  .slice(5)
                  .map((coordinator, i) => (
                    <motion.div
                      key={`desktop-2-${i}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.05,
                      }}
                      className="w-28 h-28 lg:w-36 lg:36 xl:w-40 xl:h-40 rounded-full bg-transparent relative overflow-hidden"
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
          <div className="text-2xl">
            Contact <span className="text-metal">Us</span>
          </div>

          <div className="flex flex-col items-center gap-4 text-xs">
            <div className="flex flex-wrap justify-center gap-4">
              {coordinators
                .slice(0, 7)
                .map((coordinator, index) => (
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
              {coordinators
                .slice(7, 10)
                .map((coordinator, index) => (
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
              href="mailto:resonance.hit@gmail.com"
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

          <div className="text-xs font-montserrat ">
            &copy; Resonance 2025
          </div>
        </footer>
      </div>
    </>
  );
}
