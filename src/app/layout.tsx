import type { Metadata } from "next";
import { Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  style: ["normal", "italic"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: "Olea Computer | Building the infrastructure for autonomous intelligence",
  description: "We're building the foundational infrastructure for a world where autonomous agents operate as trusted economic participants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        spaceGrotesk.variable,
        playfair.variable,
        spaceGrotesk.className,
        "antialiased min-h-screen flex flex-col bg-white text-black selection:bg-gray-200 selection:text-black"
      )}>
        {children}
      </body>
    </html>
  );
}
