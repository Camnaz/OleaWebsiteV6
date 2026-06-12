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
  icons: {
    icon: [
      { url: "/images/olea_favicon/favicon.ico" },
      { url: "/images/olea_favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/olea_favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/olea_favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/images/olea_favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
