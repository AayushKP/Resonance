import Background from "@/components/Background";
import { Menu } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      <div className="fixed inset-0 z-[-10]">
        <Background />
      </div>

      <header className="fixed top-6 left-1/2 transform -translate-x-1/2 dark:border-neutral-700 shadow backdrop-blur-2xl h-20 w-[90%] md:w-[70%] bg-white/20 dark:bg-neutral-800/20 rounded-3xl px-6 py-3 flex justify-between items-center z-30">
        <div className="flex items-baseline space-x-2 font-extrabold text-white text-2xl">
          <span className="tracking-widest text-4xl font-sanskrit">
            Resonance
          </span>
        </div>
        <button className="bg-[#2a2a2a] hover:bg-[#333] text-white rounded-full p-2">
          <Menu size={20} />
        </button>
      </header>

      <main className="relative z-40 flex flex-col items-center justify-center text-center text-white px-4 pt-60">
        <h1 className="text-8xl text-red-500/70 font-sanskrit mb-1 tracking-wider">
          Resonance
        </h1>
        <p className="text-2xl max-w-2xl opacity-90 font-sanskrit">
          The Official Music Club of HITK
        </p>
      </main>
    </div>
  );
}
