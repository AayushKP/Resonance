import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Resonance - Official Music Club of HITK",
  description: "The Official Music Club of HITK",
  openGraph: {
    title: "Resonance - Music Club of HITK",
    description: "Explore the sounds and spirit of HITK's official music club.",
    url: "https://resonance-hitk.com",
    siteName: "Resonance",
    images: [
      {
        url: "/resonance-img.png",
        width: 1200,
        height: 630,
        alt: "Resonance: The Official Music Club of HITK",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <Analytics />
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
