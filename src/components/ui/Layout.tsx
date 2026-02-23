import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { CustomCursor } from "./CustomCursor";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden selection:bg-gray-200 selection:text-black">
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
                <li><a href="https://sylva.oleacomputer.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Sylva</a></li>
                <li><span className="text-gray-400 cursor-not-allowed">XILO (Beta Soon)</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="/privacy" className="hover:text-black transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-black transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Olea Computer. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="https://twitter.com/oleacomputer" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Twitter</a>
              <a href="mailto:hello@oleacomputer.com" className="hover:text-black transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
