"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowLeft } from "react-icons/bs";
import { BiCheck, BiCopy } from "react-icons/bi";
import { CiMonitor } from "react-icons/ci";

const Embed = ({ ownerId }: { ownerId: string }) => {
  const navigate = useRouter();
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // Chat open/close state

  const embedCode = `<script 
  src='${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js' 
  data-owner-id="${ownerId}">
</script>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 pb-20">
      {/* Navbar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            onClick={() => navigate.push("/")}
            className="text-2xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-all"
          >
            Support <span className="text-indigo-600 hover:text-indigo-700">AI</span>
          </div>

      <button
  onClick={() => navigate.back()}
  className="flex items-center gap-2 px-4 py-2 rounded-full 
             bg-indigo-600 hover:bg-indigo-700 text-white 
             font-medium text-sm cursor-pointer
             border border-zinc-200
             transition-all duration-200 ease-in-out
             active:scale-95 shadow-sm hover:shadow-md"
>
  <BsArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
  <span>Back to Dashboard</span>
</button>
        </div>
      </motion.div>

      <div className="flex justify-center px-4 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 md:p-12">
            <h1 className="text-3xl font-bold mb-2">Embed Chatbot</h1>
            <p className="text-zinc-500 mb-8">
              Copy and paste this code snippet before the closing{" "}
              <code>&lt;/body&gt;</code> tag of your website.
            </p>

            {/* Code Block Container */}
            <div className="relative group">
              <div className="absolute right-4 top-4">
                <button
                  onClick={copyCode}
                  className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs py-2 px-4 rounded-lg transition-all active:scale-95"
                >
                  {copied ? (
                    <BiCheck size={14} className="text-green-400" />
                  ) : (
                    <BiCopy size={14} />
                  )}
                  {copied ? "Copied!" : "Copy Code"}
                </button>
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto border border-zinc-800 shadow-inner">
                <pre className="text-zinc-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                  {embedCode}
                </pre>
              </div>
            </div>

            {/* Steps Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                <span className="font-bold text-blue-600 block mb-1">
                  Step 1
                </span>
                Copy the script.
              </div>
              <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                <span className="font-bold text-blue-600 block mb-1">
                  Step 2
                </span>
                Paste it in your HTML.
              </div>
              <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                <span className="font-bold text-blue-600 block mb-1">
                  Step 3
                </span>
                Check the preview.
              </div>
            </div>

            {/* Preview Section */}
            <div className="mt-16">
              <div className="flex items-center gap-2 mb-4 text-zinc-500">
                <CiMonitor size={22} />
                <h2 className="text-lg font-semibold text-zinc-800">
                  Live Preview
                </h2>
              </div>

              {/* Browser Frame */}
              <div className="rounded-xl border border-zinc-300 bg-white shadow-2xl overflow-hidden relative">
                <div className="flex items-center gap-2 px-4 h-10 bg-zinc-100 border-b border-zinc-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="ml-4 bg-white px-3 py-1 rounded text-[10px] text-zinc-400 w-48 border border-zinc-200">
                    https://your-website.com
                  </div>
                </div>

                {/* Website Content Placeholder */}
                <div className="h-96 bg-white p-8 overflow-hidden relative">
                  <div className="space-y-4 opacity-30">
                    <div className="h-4 w-2/3 bg-zinc-200 rounded" />
                    <div className="h-4 w-full bg-zinc-200 rounded" />
                    <div className="h-32 w-full bg-zinc-100 rounded-lg border border-dashed border-zinc-200" />
                  </div>

                  {/* Chat Widget Container */}
                  <div className="absolute bottom-6 right-6 flex flex-col items-end gap-3 z-20">
                    {/* AnimatePresence helps with exit animations */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            scale: 0.9,
                            y: 20,
                            transformOrigin: "bottom right",
                          }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 20 }}
                          className="w-64 bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden"
                        >
                          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                              <span className="text-[11px] font-medium">
                                Support AI
                              </span>
                            </div>
                            <span
                              onClick={() => setIsOpen(false)}
                              className="text-xs cursor-pointer opacity-70 hover:opacity-100"
                            >
                              ✕
                            </span>
                          </div>

                          <div className="p-4 space-y-3 bg-zinc-50 h-44 overflow-y-auto text-[11px]">
                            <div className="bg-white border border-zinc-200 text-zinc-800 p-2.5 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
                              Hello! How can I help you?
                            </div>
                            <div className="bg-blue-600 text-white p-2.5 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] ml-auto">
                              What is the return policy?
                            </div>
                          </div>

                          <div className="p-3 bg-white border-t border-zinc-100">
                            <div className="text-[10px] text-zinc-400 bg-zinc-50 rounded-full px-3 py-1.5 border border-zinc-200">
                              Write a message...
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/* Floating Chat Bubble (The Trigger Icon) */}
                    <motion.div
                      animate={{
                        y: [0, -8, 0], // Floating motion
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform active:scale-95 border-4 border-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                      </svg>
                    </motion.div>
                  </div>
                  {/* End of Chat Widget */}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Embed;
