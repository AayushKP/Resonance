import Background from "@/components/Background";
import { Menu } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      <Background />

      <header className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[70%] bg-[#1f1f1f] rounded-full px-6 py-3 flex justify-between items-center z-20 shadow-md">
        <div className="flex items-baseline space-x-2 font-extrabold text-white text-2xl">
          <span
            className="tracking-widest font-sans"
            style={{ fontFamily: '"Sanskrit2003", sans-serif' }}
          >
            Resonance
          </span>
          <span className="text-red-500 text-xl">2025</span>
        </div>
        <button className="bg-[#2a2a2a] hover:bg-[#333] text-white rounded-full p-2">
          <Menu size={20} />
        </button>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 pt-60">
        <h1
          className="text-6xl font-bold mb-4 tracking-wider"
          style={{ fontFamily: '"Sanskrit2003", sans-serif' }}
        >
          Resonance
        </h1>
        <p className="text-xl max-w-2xl opacity-90">
          The Official Music Club of HITK
        </p>
      </main>
    </div>
  );
}
