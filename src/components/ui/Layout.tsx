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
      <footer className="relative z-10 border-t border-gray-100 bg-white/80 backdrop-blur-md py-12 mt-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-xl font-bold tracking-tight mb-4 block">Olea Computer</span>
              <p className="text-gray-500 max-w-sm">
                Building the infrastructure for autonomous intelligence.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="https://xilo.oleacomputer.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors cursor-none">XILO (Beta)</a></li>
                <li><a href="https://sylva.oleacomputer.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors cursor-none">Sylva (Pre-Beta)</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="/privacy" className="hover:text-black transition-colors cursor-none">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-black transition-colors cursor-none">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Olea Computer. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="https://x.com/oleacomputer" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors cursor-none flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.964H5.078z"></path></svg>
                Twitter
              </a>
              <a href="https://linkedin.com/company/oleacomputer" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors cursor-none flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a href="mailto:hello@oleacomputer.com" className="hover:text-black transition-colors cursor-none">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
