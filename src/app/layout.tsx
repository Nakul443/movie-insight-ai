// loads the global.css and wraps every page
// frame of the picture, the frame remains the same but the picture changes every time

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Setting up the Inter font for a modern, clean look
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Insight AI",
  description: "AI-powered movie sentiment analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] antialiased`}>
        {/* children represents page.tsx content */}
        {children}
      </body>
    </html>
  );
}