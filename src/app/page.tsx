"use client";

import { motion } from "framer-motion";
import { ArrowRight, Layers, Shield, Network, Database, Zap } from "lucide-react";
import { Layout } from "@/components/ui/Layout";
import { SpotlightButton } from "@/components/ui/SpotlightButton";

export default function Home() {
  return (
    <Layout>
      <div className="relative w-full">

        {/* Hero Section */}
        <section className="relative min-h-svh flex items-center pt-20">
          {/* Soft ambient space-white/silver glows */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-start overflow-hidden">
            <div className="w-[90vw] h-[150vh] absolute -left-[10%] bg-[radial-gradient(ellipse_at_left,rgba(255,255,255,1)_0%,rgba(243,244,246,0.95)_40%,transparent_70%)] opacity-100" />
            <div className="w-[60vw] h-svh absolute -left-[5%] top-0 bg-[radial-gradient(ellipse_at_top_left,rgba(167,243,208,0.15)_0%,rgba(229,231,235,0.2)_40%,transparent_70%)] opacity-80" />
          </div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col h-full justify-center items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl relative z-20"
            >
              <div className="relative p-6 md:p-10 bg-linear-to-b from-white/95 to-white/80 md:from-white/90 md:to-white/60 md:backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] border border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.02),inset_0_2px_4px_rgba(255,255,255,1)] md:shadow-[0_8px_32px_rgba(0,0,0,0.03),inset_0_2px_4px_rgba(255,255,255,1)]">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-[-0.02em] mb-6 leading-[1.15] text-gray-900 relative z-10">
                  Infrastructure for <br />
                  <span className="font-sans font-normal not-italic tracking-[-0.02em] text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-emerald-400 to-teal-600 pr-1 drop-shadow-sm">autonomous</span> <br />
                  intelligence
                </h1>
                
                <p className="text-base text-gray-700 max-w-md font-sans font-normal leading-relaxed relative z-10 mb-8">
                  Accelerating the transition to an agentic future through scalable, verifiable compute protocols.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 relative z-10">
                  <SpotlightButton href="#products" color="cyan" className="inline-flex items-center justify-between px-8 py-4 border border-cyan-200/50 bg-white/60 backdrop-blur-xl text-gray-800 text-[10px] font-sans font-bold tracking-[0.2em] uppercase transition-all duration-700 rounded-full group shadow-[0_8px_32px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,1)] hover:bg-white/90 hover:shadow-[0_12px_40px_rgba(34,211,238,0.15),inset_0_2px_4px_rgba(255,255,255,1)] hover:border-cyan-200/80 hover:px-10 hover:-translate-y-1 z-30 relative hover:text-cyan-700">
                    <span className="relative z-10 flex items-center gap-4 pointer-events-none">
                      Explore Ecosystem
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform will-change-transform duration-500 text-gray-900 group-hover:text-cyan-600" />
                    </span>
                  </SpotlightButton>
                  <SpotlightButton href="#vision" color="cyan" className="inline-flex items-center justify-between px-8 py-4 border border-gray-200/50 bg-white/40 backdrop-blur-xl text-gray-600 text-[10px] font-sans font-bold tracking-[0.2em] uppercase transition-all duration-700 rounded-full group shadow-[0_8px_32px_rgba(0,0,0,0.02),inset_0_2px_4px_rgba(255,255,255,0.8)] hover:bg-white/70 hover:shadow-[0_12px_40px_rgba(34,211,238,0.1),inset_0_2px_4px_rgba(255,255,255,1)] hover:border-cyan-200/60 hover:px-10 hover:-translate-y-1 z-30 relative hover:text-cyan-600">
                    <span className="relative z-10 flex items-center pointer-events-none">
                      Read Manifesto
                    </span>
                  </SpotlightButton>
                </div>
              </div>
            </motion.div>
        </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="relative py-28">
          <div className="absolute top-0 inset-x-0 h-[60%] z-[-1] pointer-events-none flex justify-center">
            <div className="w-[120vw] h-full bg-[radial-gradient(ellipse_at_top,rgba(243,244,246,0.8)_0%,transparent_70%)]" />
          </div>

          <div className="container mx-auto px-6">
            <div className="max-w-xl mx-auto text-center mb-20 relative">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative inline-block p-6 md:p-10 bg-linear-to-b from-white/95 to-white/80 md:from-white/90 md:to-white/60 md:backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] border border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.02),inset_0_2px_4px_rgba(255,255,255,1)] md:shadow-[0_8px_32px_rgba(0,0,0,0.03),inset_0_2px_4px_rgba(255,255,255,1)]"
              >
                <motion.h2 
                  initial={{ opacity: 0, y: 30,  }}
                  whileInView={{ opacity: 1, y: 0,  }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl md:text-3xl font-serif tracking-[-0.02em] mb-6 text-gray-900 relative z-10"
                >
                  The Future is <span className="font-sans font-normal not-italic text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-emerald-400 to-teal-600 drop-shadow-sm">Agentic</span>
                </motion.h2>
                <div className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed font-sans font-normal max-w-sm mx-auto relative z-10 text-left md:text-center">
                  <p>
                    As Large Language Models evolve from passive responders to active agents, the bottleneck shifts from <span className="font-serif text-gray-900 border-b border-gray-400/50">intelligence to infrastructure.</span> Agents need secure environments to execute transactions, interact with other models, and prove their reliability.
                  </p>
                  <p>
                    Olea Computer is building the connective tissue for this new paradigm. We believe the future of work involves seamless human-agent collaboration and agent-to-agent economies.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Staggered Floating Features */}
            <div className="space-y-[10vh] py-[3vh]">
              {[
                {
                  icon: <Network className="w-8 h-8 stroke-1 text-gray-900 relative z-10" />,
                  title: "Interconnectivity",
                  desc: "Protocols that allow specialized agents to discover and collaborate with each other seamlessly across disparate networks."
                },
                {
                  icon: <Shield className="w-8 h-8 stroke-1 text-gray-700 relative z-10" />,
                  title: "Verifiability",
                  desc: "Cryptographic proof of agent performance, ownership, and complex economic transactions built natively into the execution layer."
                },
                {
                  icon: <Zap className="w-8 h-8 stroke-1 text-gray-800 relative z-10" />,
                  title: "High-Performance",
                  desc: "Infrastructure built for the immense throughput demands of an autonomous, always-on economy operating at machine speed."
                }
              ].map((feature, i) => {
                const align = i === 0 
                  ? 'ml-[15%] mr-auto text-left items-start' 
                  : i === 1 
                    ? 'mr-[15%] ml-auto text-right items-end' 
                    : 'ml-[15%] mr-auto text-left items-start';
                
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex flex-col max-w-xs ${align} group relative`}
                  >
                    <div className="relative p-6 md:p-8 bg-linear-to-b from-white/95 to-white/80 md:from-white/90 md:to-white/60 md:backdrop-blur-xl rounded-3xl border border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.02),inset_0_2px_4px_rgba(255,255,255,1)] md:shadow-[0_8px_32px_rgba(0,0,0,0.03),inset_0_2px_4px_rgba(255,255,255,1)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,1)] hover:border-white/80 group-hover:bg-white/80">
                      <div className={`mb-6 p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/60 shadow-[0_4px_15px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,0.9)] inline-flex relative overflow-hidden transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,1)]`}>
                        <div className="absolute inset-0 bg-linear-to-br from-white/90 to-white/40 pointer-events-none" />
                        {feature.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif tracking-[-0.02em] mb-3 text-gray-900 relative z-10">{feature.title}</h3>
                      <p className="text-sm text-gray-600 font-sans font-normal leading-relaxed relative z-10">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="relative py-28 z-10 border-t border-gray-200/60">
          <div className="absolute inset-0 bg-linear-to-b from-gray-50/90 via-white to-white z-[-1]" />
          
          <div className="container mx-auto px-6">
            <div className="text-center mb-20 relative">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative inline-block p-6 md:p-10 bg-linear-to-b from-white/95 to-white/80 md:from-white/90 md:to-white/60 md:backdrop-blur-xl rounded-3xl border border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.02),inset_0_2px_4px_rgba(255,255,255,1)] md:shadow-[0_8px_32px_rgba(0,0,0,0.03),inset_0_2px_4px_rgba(255,255,255,1)] z-10"
              >
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl md:text-3xl font-serif tracking-[-0.02em] mb-4 text-gray-900 relative z-10"
                >
                  The <span className="font-sans font-normal not-italic text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-emerald-400 to-teal-600 drop-shadow-sm">Autonomous</span> Ecosystem
                </motion.h2>
                <p className="text-sm text-gray-600 max-w-sm mx-auto font-sans font-normal leading-relaxed relative z-10">
                  Building the specialized primitives needed for agents and LLMs to perform verifiable economic work.
                </p>
              </motion.div>
            </div>

            <div className="space-y-[15vh]">
              {/* XILO */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative group/xilo">
                  <div className="flex-1 flex flex-col items-start text-left relative z-10">
                    <div className="relative p-6 md:p-10 bg-linear-to-b from-white/95 to-white/80 md:from-white/90 md:to-white/60 md:backdrop-blur-xl rounded-3xl border border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.02),inset_0_2px_4px_rgba(255,255,255,1)] md:shadow-[0_8px_32px_rgba(0,0,0,0.03),inset_0_2px_4px_rgba(255,255,255,1)]">
                      <div className="inline-flex items-center px-4 py-2 border border-gray-200/80 bg-white/80 backdrop-blur-sm text-gray-800 text-[10px] uppercase tracking-[0.2em] font-sans font-bold rounded-full shadow-sm relative z-10 mb-6 group-hover/xilo:border-cyan-200/50 transition-colors duration-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-linear-to-tr from-cyan-500 to-cyan-300 mr-2 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        Beta
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-serif tracking-[-0.02em] text-gray-900 leading-tight relative z-10 mb-4 transition-all duration-700 group-hover/xilo:text-cyan-500 group-hover/xilo:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">XILO</h3>
                      
                      <p className="text-sm md:text-base text-gray-600 font-sans font-normal leading-relaxed max-w-sm relative z-10">
                        Indexing infrastructure for autonomous agents on the 8004 standard. Enabling discovery, categorization, and composability for the agentic economy.
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mt-8 relative z-10">
                        {["Agent Discovery", "8004 Standard Support", "Reputation Tracking", "API Integration"].map((item) => (
                          <div key={item} className="flex items-center text-gray-700 text-xs font-sans font-bold tracking-widest uppercase bg-white/80 backdrop-blur-md rounded-2xl p-3 md:px-5 border border-gray-200/80 shadow-[0_4px_15px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] transition-transform will-change-transform hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(34,211,238,0.15),inset_0_1px_1px_rgba(255,255,255,1)] hover:border-cyan-200/50 group/tag">
                            <div className="w-1.5 h-1.5 bg-linear-to-tr from-gray-400 to-gray-300 mr-3 rounded-full shadow-[0_0_8px_rgba(156,163,175,0.6)] group-hover/tag:from-cyan-500 group-hover/tag:to-cyan-300 group-hover/tag:shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300"></div>
                            {item}
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-8 relative z-10">
                        <SpotlightButton 
                          href="https://xilo.oleacomputer.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          color="cyan"
                          className="inline-flex items-center justify-between px-8 py-4 border border-gray-200/80 bg-white/80 backdrop-blur-xl text-gray-800 text-[10px] font-sans font-bold tracking-[0.2em] uppercase transition-all duration-700 rounded-full group/btn shadow-[0_8px_32px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,1)] hover:bg-white hover:shadow-[0_12px_40px_rgba(34,211,238,0.15),inset_0_2px_4px_rgba(255,255,255,1)] hover:border-cyan-200/60 hover:px-10 hover:-translate-y-1 z-30 relative hover:text-cyan-700"
                        >
                          <span className="relative z-10 flex items-center justify-between w-full pointer-events-none">
                            Visit XILO
                            <ArrowRight className="w-3.5 h-3.5 ml-4 group-hover/btn:translate-x-2 transition-transform will-change-transform duration-500 text-gray-500" />
                          </span>
                        </SpotlightButton>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 w-full relative">
                    <div className="aspect-square relative max-w-xl mx-auto">
                      <div className="relative h-full w-full bg-white/90 md:bg-white/80 md:backdrop-blur-2xl border border-gray-200/80 shadow-[0_20px_60px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1),-4px_-4px_12px_rgba(255,255,255,0.8)] rounded-[2.5rem] flex items-center justify-center overflow-hidden transition-all duration-700 group-hover/xilo:-translate-y-4 group-hover/xilo:border-cyan-200/40 group-hover/xilo:bg-white/95 md:group-hover/xilo:bg-white/90 group-hover/xilo:shadow-[0_20px_60px_rgba(34,211,238,0.08),inset_0_1px_1px_rgba(255,255,255,1),-4px_-4px_12px_rgba(255,255,255,0.8)]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15)_0%,transparent_70%)] -mr-20 -mt-20 opacity-0 group-hover/xilo:opacity-100 transition-all duration-700 group-hover/xilo:scale-150" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_0%,transparent_70%)] -ml-20 -mb-20 opacity-0 group-hover/xilo:opacity-100 transition-all duration-700 group-hover/xilo:scale-150" />
                        <Database className="w-24 h-24 md:w-32 md:h-32 stroke-1 text-gray-800 drop-shadow-sm group-hover/xilo:scale-110 group-hover/xilo:text-cyan-500 group-hover/xilo:drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-700 relative z-10" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
          </div>

              {/* Sylva */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-[15vh]"
              >
                <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24 relative group/sylva">
                  <div className="flex-1 flex flex-col items-start text-left relative z-10">
                    <div className="relative p-6 md:p-10 bg-linear-to-b from-white/95 to-white/80 md:from-white/90 md:to-white/60 md:backdrop-blur-xl rounded-3xl border border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.02),inset_0_2px_4px_rgba(255,255,255,1)] md:shadow-[0_8px_32px_rgba(0,0,0,0.03),inset_0_2px_4px_rgba(255,255,255,1)]">
                      <div className="inline-flex items-center px-4 py-2 border border-gray-200/80 bg-white/80 backdrop-blur-sm text-gray-800 text-[10px] uppercase tracking-[0.2em] font-sans font-bold rounded-full shadow-sm relative z-10 mb-6 group-hover/sylva:border-teal-200/50 transition-colors duration-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-linear-to-tr from-teal-500 to-teal-300 mr-2 shadow-[0_0_8px_rgba(20,184,166,0.6)] animate-pulse" />
                        Pre-Beta
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-serif tracking-[-0.02em] text-gray-900 leading-tight relative z-10 mb-4 transition-all duration-700 group-hover/sylva:text-teal-400 group-hover/sylva:drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]">Sylva</h3>
                      
                      <p className="text-sm md:text-base text-gray-600 font-sans font-normal leading-relaxed max-w-sm relative z-10">
                        A Monad-native framework for autonomous agents that perform specialized economic and informational tasks. Verifiable performance. Provable ownership.
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mt-8 relative z-10">
                        {["Parallel Execution", "Low Gas Costs", "EVM Compatible", "Immutable Finality"].map((item) => (
                          <div key={item} className="flex items-center text-gray-700 text-xs font-sans font-bold tracking-widest uppercase bg-white/80 backdrop-blur-md rounded-2xl p-3 md:px-5 border border-gray-200/80 shadow-[0_4px_15px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] transition-transform will-change-transform hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(45,212,191,0.15),inset_0_1px_1px_rgba(255,255,255,1)] hover:border-teal-200/50 group/tag">
                            <div className="w-1.5 h-1.5 bg-linear-to-tr from-gray-400 to-gray-300 mr-3 rounded-full shadow-[0_0_8px_rgba(156,163,175,0.6)] group-hover/tag:from-teal-400 group-hover/tag:to-teal-300 group-hover/tag:shadow-[0_0_10px_rgba(45,212,191,0.8)] transition-all duration-300"></div>
                            {item}
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-8 relative z-10">
                        <SpotlightButton 
                          href="https://sylva.oleacomputer.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          color="teal"
                          className="inline-flex items-center justify-between px-8 py-4 border border-gray-200/80 bg-white/80 backdrop-blur-xl text-gray-800 text-[10px] font-sans font-bold tracking-[0.2em] uppercase transition-all duration-700 rounded-full group/btn shadow-[0_8px_32px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,1)] hover:bg-white hover:shadow-[0_12px_40px_rgba(45,212,191,0.15),inset_0_2px_4px_rgba(255,255,255,1)] hover:border-teal-200/60 hover:px-10 hover:-translate-y-1 z-30 relative hover:text-teal-600"
                        >
                          <span className="relative z-10 flex items-center justify-between w-full pointer-events-none">
                            Explore Sylva
                            <ArrowRight className="w-3.5 h-3.5 ml-4 group-hover/btn:translate-x-2 transition-transform will-change-transform duration-500 text-gray-500" />
                          </span>
                        </SpotlightButton>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 w-full relative">
                    <div className="aspect-square relative max-w-xl mx-auto">
                      <div className="relative h-full w-full bg-white/90 md:bg-white/80 md:backdrop-blur-2xl border border-gray-200/80 shadow-[0_20px_60px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1),-4px_-4px_12px_rgba(255,255,255,0.8)] rounded-[2.5rem] flex items-center justify-center overflow-hidden transition-all duration-700 group-hover/sylva:-translate-y-4 group-hover/sylva:border-teal-200/40 group-hover/sylva:bg-white/95 md:group-hover/sylva:bg-white/90 group-hover/sylva:shadow-[0_20px_60px_rgba(45,212,191,0.08),inset_0_1px_1px_rgba(255,255,255,1),-4px_-4px_12px_rgba(255,255,255,0.8)]">
                        <Layers className="w-24 h-24 md:w-32 md:h-32 stroke-1 text-gray-800 drop-shadow-sm group-hover/sylva:scale-110 group-hover/sylva:text-teal-400 group-hover/sylva:drop-shadow-[0_0_15px_rgba(45,212,191,0.4)] transition-all duration-700 relative z-10" />
                        <div className="absolute top-10 left-10 w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.15)_0%,transparent_70%)] opacity-0 group-hover/sylva:opacity-100 transition-all duration-700 group-hover/sylva:scale-150" />
                        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.1)_0%,transparent_70%)] opacity-0 group-hover/sylva:opacity-100 transition-all duration-700 group-hover/sylva:scale-150" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
