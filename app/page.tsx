import ScrollingImageRows from "@/components/ScrollImageGrid";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      <div className="absolute pointer-events-none top-14 left-1/2 transform -translate-x-1/2 z-20">
        <Image
          priority
          className=" w-full h-auto object-contain spin-zoom"
          src="/images/resonance.png"
          alt="resonance logo"
          width={450}
          height={200}
        />
      </div>
      <main className="z-30 flex flex-col items-center justify-center text-center text-white px-4 pt-52 xl:pt-60">
        <section>
          <h1 className="text-9xl text-metal font-gothic mb-1 tracking-widest">
            Resonance
          </h1>
          <p className="text-4xl max-w-2xl text-white opacity-90 font-sanskrit">
            The Official Music Club of{" "}
            <span className=" text-4xl font-serif ">HITK</span>
          </p>
        </section>

        <section className="mt-56">
          <ScrollingImageRows />
        </section>

        <section className="mt-10 px-20 ">
          <div className="text-center">
            <h2 className="text-8xl font-sanskrit mb-4">
              What is <span className="text-metal">Resonance</span> ? :
            </h2>
          </div>

          <div className="grid grid-cols-2 items-center gap-2">
            <div className="">
              <Image
                className="w-[500px]"
                src="/images/resonance.png"
                alt="resonance logo"
                width={300}
                height={300}
              />
            </div>
            <div>
              <p className="text-2xl font-tagesschrift text-left text-white leading-relaxed">
                Resonance is not just another college club - it is a collective
                of excellence,a crucible for talent. This is a place where
                musical excellence is cultivated, celebrated, and pushed to
                greater heights. Resonance has earned it&#39;s stature through
                consistent victories across the most prestigious stages- IIT
                Kharagpur,CNMC AGON, Jadavpur Sanskriti, and many more. We've
                been led by coordinators and seniors who are now active
                professionals in theindustry,collaborating with stalwarts.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-30 border border-red-800 text-5xl font-sanskrit w-full px-20">
          CO-ORDINATORS
          <div className="flex flex-col items-center gap-6">
            <div className="flex justify-center gap-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`r1-${i}`}
                  className="w-52 h-52 rounded-full bg-blue-500"
                />
              ))}
            </div>

            <div className="flex justify-center gap-10">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`r2-${i}`}
                  className="w-52 h-52 rounded-full bg-green-500"
                />
              ))}
            </div>

            <div className="flex justify-center gap-10">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={`r3-${i}`}
                  className="w-52 h-52 rounded-full bg-red-500"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="absolute bottom-0 right-0 p-4 z-50">
        <div className="flex space-x-6 items-center bg-white/20 backdrop-blur-md rounded-2xl p-3">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg
              className="w-6 h-6 text-white hover:text-red-500 transition"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-2a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
            </svg>
          </a>

          <a href="mailto:resonance@hitk.edu.in" aria-label="Email">
            <svg
              className="w-6 h-6 text-white hover:text-red-500 transition"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 13 4 6.01V6h16ZM4 18v-9.19l7.39 6.16a1 1 0 0 0 1.22 0L20 8.81V18H4Z" />
            </svg>
          </a>

          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg
              className="w-6 h-6 text-white hover:text-red-500 transition"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.5 22V12.5h3.25l.5-4h-3.75V6c0-1.1.3-1.85 1.9-1.85H17V1.2c-.9-.12-2.02-.2-3.1-.2-3.05 0-5.15 1.86-5.15 5.25v3h-3v4h3v9H13.5Z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
