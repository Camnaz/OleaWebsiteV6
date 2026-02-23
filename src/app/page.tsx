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
              <h1 className="text-6xl md:text-8xl font-serif italic tracking-tight mb-8 leading-[1.1] text-slate-900">
                Infrastructure for <br className="hidden md:block" />
                <span className="font-sans font-light not-italic tracking-tighter text-black">autonomous</span> <br className="hidden md:block" />
                intelligence
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-16 max-w-xl mx-auto leading-relaxed font-sans font-light tracking-wide">
                Building the foundational layer for a world where <span className="font-serif italic font-normal text-slate-900">autonomous agents</span> and LLMs operate as trusted economic participants.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="#products" className="relative px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-900 border-[0.5px] border-slate-300 rounded-full font-sans font-light tracking-widest uppercase text-xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-700 flex items-center justify-center group cursor-none overflow-hidden hover:px-10 shadow-sm hover:shadow-md">
                  <span className="relative z-10 flex items-center">
                    Explore Ecosystem
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="relative min-h-screen flex items-center py-32 bg-slate-50/40 backdrop-blur-sm z-10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-4xl md:text-6xl font-serif italic tracking-tight mb-16 text-slate-900"
              >
                The Future is <span className="font-sans font-light not-italic">Agentic</span>
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2 }}
                className="space-y-10 text-lg md:text-xl text-slate-600 leading-loose font-sans font-light"
              >
                <p>
                  As Large Language Models evolve from passive responders to active agents, the bottleneck shifts from <span className="font-serif italic font-normal text-slate-900">intelligence to infrastructure.</span> Agents need secure environments to execute transactions, interact with other models, and prove their reliability.
                </p>
                <p>
                  Olea Computer is building the connective tissue for this new paradigm. We believe the future of work involves seamless human-agent collaboration and agent-to-agent economies. Our frameworks ensure that AI models can be owned, trained, validated, and rewarded on-chain.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-32 text-left">
                {[
                  {
                    icon: <Network className="w-5 h-5 mb-6 stroke-1 text-sky-600" />,
                    title: "Interconnectivity",
                    desc: "Protocols that allow specialized agents to discover and collaborate with each other seamlessly."
                  },
                  {
                    icon: <Shield className="w-5 h-5 mb-6 stroke-1 text-sky-600" />,
                    title: "Verifiability",
                    desc: "Cryptographic proof of agent performance, ownership, and complex economic transactions."
                  },
                  {
                    icon: <Zap className="w-5 h-5 mb-6 stroke-1 text-sky-600" />,
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
                    className="p-8 rounded-2xl border-[0.5px] border-slate-200 bg-white/70 backdrop-blur-md hover:bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-700"
                  >
                    {feature.icon}
                    <h3 className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-4 text-slate-900">{feature.title}</h3>
                    <p className="text-slate-500 text-sm font-sans font-light leading-loose">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="relative min-h-screen flex items-center py-32 bg-white/90 backdrop-blur-xl z-10 border-t-[0.5px] border-slate-200">
          <div className="container mx-auto px-6">
            <div className="text-center mb-32">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-serif italic tracking-tight mb-8 text-slate-900"
              >
                The <span className="font-sans font-light not-italic">Autonomous</span> Ecosystem
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-500 max-w-xl mx-auto font-sans font-light leading-relaxed"
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
                className="group relative overflow-hidden rounded-3xl bg-white border-[0.5px] border-slate-200 p-12 md:p-16 hover:border-sky-300 transition-all duration-700 flex flex-col shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-4px_rgba(14,165,233,0.1)]"
              >
                <div className="absolute top-0 right-0 p-8">
                  <span className="inline-flex items-center px-4 py-1.5 border-[0.5px] border-sky-200 bg-sky-50 text-sky-700 text-[10px] uppercase tracking-widest font-sans font-medium rounded-full">
                    Beta
                  </span>
                </div>
                
                <div className="mb-10 inline-flex items-center justify-center w-14 h-14 border-[0.5px] border-slate-100 rounded-2xl bg-slate-50 group-hover:scale-110 group-hover:bg-sky-50 group-hover:border-sky-100 transition-all duration-700 shadow-sm">
                  <Database className="w-6 h-6 stroke-1 text-slate-700 group-hover:text-sky-600 transition-colors duration-700" />
                </div>
                
                <h3 className="text-5xl font-sans font-light tracking-tight mb-6 text-slate-900">XILO</h3>
                <p className="text-slate-500 mb-16 text-sm leading-loose font-sans font-light">
                  Indexing infrastructure for autonomous agents on the 8004 standard. Enabling discovery, categorization, and composability for the agentic economy.
                </p>
                
                <ul className="space-y-6 mb-16 mt-auto">
                  {["Agent Discovery", "8004 Standard Support", "Reputation Tracking", "API Integration"].map((item) => (
                    <li key={item} className="flex items-center text-slate-600 text-xs font-sans font-light tracking-wide uppercase">
                      <div className="w-1.5 h-1.5 bg-sky-200 mr-6 rounded-full group-hover:bg-sky-500 transition-colors duration-500"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="https://xilo.oleacomputer.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-8 py-5 border-[0.5px] border-slate-300 text-slate-900 text-[10px] font-sans font-medium tracking-[0.2em] uppercase hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all duration-700 w-full cursor-none group-hover:px-10 rounded-full"
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
                className="group relative overflow-hidden rounded-3xl bg-slate-50/50 border-[0.5px] border-slate-200 p-12 md:p-16 hover:border-slate-300 transition-all duration-700 flex flex-col shadow-[0_8px_30px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-4px_rgba(0,0,0,0.06)]"
              >
                <div className="absolute top-0 right-0 p-8">
                  <span className="inline-flex items-center px-4 py-1.5 border-[0.5px] border-slate-200 bg-white text-slate-500 text-[10px] uppercase tracking-widest font-sans font-medium rounded-full">
                    Pre-Beta
                  </span>
                </div>
                
                <div className="mb-10 inline-flex items-center justify-center w-14 h-14 border-[0.5px] border-slate-200 rounded-2xl bg-white group-hover:scale-110 transition-transform duration-700 shadow-sm">
                  <Layers className="w-6 h-6 stroke-1 text-slate-400" />
                </div>
                
                <h3 className="text-5xl font-sans font-light tracking-tight mb-6 text-slate-400">Sylva</h3>
                <p className="text-slate-500 mb-16 text-sm leading-loose font-sans font-light">
                  A Monad-native framework for autonomous agents that perform specialized economic and informational tasks. Verifiable performance. Provable ownership.
                </p>
                
                <ul className="space-y-6 mb-16 mt-auto">
                  {["Parallel Execution", "Low Gas Costs", "EVM Compatible", "Immutable Finality"].map((item) => (
                    <li key={item} className="flex items-center text-slate-500 text-xs font-sans font-light tracking-wide uppercase">
                      <div className="w-1.5 h-1.5 bg-slate-200 mr-6 rounded-full group-hover:bg-slate-300 transition-colors duration-500"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="https://sylva.oleacomputer.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-8 py-5 border-[0.5px] border-slate-200 bg-white text-slate-500 text-[10px] font-sans font-medium tracking-[0.2em] uppercase hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all duration-700 w-full cursor-none group-hover:px-10 rounded-full shadow-sm hover:shadow-md"
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
