"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Layers, Shield, Network, Database, Zap } from "lucide-react";
import { useRef } from "react";
import { Layout } from "@/components/ui/Layout";
import { SpotlightButton } from "@/components/ui/SpotlightButton";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 50]);

  return (
    <Layout>
      <div ref={containerRef} className="relative w-full">

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20">
          {/* Extremely soft, barely visible sunrise panel */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-start overflow-hidden">
            <div className="w-[90vw] h-[150vh] absolute -left-[10%] bg-linear-to-r from-white via-white/95 to-transparent blur-3xl opacity-100" />
            <div className="w-[60vw] h-screen absolute -left-[5%] top-0 bg-linear-to-br from-emerald-50/20 via-gray-100/15 to-transparent blur-3xl opacity-60" />
          </div>

          <motion.div 
            style={{ opacity, scale, y }}
            className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col h-full justify-center items-start text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl relative z-20"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-[-0.02em] mb-6 leading-[1.15] text-gray-900">
                Infrastructure for <br />
                <span className="font-sans font-normal not-italic tracking-[-0.02em] text-transparent bg-clip-text bg-linear-to-r from-emerald-500 via-sky-500 to-blue-600 pr-1">autonomous</span> <br />
                intelligence
              </h1>
              
              <p className="text-base text-gray-700 max-w-md font-sans font-normal leading-relaxed [text-shadow:0_0_20px_rgba(255,255,255,0.9),0_0_8px_rgba(255,255,255,1)]">
                Accelerating the transition to an agentic future through scalable, verifiable compute protocols.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-6">
                <SpotlightButton href="#products" color="emerald" className="inline-flex items-center justify-between px-8 py-4 border border-emerald-300/40 bg-white/30 backdrop-blur-xl text-emerald-800 text-[10px] font-sans font-normal tracking-[0.2em] uppercase transition-all duration-700 cursor-none rounded-full group shadow-[0_8px_32px_rgba(16,185,129,0.05),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.02)] hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(16,185,129,0.12),inset_0_2px_4px_rgba(255,255,255,1)] hover:px-10 hover:-translate-y-1 z-30 relative">
                  <span className="relative z-10 flex items-center gap-4 pointer-events-none">
                    Explore Ecosystem
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform will-change-transform duration-500 text-emerald-600" />
                  </span>
                </SpotlightButton>
                <SpotlightButton href="#vision" color="sky" className="inline-flex items-center justify-between px-8 py-4 border border-teal-300/30 bg-white/20 backdrop-blur-xl text-teal-700 text-[10px] font-sans font-normal tracking-[0.2em] uppercase transition-all duration-700 cursor-none rounded-full group shadow-[0_8px_32px_rgba(45,212,191,0.04),inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.015)] hover:bg-white/35 hover:shadow-[0_12px_40px_rgba(45,212,191,0.08),inset_0_2px_4px_rgba(255,255,255,1)] hover:px-10 hover:-translate-y-1 z-30 relative">
                  <span className="relative z-10 flex items-center pointer-events-none">
                    Read Manifesto
                  </span>
                </SpotlightButton>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="relative py-28">
          {/* Soft sunrise panel segment */}
          <div className="absolute top-0 inset-x-0 h-[60%] z-[-1] pointer-events-none flex justify-center">
            <div className="w-[120vw] h-full bg-linear-to-b from-transparent via-gray-100/50 to-transparent blur-3xl" />
          </div>

          <div className="container mx-auto px-6">
            <div className="max-w-xl mx-auto text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 30,  }}
                whileInView={{ opacity: 1, y: 0,  }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl md:text-3xl font-serif tracking-[-0.02em] mb-8 text-gray-900"
              >
                The Future is <span className="font-sans font-normal not-italic text-transparent bg-clip-text bg-linear-to-r from-emerald-500 via-sky-400 to-blue-500">Agentic</span>
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed font-sans font-normal max-w-sm mx-auto [text-shadow:0_0_20px_rgba(255,255,255,0.9),0_0_8px_rgba(255,255,255,1)]"
              >
                <p>
                  As Large Language Models evolve from passive responders to active agents, the bottleneck shifts from <span className="font-serif text-gray-900 border-b border-emerald-300/50">intelligence to infrastructure.</span> Agents need secure environments to execute transactions, interact with other models, and prove their reliability.
                </p>
                <p>
                  Olea Computer is building the connective tissue for this new paradigm. We believe the future of work involves seamless human-agent collaboration and agent-to-agent economies.
                </p>
              </motion.div>
            </div>

            {/* Staggered Floating Features */}
            <div className="space-y-[10vh] py-[3vh]">
              {[
                {
                  icon: <Network className="w-8 h-8 stroke-1 text-emerald-600 relative z-10" />,
                  title: "Interconnectivity",
                  desc: "Protocols that allow specialized agents to discover and collaborate with each other seamlessly across disparate networks."
                },
                {
                  icon: <Shield className="w-8 h-8 stroke-1 text-teal-600 relative z-10" />,
                  title: "Verifiability",
                  desc: "Cryptographic proof of agent performance, ownership, and complex economic transactions built natively into the execution layer."
                },
                {
                  icon: <Zap className="w-8 h-8 stroke-1 text-emerald-500 relative z-10" />,
                  title: "High-Performance",
                  desc: "Infrastructure built for the immense throughput demands of an autonomous, always-on economy operating at machine speed."
                }
              ].map((feature, i) => {
                const align = i === 0 
                  ? 'ml-[15%] mr-auto text-left items-start' 
                  : i === 1 
                    ? 'mr-[15%] ml-auto text-right items-end' 
                    : 'ml-[15%] mr-auto text-left items-start';
                
                const selfAlign = i === 0 
                  ? 'self-start' 
                  : i === 1 
                    ? 'self-end' 
                    : 'self-start';
                
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex flex-col max-w-xs ${align} group`}
                  >
                    <div className={`mb-10 p-6 rounded-4xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.02)] inline-flex ${selfAlign} relative overflow-hidden transition-transform will-change-transform duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.08),inset_0_2px_4px_rgba(255,255,255,1)]`}>
                      <div className="absolute inset-0 bg-linear-to-br from-white/80 to-transparent pointer-events-none" />
                      {feature.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif tracking-[-0.02em] mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-700 font-sans font-normal leading-relaxed">
                      {feature.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="relative py-28 z-10 border-t border-gray-200/40">
          {/* Glassmorphic panel segment for Products */}
          <div className="absolute inset-0 bg-linear-to-b from-gray-50/60 via-emerald-50/15 to-transparent z-[-1]" />
          
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl md:text-3xl font-serif tracking-[-0.02em] mb-4 text-gray-900"
              >
                The <span className="font-sans font-normal not-italic text-transparent bg-clip-text bg-linear-to-r from-emerald-500 via-sky-400 to-blue-500">Autonomous</span> Ecosystem
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-gray-700 max-w-sm mx-auto font-sans font-normal leading-relaxed [text-shadow:0_0_20px_rgba(255,255,255,0.9),0_0_8px_rgba(255,255,255,1)]"
              >
                Building the specialized primitives needed for agents and LLMs to perform verifiable economic work.
              </motion.p>
            </div>

            <div className="space-y-[15vh]">
              {/* XILO */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                  <div className="flex-1 flex flex-col items-start text-left space-y-8">
                    <div className="inline-flex items-center px-4 py-2 border border-emerald-200/50 bg-emerald-50/80 text-emerald-800 text-[10px] uppercase tracking-[0.2em] font-sans font-bold rounded-full shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      Beta
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-serif tracking-[-0.02em] text-gray-900 leading-tight">XILO</h3>
                    
                    <p className="text-sm md:text-base text-gray-700 font-sans font-normal leading-relaxed max-w-sm">
                      Indexing infrastructure for autonomous agents on the 8004 standard. Enabling discovery, categorization, and composability for the agentic economy.
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mt-12">
                      {["Agent Discovery", "8004 Standard Support", "Reputation Tracking", "API Integration"].map((item) => (
                        <div key={item} className="flex items-center text-gray-700 text-xs font-sans font-bold tracking-widest uppercase bg-white/40 backdrop-blur-xl rounded-2xl p-3 md:px-5 border border-white/60 shadow-[0_4px_15px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.02)] transition-transform will-change-transform hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(16,185,129,0.08),inset_0_1px_1px_rgba(255,255,255,1)]">
                          <div className="w-1.5 h-1.5 bg-emerald-500 mr-3 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-6">
                      <SpotlightButton 
                        href="https://xilo.oleacomputer.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        color="emerald"
                        className="inline-flex items-center justify-between px-8 py-4 border border-emerald-300/40 bg-white/30 backdrop-blur-xl text-emerald-800 text-[10px] font-sans font-normal tracking-[0.2em] uppercase transition-all duration-700 cursor-none rounded-full group/btn shadow-[0_8px_32px_rgba(16,185,129,0.05),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.02)] hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(16,185,129,0.12),inset_0_2px_4px_rgba(255,255,255,1)] hover:px-10 hover:-translate-y-1 z-30 relative"
                      >
                        <span className="relative z-10 flex items-center justify-between w-full pointer-events-none">
                          Visit XILO
                          <ArrowRight className="w-3.5 h-3.5 ml-4 group-hover/btn:translate-x-2 transition-transform will-change-transform duration-500 text-emerald-600" />
                        </span>
                      </SpotlightButton>
                    </div>
                  </div>

                  <div className="flex-1 relative w-full">
                    <div className="aspect-square relative max-w-xl mx-auto group">
                      <div className="absolute inset-0 bg-linear-to-tr from-emerald-100/50 to-teal-50/40 rounded-[3rem] transform rotate-3 scale-105 transition-transform will-change-transform duration-700 group-hover:rotate-6 group-hover:scale-110 blur-xl opacity-70" />
                      <div className="relative h-full w-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.9),-4px_-4px_12px_rgba(255,255,255,0.6)] rounded-[3rem] flex items-center justify-center overflow-hidden transition-transform will-change-transform duration-700 group-hover:-translate-y-4">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-200/30 rounded-full blur-2xl -mr-16 -mt-16 transition-all duration-700 group-hover:scale-150 group-hover:bg-emerald-100/50" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-200/30 rounded-full blur-2xl -ml-16 -mb-16 transition-all duration-700 group-hover:scale-150 group-hover:bg-gray-100/50" />
                        <Database className="w-24 h-24 md:w-32 md:h-32 stroke-1 text-emerald-900/40 drop-shadow-sm group-hover:scale-110 transition-transform will-change-transform duration-700 relative z-10" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sylva */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
                  <div className="flex-1 flex flex-col items-start text-left space-y-8">
                    <div className="inline-flex items-center px-4 py-2 border border-teal-200/50 bg-teal-50/80 text-teal-800 text-[10px] uppercase tracking-[0.2em] font-sans font-bold rounded-full shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2" />
                      Pre-Beta
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-serif tracking-[-0.02em] text-gray-900 leading-tight">Sylva</h3>
                    
                    <p className="text-sm md:text-base text-gray-700 font-sans font-normal leading-relaxed max-w-sm">
                      A Monad-native framework for autonomous agents that perform specialized economic and informational tasks. Verifiable performance. Provable ownership.
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mt-12">
                      {["Parallel Execution", "Low Gas Costs", "EVM Compatible", "Immutable Finality"].map((item) => (
                        <div key={item} className="flex items-center text-gray-700 text-xs font-sans font-bold tracking-widest uppercase bg-white/40 backdrop-blur-xl rounded-2xl p-3 md:px-5 border border-white/60 shadow-[0_4px_15px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.02)] transition-transform will-change-transform hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(45,212,191,0.08),inset_0_1px_1px_rgba(255,255,255,1)]">
                          <div className="w-1.5 h-1.5 bg-teal-500 mr-3 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.8)]"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-6">
                      <SpotlightButton 
                        href="https://sylva.oleacomputer.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        color="emerald"
                        className="inline-flex items-center justify-between px-8 py-4 border border-teal-300/40 bg-white/30 backdrop-blur-xl text-teal-800 text-[10px] font-sans font-normal tracking-[0.2em] uppercase transition-all duration-700 cursor-none rounded-full group/btn shadow-[0_8px_32px_rgba(45,212,191,0.05),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.02)] hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(45,212,191,0.12),inset_0_2px_4px_rgba(255,255,255,1)] hover:px-10 hover:-translate-y-1 z-30 relative"
                      >
                        <span className="relative z-10 flex items-center justify-between w-full pointer-events-none">
                          Explore Sylva
                          <ArrowRight className="w-3.5 h-3.5 ml-4 group-hover/btn:translate-x-2 transition-transform will-change-transform duration-500 text-teal-600" />
                        </span>
                      </SpotlightButton>
                    </div>
                  </div>

                  <div className="flex-1 w-full relative">
                    <div className="aspect-square relative max-w-xl mx-auto group">
                      <div className="absolute inset-0 bg-linear-to-tr from-teal-100/40 via-emerald-50/30 to-gray-100/30 rounded-[3rem] transform -rotate-3 scale-105 opacity-70 blur-2xl group-hover:-rotate-6 group-hover:scale-110 transition-all duration-700" />
                      <div className="relative h-full w-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.9),-4px_-4px_12px_rgba(255,255,255,0.6)] rounded-[3rem] flex items-center justify-center overflow-hidden transition-transform will-change-transform duration-700 group-hover:-translate-y-4">
                        <Layers className="w-24 h-24 md:w-32 md:h-32 stroke-1 text-teal-900/40 drop-shadow-sm group-hover:scale-110 transition-transform will-change-transform duration-700 relative z-10" />
                        <div className="absolute top-10 left-10 w-32 h-32 bg-teal-200/30 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
                        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gray-200/30 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
