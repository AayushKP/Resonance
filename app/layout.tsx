import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Resonance - Official Music Club of HITK",
  description: "The Official Music Club of HITK",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <div
          className="fixed inset-0 z-[-10] bg-cover bg-center "
          style={{ backgroundImage: "url('/images/background.png')" }}
        />
        <div className="fixed inset-0 z-[-10]">
          <Background />
        </div>
        <div className="">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
