"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Cpu, Layers, Shield } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Scene } from "@/components/3d/Scene";
import { Layout } from "@/components/ui/Layout";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <Layout>
      <div ref={containerRef} className="relative w-full">
        {/* 3D Background */}
        <Scene />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <motion.div 
            style={{ opacity, scale }}
            className="container mx-auto px-6 relative z-10 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm mb-8 text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-black mr-2"></span>
                Building the autonomous economy
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                Infrastructure for <br className="hidden md:block" />
                <span className="text-gradient">autonomous intelligence</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                We&apos;re building the foundational infrastructure for a world where autonomous agents operate as trusted economic participants.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="#products" className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center group">
                  Explore Products
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#about" className="w-full sm:w-auto px-8 py-4 bg-white text-black border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                  Learn More
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400"
          >
            <span className="text-sm font-medium mb-2 tracking-widest uppercase">SCROLL</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
          </motion.div>
        </section>

        {/* Vision Section */}
        <section id="about" className="relative min-h-screen flex items-center py-32 bg-white/40 backdrop-blur-sm z-10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-4xl md:text-5xl font-bold tracking-tight mb-8"
              >
                The Future is Agentic
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 leading-relaxed mb-12"
              >
                We believe the future of work involves human-agent collaboration. Olea Computer creates the frameworks where AI agents can be owned, trained, validated, and rewarded on-chain, making this future safe, transparent, and economically viable.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {[
                  {
                    icon: <Shield className="w-6 h-6 mb-4" />,
                    title: "Trust",
                    desc: "Cryptographic verification and transparency at every layer."
                  },
                  {
                    icon: <Layers className="w-6 h-6 mb-4" />,
                    title: "Elegance",
                    desc: "Simple, refined interfaces that abstract complex infrastructure."
                  },
                  {
                    icon: <Cpu className="w-6 h-6 mb-4" />,
                    title: "Innovation",
                    desc: "Operating at the cutting-edge intersection of blockchain and AI."
                  }
                ].map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="p-6 rounded-2xl bg-white/60 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {feature.icon}
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="relative min-h-screen py-32 bg-white/80 backdrop-blur-md z-10 border-t border-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              >
                Tools for the Autonomous Economy
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Building the specialized primitives needed for agents to perform verifiable economic work.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Sylva */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute top-0 right-0 p-8">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-xs font-medium">
                    Live
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold mb-4 mt-8">Sylva</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  A Monad-native framework for autonomous agents that perform specialized economic and informational tasks. Verifiable performance. Provable ownership. Economic rewards.
                </p>
                
                <ul className="space-y-3 mb-10">
                  {["Parallel Execution", "Low Gas Costs", "EVM Compatible", "Immutable Finality"].map((item) => (
                    <li key={item} className="flex items-center text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-black mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="https://sylva.oleacomputer.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Explore Sylva
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>

              {/* XILO */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative overflow-hidden rounded-3xl bg-gray-50 border border-gray-200 p-8 md:p-12 shadow-sm transition-all duration-500"
              >
                <div className="absolute top-0 right-0 p-8">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
                    Beta Soon
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold mb-4 mt-8 text-gray-400">XILO</h3>
                <p className="text-gray-500 mb-8 text-lg leading-relaxed">
                  Indexing infrastructure for autonomous agents on the 8004 standard. Enabling discovery, categorization, and composability for the agentic economy.
                </p>
                
                <div className="mt-auto pt-8 border-t border-gray-200/50">
                  <a 
                    href="mailto:hello@oleacomputer.com?subject=XILO%20Waitlist" 
                    className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
                  >
                    Join Waitlist
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
