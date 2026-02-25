import type { Metadata } from "next";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const ibmPlexSans = IBM_Plex_Sans({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600"],
  variable: "--font-space"
});

const sourceSerif4 = Source_Serif_4({ 
  subsets: ["latin"], 
  weight: ["200", "300", "400", "600"],
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
        ibmPlexSans.variable,
        sourceSerif4.variable,
        ibmPlexSans.className,
        "antialiased min-h-screen flex flex-col text-black selection:bg-gray-200 selection:text-black"
      )}>
        {children}
      </body>
    </html>
  );
}
