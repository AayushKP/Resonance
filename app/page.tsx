import Background from "@/components/Background";
import { Menu } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      <Background />

      <header className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[70%] bg-[#8e8e8e46] rounded-full px-6 py-3 flex justify-between items-center z-20 shadow-md">
        <div className="flex items-baseline space-x-2 font-extrabold text-white text-2xl">
          <span className="tracking-widest font-sanskrit">Resonance</span>
          <span className="text-red-500 text-xl">2025</span>
        </div>
        <button className="bg-[#2a2a2a] hover:bg-[#333] text-white rounded-full p-2">
          <Menu size={20} />
        </button>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 pt-60">
        <h1 className="text-8xl text-red-500/70 font-sanskrit mb-4 tracking-wider">
          Resonance
        </h1>
        <p className="text-xl max-w-2xl opacity-90">
          The Official Music Club of HITK
        </p>
      </main>
    </div>
  );
}
