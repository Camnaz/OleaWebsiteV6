"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ContactPanel } from "./ContactPanel";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a mailto link, just close and let default happen
    if (href.startsWith("mailto:")) {
      setIsMobileMenuOpen(false);
      return;
    }

    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    // Trigger the React state update to close the menu
    setIsMobileMenuOpen(false);
    
    if (element) {
      // Defer the scroll until after React has processed the unmount and unlocked the body
      // This prevents the "laggy" UX on mobile where scroll fights with React render
      setTimeout(() => {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 50);
    }
  };

  const navLinks = [
    { name: "Ecosystem", href: "#products" },
    { name: "Vision", href: "#vision" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? "bg-white/40 backdrop-blur-2xl border-b border-gray-200/40 shadow-[0_8px_32px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] py-[10px]" 
            : "bg-white/20 backdrop-blur-lg py-[14px]"
        }`}
      >
        <div className="absolute inset-0 bg-linear-to-b from-white/70 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 flex items-center justify-between relative z-10 h-9">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0 }); // Immediate scroll prevents framerate lag that occurs when combining JS smoothscroll with CSS scroll-smooth
            }}
            className="flex items-center space-x-3 cursor-none group"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center"
            >
              <span className="text-xl font-serif tracking-tight text-gray-900 group-hover:text-emerald-600 transition-colors duration-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">Olea Computer</span>
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10 px-8 py-3">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 + 0.1, ease: "easeOut" }}
              >
                {link.name === "Contact" ? (
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-gray-700 hover:text-emerald-600 transition-colors duration-500 cursor-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-gray-700 hover:text-emerald-600 transition-colors duration-500 cursor-none relative group drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
                  >
                    {link.name}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 text-gray-700 p-2 cursor-none bg-white/70 backdrop-blur-xl rounded-full border border-gray-200/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_10px_rgba(0,0,0,0.06)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation (Portaled out of header flow to avoid transform issues) */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        className="fixed inset-0 bg-white/95 backdrop-blur-2xl z-60"
      >
        <div className="absolute inset-0 bg-linear-to-br from-emerald-50/40 via-gray-50/30 to-transparent pointer-events-none" />

        <div className="absolute top-0 left-0 right-0 z-30 py-[14px]">
          <div className="container mx-auto px-6 flex items-center justify-between h-9">
            <a
              href="#"
              className="flex items-center space-x-3 cursor-none"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0 });
              }}
            >
              <div className="flex items-center">
                <span className="text-xl font-serif tracking-tight text-gray-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">Olea Computer</span>
              </div>
            </a>
            <button
              className="text-gray-700 p-2 cursor-none bg-white/70 backdrop-blur-xl rounded-full border border-gray-200/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_10px_rgba(0,0,0,0.06)]"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center space-y-12 pt-24 pointer-events-none">
        
        {navLinks.map((link, i) => (
          <motion.div
            key={link.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: isMobileMenuOpen ? i * 0.1 : 0, ease: "easeOut" }}
            className="relative z-10 pointer-events-auto"
          >
            {link.name === "Contact" ? (
              <button
                className="text-2xl font-sans font-medium tracking-[0.2em] uppercase text-gray-800 cursor-none hover:text-emerald-600 transition-colors duration-300 relative z-10"
                onClick={() => { setIsMobileMenuOpen(false); setIsContactOpen(true); }}
              >
                {link.name}
              </button>
            ) : (
              <a
                href={link.href}
                className="text-2xl font-sans font-medium tracking-[0.2em] uppercase text-gray-800 cursor-none hover:text-emerald-600 transition-colors duration-300 relative z-10"
                onClick={(e) => handleMobileLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            )}
          </motion.div>
        ))}
        </div>
      </motion.div>
      <ContactPanel isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
