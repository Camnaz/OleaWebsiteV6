"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Layers, Shield, Network, Database, Zap } from "lucide-react";
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
            className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center h-full"
          >
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto relative z-20"
            >
              <div className="inline-flex items-center px-6 py-2 rounded-full border border-gray-200 bg-white/40 backdrop-blur-md mb-12 text-[10px] font-sans tracking-[0.3em] uppercase">
                <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-600 mr-4 animate-pulse shadow-[0_0_8px_rgba(8,145,178,0.8)]"></span>
                System Initialization
              </div>
              
              <h1 className="text-6xl md:text-8xl font-serif italic tracking-tight mb-8 leading-[1.1] mix-blend-difference">
                Infrastructure for <br className="hidden md:block" />
                <span className="font-sans font-light not-italic tracking-tighter">autonomous</span> <br className="hidden md:block" />
                intelligence
              </h1>
              
              <p className="text-lg md:text-xl text-gray-500 mb-16 max-w-xl mx-auto leading-relaxed font-sans font-light tracking-wide mix-blend-difference">
                Building the foundational layer for a world where <span className="font-serif italic font-normal text-black">autonomous agents</span> and LLMs operate as trusted economic participants.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="#products" className="relative px-8 py-4 bg-transparent text-black border-[0.5px] border-black rounded-full font-sans font-light tracking-widest uppercase text-xs hover:bg-black hover:text-white transition-all duration-700 flex items-center justify-center group cursor-none overflow-hidden hover:px-10">
                  <span className="relative z-10 flex items-center">
                    Explore Ecosystem
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="relative min-h-screen flex items-center py-32 bg-white/20 backdrop-blur-xs z-10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-4xl md:text-6xl font-serif italic tracking-tight mb-16 mix-blend-difference"
              >
                The Future is <span className="font-sans font-light not-italic">Agentic</span>
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2 }}
                className="space-y-10 text-lg md:text-xl text-gray-600 leading-loose font-sans font-light"
              >
                <p>
                  As Large Language Models evolve from passive responders to active agents, the bottleneck shifts from <span className="font-serif italic font-normal text-black">intelligence to infrastructure.</span> Agents need secure environments to execute transactions, interact with other models, and prove their reliability.
                </p>
                <p>
                  Olea Computer is building the connective tissue for this new paradigm. We believe the future of work involves seamless human-agent collaboration and agent-to-agent economies. Our frameworks ensure that AI models can be owned, trained, validated, and rewarded on-chain.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-32 text-left">
                {[
                  {
                    icon: <Network className="w-5 h-5 mb-6 stroke-1" />,
                    title: "Interconnectivity",
                    desc: "Protocols that allow specialized agents to discover and collaborate with each other seamlessly."
                  },
                  {
                    icon: <Shield className="w-5 h-5 mb-6 stroke-1" />,
                    title: "Verifiability",
                    desc: "Cryptographic proof of agent performance, ownership, and complex economic transactions."
                  },
                  {
                    icon: <Zap className="w-5 h-5 mb-6 stroke-1" />,
                    title: "High-Performance",
                    desc: "Infrastructure built for the immense throughput demands of an autonomous, always-on economy."
                  }
                ].map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 + 0.4 }}
                    className="p-8 rounded-none border-l-[0.5px] border-t-[0.5px] border-gray-200 bg-white/40 backdrop-blur-md hover:bg-white/80 transition-colors duration-700"
                  >
                    {feature.icon}
                    <h3 className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-4">{feature.title}</h3>
                    <p className="text-gray-500 text-sm font-sans font-light leading-loose">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="relative min-h-screen flex items-center py-32 bg-white/70 backdrop-blur-xl z-10 border-t-[0.5px] border-gray-200">
          <div className="container mx-auto px-6">
            <div className="text-center mb-32">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-serif italic tracking-tight mb-8"
              >
                The <span className="font-sans font-light not-italic">Autonomous</span> Ecosystem
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-500 max-w-xl mx-auto font-sans font-light leading-relaxed"
              >
                Building the specialized primitives needed for agents and LLMs to perform verifiable economic work.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* XILO */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-none bg-white border-[0.5px] border-gray-300 p-12 md:p-16 hover:border-black transition-colors duration-700 flex flex-col shadow-sm"
              >
                <div className="absolute top-0 right-0 p-8">
                  <span className="inline-flex items-center px-4 py-1.5 border-[0.5px] border-black text-black text-[10px] uppercase tracking-widest font-sans font-medium">
                    Beta
                  </span>
                </div>
                
                <div className="mb-10 inline-flex items-center justify-center w-12 h-12 border-[0.5px] border-gray-200 rounded-full bg-gray-50 group-hover:scale-110 transition-transform duration-700">
                  <Database className="w-5 h-5 stroke-1" />
                </div>
                
                <h3 className="text-5xl font-sans font-light tracking-tight mb-6">XILO</h3>
                <p className="text-gray-500 mb-16 text-sm leading-loose font-sans font-light">
                  Indexing infrastructure for autonomous agents on the 8004 standard. Enabling discovery, categorization, and composability for the agentic economy.
                </p>
                
                <ul className="space-y-6 mb-16 mt-auto">
                  {["Agent Discovery", "8004 Standard Support", "Reputation Tracking", "API Integration"].map((item) => (
                    <li key={item} className="flex items-center text-gray-600 text-xs font-sans font-light tracking-wide uppercase">
                      <div className="w-1.5 h-1.5 bg-cyan-600/50 mr-6 rounded-full group-hover:bg-cyan-600 transition-colors duration-500"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="https://xilo.oleacomputer.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-8 py-5 border-[0.5px] border-black text-black text-[10px] font-sans font-medium tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-700 w-full cursor-none group-hover:px-10"
                >
                  Access XILO
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </a>
              </motion.div>

              {/* Sylva */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative overflow-hidden rounded-none bg-gray-50 border-[0.5px] border-gray-200 p-12 md:p-16 hover:border-gray-400 transition-colors duration-700 flex flex-col"
              >
                <div className="absolute top-0 right-0 p-8">
                  <span className="inline-flex items-center px-4 py-1.5 border-[0.5px] border-gray-400 text-gray-500 text-[10px] uppercase tracking-widest font-sans font-medium">
                    Pre-Beta
                  </span>
                </div>
                
                <div className="mb-10 inline-flex items-center justify-center w-12 h-12 border-[0.5px] border-gray-200 rounded-full bg-white group-hover:scale-110 transition-transform duration-700">
                  <Layers className="w-5 h-5 stroke-1" />
                </div>
                
                <h3 className="text-5xl font-sans font-light tracking-tight mb-6 text-gray-400">Sylva</h3>
                <p className="text-gray-500 mb-16 text-sm leading-loose font-sans font-light">
                  A Monad-native framework for autonomous agents that perform specialized economic and informational tasks. Verifiable performance. Provable ownership.
                </p>
                
                <ul className="space-y-6 mb-16 mt-auto">
                  {["Parallel Execution", "Low Gas Costs", "EVM Compatible", "Immutable Finality"].map((item) => (
                    <li key={item} className="flex items-center text-gray-500 text-xs font-sans font-light tracking-wide uppercase">
                      <div className="w-1.5 h-1.5 bg-gray-300 mr-6 rounded-full group-hover:bg-gray-400 transition-colors duration-500"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="https://sylva.oleacomputer.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-8 py-5 border-[0.5px] border-gray-300 text-gray-500 text-[10px] font-sans font-medium tracking-[0.2em] uppercase hover:bg-white hover:border-gray-400 hover:text-black transition-all duration-700 w-full cursor-none group-hover:px-10"
                >
                  Read Docs
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
