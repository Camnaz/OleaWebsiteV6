import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

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
        inter.className,
        "antialiased min-h-screen flex flex-col bg-white text-black selection:bg-gray-200 selection:text-black"
      )}>
        {children}
      </body>
    </html>
  );
}
