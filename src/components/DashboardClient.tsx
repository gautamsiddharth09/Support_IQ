"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { tr } from "motion/react-client";

function DashboardClient({ ownerId }: { ownerId: string }) {
  const router = useRouter();

  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  
  const handleLogon = ()=>{
    setLoading(true)
  }
  const isFormValid =
  businessName.trim() &&
  supportEmail.trim() &&
  knowledge.trim();

  // Fetch existing settings
  useEffect(() => {
    console.log("OwnerId:", ownerId);
    if (!ownerId) return;

    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(
          `/api/setting/get?ownerId=${ownerId}`
        );

        setBusinessName(data?.businessName || "");
        setSupportEmail(data?.supportEmail || "");
        setKnowledge(data?.knowledge || "");
      } catch (err: any) {
        console.error(err);
        setError("Failed to load settings");
      }
    };

    fetchDetails();
  }, [ownerId]);

  // Save / Update settings
  const handleSetting = async () => {
    try {
      setLoading(true);
      setError("");

      await axios.post("/api/setting", {
        ownerId,
        businessName,
        supportEmail,
        knowledge,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/*Navbar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            onClick={() => router.push("/")}
            className="text-2xl font-bold tracking-wide cursor-pointer 
              hover:scale-105 transition-all duration-300"
          >
            Support <span onClick={handleLogon} className="text-indigo-600 hover:text-indigo-700">{loading ? "AI.." : "AI"}</span>
          </div>

          <button
            onClick={() => router.push("/embed")}
            className="bg-indigo-600 hover:bg-indigo-700  active:bg-blue-800 
              text-white font-medium px-5 py-2.5 rounded-lg 
              shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            Embed ChatBot
          </button>
        </div>
      </motion.div>

      {/*  Main Content */}
      <div className="flex justify-center px-4 py-14 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-2xl font-semibold">ChatBot Setting</h1>
            <p className="text-zinc-500 mt-1">
              Manage your AI ChatBot knowledge and business details
            </p>
          </div>

          {/* Business Details */}
          <div className="mb-10">
            <h2 className="text-lg font-medium mb-4">Business Details</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80 transition"
              />

              <input
                type="email"
                placeholder="Support Email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80 transition"
              />
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="mb-10">
            <h2 className="text-lg font-medium mb-2">Knowledge Base</h2>
            <p className="text-sm text-zinc-500 mb-4">
              Add FAQs, policies, delivery info, refund details, etc.
            </p>

            <textarea
              value={knowledge}
              onChange={(e) => setKnowledge(e.target.value)}
              className="w-full min-h-[180px] rounded-xl border border-zinc-300 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/80 transition"
              placeholder={`Example:
• Refund policy: 7 days return available
• Delivery time: 3–5 working days
• Cash on delivery available
• Support hours: 9 AM – 6 PM`}
            />
          </div>

          {/* Save Section */}
          <div className="flex flex-col items-end gap-2">
            <motion.button
               disabled={!isFormValid || loading}
              onClick={handleSetting}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              className="px-6 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </motion.button>

            {saved && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-emerald-600"
                
              >
                ✔ Settings saved successfully
              </motion.span>
            )}

            {error && (
              <span className="text-sm font-medium text-red-500">
                {error}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default DashboardClient;