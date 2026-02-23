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
            {/* Dramatic framing box */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
              <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border-[0.5px] border-black rounded-full mix-blend-overlay"></div>
              <div className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] border-[0.5px] border-black rounded-full mix-blend-overlay"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto relative z-20"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full border-[0.5px] border-gray-300 bg-white/20 backdrop-blur-md mb-12 text-xs font-light tracking-[0.2em] uppercase">
                <span className="flex h-1.5 w-1.5 rounded-full bg-black mr-3 animate-pulse"></span>
                System Initialization
              </div>
              
              <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8 leading-[1.1] mix-blend-difference">
                Infrastructure for <br className="hidden md:block" />
                <span className="font-medium">autonomous</span> <br className="hidden md:block" />
                intelligence
              </h1>
              
              <p className="text-lg md:text-xl text-gray-500 mb-16 max-w-xl mx-auto leading-relaxed font-light tracking-wide">
                We are building the foundational infrastructure for a world where autonomous agents and LLMs operate as trusted, interconnected economic participants.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="#products" className="relative px-8 py-4 bg-transparent text-black border-[0.5px] border-black rounded-full font-light tracking-widest uppercase text-xs hover:bg-black hover:text-white transition-all duration-500 flex items-center justify-center group cursor-none overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Explore Ecosystem
                    <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400 mix-blend-difference"
          >
            <span className="text-[10px] font-light mb-4 tracking-[0.3em] uppercase">Scroll to explore</span>
            <div className="w-[0.5px] h-16 bg-gradient-to-b from-black to-transparent"></div>
          </motion.div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="relative min-h-screen flex items-center py-32 bg-white/10 backdrop-blur-[2px] z-10">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-3xl md:text-5xl font-light tracking-tight mb-16"
              >
                The Future is <span className="font-medium">Agentic</span>
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2 }}
                className="space-y-8 text-lg text-gray-500 leading-loose font-light"
              >
                <p>
                  As Large Language Models evolve from passive responders to active agents, the bottleneck shifts from intelligence to infrastructure. Agents need secure environments to execute transactions, interact with other models, and prove their reliability.
                </p>
                <p>
                  Olea Computer is building the connective tissue for this new paradigm. We believe the future of work involves seamless human-agent collaboration and agent-to-agent economies. Our frameworks ensure that AI models can be owned, trained, validated, and rewarded on-chain, making this future safe, transparent, and economically viable.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 text-left">
                {[
                  {
                    icon: <Network className="w-5 h-5 mb-6 stroke-[1.5]" />,
                    title: "Interconnectivity",
                    desc: "Protocols that allow specialized agents to discover and collaborate with each other."
                  },
                  {
                    icon: <Shield className="w-5 h-5 mb-6 stroke-[1.5]" />,
                    title: "Verifiability",
                    desc: "Cryptographic proof of agent performance, ownership, and economic transactions."
                  },
                  {
                    icon: <Zap className="w-5 h-5 mb-6 stroke-[1.5]" />,
                    title: "High-Performance",
                    desc: "Infrastructure built for the immense throughput demands of an autonomous economy."
                  }
                ].map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 + 0.4 }}
                    className="p-8 rounded-none border-[0.5px] border-gray-200 bg-white/30 backdrop-blur-md hover:bg-white/60 transition-colors duration-500"
                  >
                    {feature.icon}
                    <h3 className="text-sm font-medium tracking-widest uppercase mb-4">{feature.title}</h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="relative min-h-screen flex items-center py-32 bg-white/60 backdrop-blur-lg z-10 border-t-[0.5px] border-gray-200">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-light tracking-tight mb-6"
              >
                The <span className="font-medium">Autonomous</span> Ecosystem
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-500 max-w-xl mx-auto font-light"
              >
                Building the specialized primitives needed for agents and LLMs to perform verifiable economic work.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* XILO */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-none bg-transparent border-[0.5px] border-gray-300 p-10 md:p-14 hover:border-black transition-colors duration-700 flex flex-col"
              >
                <div className="absolute top-0 right-0 p-8">
                  <span className="inline-flex items-center px-3 py-1 border-[0.5px] border-black text-black text-[10px] uppercase tracking-widest font-medium">
                    Beta
                  </span>
                </div>
                
                <div className="mb-8 inline-flex items-center justify-center w-12 h-12 border-[0.5px] border-gray-300 rounded-full">
                  <Database className="w-5 h-5 stroke-[1.5]" />
                </div>
                
                <h3 className="text-4xl font-light tracking-tight mb-6">XILO</h3>
                <p className="text-gray-500 mb-12 text-sm leading-relaxed font-light">
                  Indexing infrastructure for autonomous agents on the 8004 standard. Enabling discovery, categorization, and composability for the agentic economy.
                </p>
                
                <ul className="space-y-4 mb-12 mt-auto">
                  {["Agent Discovery", "8004 Standard Support", "Reputation Tracking", "API Integration"].map((item) => (
                    <li key={item} className="flex items-center text-gray-600 text-sm font-light">
                      <div className="w-1 h-1 bg-black mr-4"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="https://xilo.oleacomputer.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-8 py-4 border-[0.5px] border-black text-black text-xs font-medium tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-500 w-full cursor-none group-hover:px-6"
                >
                  Access XILO
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Sylva */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative overflow-hidden rounded-none bg-gray-50 border-[0.5px] border-gray-200 p-10 md:p-14 hover:border-gray-400 transition-colors duration-700 flex flex-col"
              >
                <div className="absolute top-0 right-0 p-8">
                  <span className="inline-flex items-center px-3 py-1 border-[0.5px] border-gray-400 text-gray-500 text-[10px] uppercase tracking-widest font-medium">
                    Pre-Beta
                  </span>
                </div>
                
                <div className="mb-8 inline-flex items-center justify-center w-12 h-12 border-[0.5px] border-gray-300 rounded-full bg-white">
                  <Layers className="w-5 h-5 stroke-[1.5]" />
                </div>
                
                <h3 className="text-4xl font-light tracking-tight mb-6 text-gray-400">Sylva</h3>
                <p className="text-gray-500 mb-12 text-sm leading-relaxed font-light">
                  A Monad-native framework for autonomous agents that perform specialized economic and informational tasks. Verifiable performance. Provable ownership.
                </p>
                
                <ul className="space-y-4 mb-12 mt-auto">
                  {["Parallel Execution", "Low Gas Costs", "EVM Compatible", "Immutable Finality"].map((item) => (
                    <li key={item} className="flex items-center text-gray-500 text-sm font-light">
                      <div className="w-1 h-1 bg-gray-300 mr-4"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="https://sylva.oleacomputer.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-8 py-4 border-[0.5px] border-gray-300 text-gray-500 text-xs font-medium tracking-widest uppercase hover:bg-white transition-colors duration-500 w-full cursor-none bg-transparent group-hover:px-6"
                >
                  Read Docs
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
