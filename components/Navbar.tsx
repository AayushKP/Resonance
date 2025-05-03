"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Navbar = () => {
  const pathname = usePathname();

  const routes = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    { path: "/gallery", label: "Gallery" },
  ];

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 shadow backdrop-blur-2xl h-20 w-[90%] md:w-[85%] bg-white/10 rounded-3xl px-12 py-3 flex justify-between items-center z-50">
      <div className="flex items-center justify-center space-x-3 font-extrabold text-white text-2xl">
        <div>
          <Image
            src="/images/hitk-logo.png"
            alt="resonance logo"
            width={50}
            height={50}
          />
        </div>
        <div>
          <span className="text-2xl font-cinzel-decorative-black font-bold">
            <span className="text-metal">Reso</span>
            nance
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-4 text-md text-white font-cinzel-decorative tracking-widest">
        <div className="flex space-x-6">
          {routes.map(({ path, label }) => (
            <Link
              key={path}
              href={path}
              className={clsx("cursor-pointer  ", {
                "text-yellow-400": pathname === path,
              })}
            >
              {label}
            </Link>
          ))}
        </div>
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
    </div>
  );
};

export default Navbar;
