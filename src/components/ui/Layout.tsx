"use client";

import { ReactNode, useEffect, useState } from "react";
import { Navigation } from "./Navigation";
import { CustomCursor } from "./CustomCursor";
import { DotGrid } from "./DotGrid";

export function Layout({ children }: { children: ReactNode }) {
  const [hasCustomCursor, setHasCustomCursor] = useState(false);

  useEffect(() => {
    // Prevent browser from restoring previous scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Force scroll to top on initial load
    window.scrollTo(0, 0);

    // Only apply custom cursor hiding to desktop devices that support it.
    // Wrap in setTimeout to avoid React dev-mode warnings about synchronous state updates in effects.
    setTimeout(() => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      if (!isTouch && window.innerWidth >= 768) {
        setHasCustomCursor(true);
        document.documentElement.classList.add('has-custom-cursor');
        document.body.classList.add('has-custom-cursor');
      }
    }, 0);
  }, []);

  return (
    <div className={`relative min-h-screen text-gray-900 bg-white ${hasCustomCursor ? 'has-custom-cursor' : ''}`}>
      <DotGrid />
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden hidden md:block">
        {/* Quicksilver White layered glassmorphic base with titanium depth - Disabled on mobile for performance */}
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(229,231,235,0.4)_0%,transparent_70%)] mix-blend-multiply" />
        <div className="absolute top-[30%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(209,213,219,0.25)_0%,transparent_70%)] mix-blend-multiply" />
        <div className="absolute -bottom-[25%] left-[15%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(209,213,219,0.2)_0%,transparent_70%)] mix-blend-multiply" />
        <div className="absolute top-[50%] left-[40%] w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(229,231,235,0.3)_0%,transparent_70%)] mix-blend-multiply" />
        
        {/* Brushed titanium noise grain texture */}
        <div className="absolute inset-0 opacity-[0.018] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>
      <CustomCursor />
      <Navigation />
      <main className="relative z-10">{children}</main>

      <footer className="relative z-20 border-t-[0.5px] border-gray-200/60 bg-white/80 backdrop-blur-xl py-4 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <span className="text-sm font-serif tracking-tight text-gray-900">Olea Computer</span>
            
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-sans font-normal tracking-[0.18em] uppercase text-gray-400">
              <a href="https://xilo.oleacomputer.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors duration-500">XILO</a>
              <a href="https://sylva.oleacomputer.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors duration-500">Sylva</a>
              <a href="https://x.com/oleacomputer" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors duration-500">X</a>
              <a href="https://linkedin.com/company/oleacomputer" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors duration-500">LinkedIn</a>
              <a href="/privacy" className="hover:text-gray-600 transition-colors duration-500">Privacy</a>
              <a href="mailto:hello@oleacomputer.com" className="hover:text-gray-600 transition-colors duration-500">Contact</a>
            </div>

            <p className="text-[10px] font-sans text-gray-400 tracking-wide">&copy; {new Date().getFullYear()} Olea Computer</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
