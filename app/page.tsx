import Background from "@/components/Background";
import { Menu } from "lucide-react";

export default function Home() {
  return (
    <div className="relative h-[100dvh] overflow-hidden font-sans">
      <div className="fixed inset-0 z-[-10]">
        <Background />
      </div>

      <header className="fixed top-6 left-1/2 transform -translate-x-1/2  shadow backdrop-blur-2xl h-20 w-[90%] md:w-[85%] bg-white/20 rounded-3xl px-12 py-3 flex justify-between items-center z-30">
        <div className="flex items-baseline font-extrabold text-white text-2xl">
          <div>
            {" "}
            <span className="text-4xl font-sanskrit">
              <span className="text-red-500">Reso</span>
              nance
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-4 text-xl text-white font-sanskrit tracking-widest ">
          <div className="flex space-x-4">
            <div className="cursor-pointer">Home</div>
            <div className="cursor-pointer">Gallery</div>
            <div className="cursor-pointer">Events</div>
          </div>
          <div className="bg-red-600 text-center py-1 px-3 rounded-lg">
            Achievements
          </div>
        </div>
      </header>

      <main className="relative z-40 flex flex-col items-center justify-center text-center text-white px-4 pt-52">
        <h1 className="text-9xl text-red-600/80 font-gothic mb-1 tracking-wider">
          Resonance
        </h1>
        <p className="text-3xl max-w-2xl opacity-90 font-sanskrit">
          The Official Music Club of{" "}
          <span className=" text-3xl font-mono ">HITK</span>
        </p>
      </main>

      <footer className="absolute bottom-0 right-0 p-4 z-40">
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
