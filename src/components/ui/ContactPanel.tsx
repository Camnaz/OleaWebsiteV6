"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, Loader } from "lucide-react";
import { useState } from "react";

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type State = "idle" | "sending" | "success" | "error";

export function ContactPanel({ isOpen, onClose }: ContactPanelProps) {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", body: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState("success");
    } catch (err: unknown) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setState("idle");
      setForm({ name: "", email: "", subject: "", body: "" });
      setErrorMsg("");
    }, 400);
  };

  const inputClass =
    "w-full bg-white/50 backdrop-blur-sm border border-gray-200/70 rounded-xl px-4 py-3 text-sm font-sans text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400/60 focus:bg-white/70 transition-all duration-300";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-black/10 backdrop-blur-[2px]"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md bg-white/90 backdrop-blur-2xl border-l border-gray-200/50 shadow-[-20px_0_60px_rgba(0,0,0,0.06)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100/80">
              <span className="text-base font-serif tracking-tight text-gray-900">Send a message</span>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-700 transition-colors duration-300 p-1.5 rounded-full hover:bg-gray-100/60 cursor-none"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              <AnimatePresence mode="wait">
                {state === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full flex flex-col items-center justify-center text-center gap-6 py-20"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 18 }}
                    >
                      <CheckCircle className="w-14 h-14 text-gray-500 stroke-1" />
                    </motion.div>
                    <div>
                      <p className="text-xl font-serif text-gray-900 mb-2">Message sent</p>
                      <p className="text-sm font-sans text-gray-500 leading-relaxed max-w-xs">
                        We received your message and will get back to you shortly.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="mt-4 text-[10px] font-sans tracking-[0.2em] uppercase text-gray-600 hover:text-gray-700 transition-colors duration-300 cursor-none border border-gray-200/60 px-6 py-2.5 rounded-full hover:bg-gray-50/60"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <label className="block text-[10px] font-sans tracking-[0.18em] uppercase text-gray-400 mb-2">Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans tracking-[0.18em] uppercase text-gray-400 mb-2">Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans tracking-[0.18em] uppercase text-gray-400 mb-2">Subject</label>
                      <input
                        name="subject"
                        type="text"
                        required
                        placeholder="What's this about?"
                        value={form.subject}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans tracking-[0.18em] uppercase text-gray-400 mb-2">Message</label>
                      <textarea
                        name="body"
                        required
                        rows={8}
                        placeholder="Write your message here..."
                        value={form.body}
                        onChange={handleChange}
                        className={`${inputClass} resize-none leading-relaxed`}
                      />
                    </div>

                    {state === "error" && (
                      <p className="text-xs font-sans text-red-500 text-center">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className="mt-2 inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-gray-300/40 bg-white/30 backdrop-blur-xl text-gray-800 text-[10px] font-sans tracking-[0.2em] uppercase rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,0.8)] hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed cursor-none"
                    >
                      {state === "sending" ? (
                        <>
                          <Loader className="w-3.5 h-3.5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
