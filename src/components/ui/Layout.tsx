import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { CustomCursor } from "./CustomCursor";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden selection:bg-gray-200 selection:text-black cursor-none">
      <CustomCursor />
      <Navigation />
      <main className="relative z-10">{children}</main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t-[0.5px] border-gray-200 bg-white/80 backdrop-blur-xl py-20 mt-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-serif italic tracking-wide mb-6 block">Olea Computer</span>
              <p className="text-gray-500 max-w-sm font-sans font-light leading-relaxed">
                Building the foundational layer for a world where autonomous agents and LLMs operate as trusted economic participants.
              </p>
            </div>
            
            <div>
              <h4 className="font-sans font-medium tracking-[0.2em] uppercase text-xs mb-8">Ecosystem</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-sans font-light">
                <li><a href="https://xilo.oleacomputer.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors duration-500 cursor-none">XILO (Beta)</a></li>
                <li><a href="https://sylva.oleacomputer.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors duration-500 cursor-none">Sylva (Pre-Beta)</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-sans font-medium tracking-[0.2em] uppercase text-xs mb-8">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-sans font-light">
                <li><a href="/privacy" className="hover:text-black transition-colors duration-500 cursor-none">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-black transition-colors duration-500 cursor-none">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t-[0.5px] border-gray-200 flex flex-col md:flex-row items-center justify-between text-xs font-sans font-light tracking-wide text-gray-500">
            <p>&copy; {new Date().getFullYear()} Olea Computer. All rights reserved.</p>
            <div className="mt-6 md:mt-0 flex space-x-8 uppercase tracking-[0.2em]">
              <a href="https://x.com/oleacomputer" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors duration-500 cursor-none">X (Twitter)</a>
              <a href="https://linkedin.com/company/oleacomputer" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors duration-500 cursor-none">LinkedIn</a>
              <a href="mailto:hello@oleacomputer.com" className="hover:text-black transition-colors duration-500 cursor-none">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
