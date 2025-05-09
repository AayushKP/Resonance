"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = [
    { path: "/", label: "Home" },
    { path: "/merch", label: "Merch" },
    { path: "/events", label: "Events" },
    { path: "/gallery", label: "Gallery" },
  ];

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 shadow backdrop-blur-2xl h-20 w-[90%] md:w-[85%] bg-white/10 rounded-3xl px-6 md:px-12 py-3 flex justify-between items-center z-50">
      <div className="flex items-center space-x-3 font-extrabold text-white text-2xl">
        <Image
          src="/images/hitk-logo.png"
          alt="resonance logo"
          width={50}
          height={50}
        />
        <span className="inline font-cinzel-decorative-bold text-lg lg:text-xl">
          <span className="text-metal">Reso</span>
          nance
        </span>
      </div>

      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white cursor-pointer"
          aria-label="Toggle menu"
        >
          <Menu size={28} />
        </button>
      </div>

      <div className="hidden lg:flex items-center space-x-6 text-white font-cinzel-decorative tracking-widest text-md">
        {routes.map(({ path, label }) => (
          <Link
            key={path}
            href={path}
            className={clsx("cursor-pointer", {
              "text-yellow-400": pathname === path,
            })}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/achievements"
          className={clsx(
            "cursor-pointer bg-gradient-to-r from-yellow-800 via-yellow-500 to-yellow-900 text-center py-1 px-3 rounded-lg",
            {
              "text-yellow-400": pathname === "/achievements",
            }
          )}
        >
          Achievements
        </Link>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[90%] bg-[#3f3939] rounded-xl shadow-md p-4 flex flex-col space-y-4 text-white z-50 font-cinzel-decorative text-md lg:hidden"
          >
            {routes.map(({ path, label }) => (
              <Link
                key={path}
                href={path}
                onClick={() => setIsMenuOpen(false)}
                className={clsx("hover:text-yellow-500 cursor-pointer", {
                  "text-yellow-400": pathname === path,
                })}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/achievements"
              onClick={() => setIsMenuOpen(false)}
              className="cursor-pointer bg-gradient-to-r from-yellow-800 via-yellow-500 to-yellow-900 text-center py-1 px-3 rounded-lg"
            >
              Achievements
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
