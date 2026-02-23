import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Olea Computer | Building the infrastructure for autonomous intelligence",
  description: "We're building the foundational infrastructure for a world where autonomous agents operate as trusted economic participants.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        spaceGrotesk.className,
        "antialiased min-h-screen flex flex-col bg-white text-black selection:bg-gray-200 selection:text-black"
      )}>
        {children}
      </body>
    </html>
  );
}
