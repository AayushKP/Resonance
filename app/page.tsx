import HorizontalScroll from "@/components/HorizontalScroll";
import ScrollingImageRows from "@/components/ScrollImageGrid";
import Image from "next/image";
import coordinators from "@/public/data/coordinators.json";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      <main className="z-30 relative flex flex-col items-center justify-center text-center text-white">
        <div className="mt-52 md:mt-0 md:h-screen flex flex-col items-center justify-center text-center">
          <section>
            <h1 className="text-6xl md:text-8xl xl:text-8xl 2xl:text-9xl text-metal font-cinzel-decorative  mb-1  md:tracking-widest">
              Resonance
            </h1>
            <div className="w-full flex justify-center">
              <p className="text-2xl md:text-4xl max-w-2xl text-white tracking-tight opacity-90 font-sanskrit text-center">
                <span>The Official Music Club of </span>
                <span className="font-serif">HITK</span>
              </p>
            </div>
          </section>
        </div>

        <section className="mt-2">
          <ScrollingImageRows />
        </section>

        <section className="relative mt-5 py-10 ">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-md rounded-xl z-0" />

          <div className="relative z-10 lg:px-20">
            <div className="text-center">
              <h2 className=" text-5xl md:text-6xl font-cinzel-decorative mb-4 items-center">
                About <span className="text-metal">Resonance </span>
              </h2>
            </div>

            <div className="grid grid-rows-1 lg:grid-cols-2 lg:items-center gap-0 md:gap-2">
              <div className="flex justify-center lg:justify-start items-center ">
                <Image
                  className="w-[500px]"
                  src="/images/resonance.png"
                  alt="resonance logo"
                  width={300}
                  height={300}
                />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-montserrat text-justify text-white leading-relaxed  px-3 md:px-5">
                  Resonance is not just another college club - it is a
                  collective of excellence, a crucible for talent. This is a
                  place where musical excellence is cultivated, celebrated, and
                  pushed to greater heights. Resonance has earned its stature
                  through consistent victories across the most prestigious
                  stages — IIT Kharagpur, CNMC AGON, Jadavpur Sanskriti, and
                  many more. We've been led by coordinators and seniors who are
                  now active professionals in the industry, collaborating with
                  stalwarts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 text-5xl md:text-6xl  font-cinzel-decorative w-full mb-10">
          CO<span className="text-metal">ORDINATORS</span>
          <div className="flex flex-col items-center justify-center gap-10 py-10 px-4">
            <div className="flex flex-wrap justify-center gap-6 relative">
              {coordinators
                .slice(0, Math.ceil(coordinators.length / 2))
                .map((coordinator, i) => (
                  <div
                    key={`c1-${i}`}
                    className="w-28 h-28 md:w-32 md:h-32 lg:w-44 lg:h-44 rounded-full bg-transparent relative overflow-hidden"
                  >
                    <Image
                      src={coordinator.src}
                      alt={coordinator.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-opacity-60" />
                  </div>
                ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 ">
              {coordinators
                .slice(Math.ceil(coordinators.length / 2))
                .map((coordinator, i) => (
                  <div
                    key={`c2-${i}`}
                    className="w-28 h-28 md:w-32 md:h-32 lg:w-44 lg:h-44 rounded-full bg-transparent relative overflow-hidden"
                  >
                    <Image
                      src={coordinator.src}
                      alt={coordinator.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-opacity-60" />
                  </div>
                ))}
            </div>
          </div>
          <HorizontalScroll />
        </section>
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
