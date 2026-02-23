"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { OleaLogo } from "./OleaLogo";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Ecosystem", href: "#products" },
    { name: "Vision", href: "#vision" },
    { name: "Contact", href: "mailto:hello@oleacomputer.com" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4" : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 relative z-50 cursor-none group">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center space-x-3"
          >
            <OleaLogo className="w-7 h-7 group-hover:scale-110 transition-transform duration-500" />
            <span className="text-xl font-light tracking-widest uppercase">Olea Computer</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-12">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 + 0.2, ease: "easeOut" }}
            >
              <Link
                href={link.href}
                className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 hover:text-black transition-colors duration-500 cursor-none relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-black transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 text-black p-2 cursor-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} className="font-light" /> : <Menu size={24} className="font-light" />}
        </button>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            pointerEvents: isMobileMenuOpen ? "auto" : "none",
          }}
          className="fixed inset-0 bg-white/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center space-y-12"
        >
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: isMobileMenuOpen ? i * 0.1 : 0, ease: "easeOut" }}
            >
              <Link
                href={link.href}
                className="text-2xl font-light tracking-[0.3em] uppercase text-black cursor-none hover:opacity-50 transition-opacity duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
