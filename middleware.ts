// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  if (pathname === "/robots.txt") {
    const isProd =
      hostname === "resonance-hitk.com" ||
      hostname === "www.resonance-hitk.com";

    const newPath = isProd ? "/robots-prod.txt" : "/robots-noindex.txt";
    return NextResponse.rewrite(new URL(newPath, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/robots.txt"],
};
