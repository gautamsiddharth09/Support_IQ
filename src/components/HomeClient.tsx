"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

function HomeClient({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
    setLoading(true);
  };

  // getstated
  const [start,setStart] = useState(false)

  const getstarted = () => {
    setStart(true);
    setTimeout(() => {
     setStart(false)
      
    }, 2000);
  };


  const firstLetter = email ? email[0].toUpperCase() : "";
  const [open, setOpen] = useState(false);

  //  mouse down event
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // if the clicked element is NOT inside popup
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navigate = useRouter();

  // feature
  const features = [
    {
      title: "Plug & Play",
      desc: "Easily add the chatbot to your website with a single script tag.",
    },
    {
      title: "Admin Controlled",
      desc: "Manage exactly what the AI knows and how it responds to users.",
    },
    {
      title: "Customizable AI",
      desc: "Control what the chatbot knows and how it responds.",
    },
    {
      title: "Always-On Assistance",
      desc: "Offer instant support 24/7 to your customers.",
    },
    {
      title: "Analytics & Insights",
      desc: "Track conversations to optimize support and engagement.",
    },
    {
      title: "Multi-Channel Support",
      desc: "Deliver consistent AI help across web and mobile.",
    },
  ];

  // log out
  const handleLogout = async () => {
    try {
      const result = await axios.get("/api/auth/logout");
      window.location.href = "/";
      console.log("hello");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden">
        {/* Navbar */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-zinc-200"
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div
              className="text-2xl font-bold tracking-wide cursor-pointer 
                   text-zinc-900 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Support{" "}
              <span className="text-indigo-600 hover:text-indigo-700">AI</span>
            </div>

            {email ? (
              <div className="relative" ref={popupRef}>
                <button
                  className="w-10 h-10 rounded-full bg-indigo-600 text-white text-sm font-medium 
                  flex justify-center items-center text-xl
                  hover:bg-indigo-700 transition-colors duration-300
                  cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  {firstLetter}
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden"
                    >
                      <button
                        className="w-full  px-4 py-3 text-sm hover:bg-zinc-100 cursor-pointer"
                        onClick={() => navigate.push("/dashboard")}
                      >
                        Dashboard
                      </button>
                      <button
                        className="w-full px-4 py-3 text-sm text-red-600 hover:bg-zinc-100 text-center cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                className="px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium
                hover:bg-indigo-700 transition-colors duration-300
                flex items-center gap-2 cursor-pointer
                disabled:opacity-60 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={loading}
                onClick={handleLogin}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            )}
          </div>
        </motion.div>
        {/* left */}
        <section className="pt-32 pb-28 px-6 bg-gradient-to-b from-white to-zinc-50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center md:text-left"
            >
              <span className="inline-block px-4 py-1 text-sm bg-zinc-100 text-zinc-700 rounded-full mb-6">
                AI-Powered Customer Experience
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight tracking-tight text-zinc-900">
                Turn Website Visitors <br />
                Into Happy Customers <br />
                Automatically
              </h1>

              <p className="mt-6 text-lg text-zinc-600 max-w-xl mx-auto md:mx-0">
                Embed once. Support forever.
                <br />
                An AI assistant trained on your website, delivering instant,
                automated customer support — 24/7 at scale.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                {email ? (
                  <button
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                    onClick={() => navigate.push("/dashboard")}
                  >
                    Get to Dashboard
                  </button>
                ) : (
                  <button 
                  onClick={getstarted}
                  className="px-6 py-3 rounded-xl bg-black hover:bg-indigo-700 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                    {start ? (
                      <p className="text-[10px] text-zinc-400 font-bold tracking-wide uppercase">
                       * Login is required
                      </p>
                    ) : (
                      "Get Started"
                    )}
                  </button>
                )}

                <a
                  href="#feature"
                  className="px-6 py-3 rounded-xl border border-zinc-300 text-zinc-800 font-medium hover:bg-indigo-50 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-sm text-zinc-500 justify-center md:justify-start">
                <span>✔ Instant Replies</span>
                <span>✔ Boost Conversions</span>
                <span>✔ Deploy in 2 Minutes</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, y: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6">
                <div className="text-sm text-zinc-500 mb-3">
                  Live Chat Preview
                </div>

                <div className="space-y-3">
                  <div className="bg-black hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit">
                    Do you offer cash on delivery ?
                  </div>

                  <div className="bg-zinc-100 rounded-lg px-4 py-2 text-sm w-fit">
                    Yes, Cash On Delivery is available.
                  </div>

                  <div className="bg-black hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit">
                    Do you provide free shipping ?
                  </div>

                  <div className="bg-zinc-100 rounded-lg px-4 py-2 text-sm w-fit">
                    Yes, free shipping is available.
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="
                  absolute -bottom-6 -right-6
                  w-14 h-14 rounded-full
                  bg-black text-white
                  flex items-center justify-center
                  shadow-xl"
                >
                  🗪
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="feature"
          className="bg-zinc-50 py-28 px-6 border-t border-zinc-200"
        >
          <div className="max-w-6xl mx-auto">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-extrabold text-center text-zinc-900 mb-16 leading-tight"
            >
              Why Businesses Choose  <span className="text-indigo-600">Support IQ</span>
            </motion.h2>

            {/* Feature Cards */}
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            
          </div>
        </section>

        <footer className="bg-zinc-900 text-zinc-100 py-16 px-6">
          <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-4">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Support IQ</h3>
              <p className="text-zinc-400">
                AI-powered chatbot for businesses. Embed seamlessly and provide
                24/7 support.
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://www.instagram.com/gautamsiddharth09/"
                  target="_blank"
                  className="hover:text-indigo-500 transition-colors"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/gautam-kumar-b4052b9b/"
                  target="_blank"
                  className="hover:text-indigo-500 transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://wa.me/7808233110?text=Hello%20I%20visited%20your%20website"
                  target="_blank"
                  className="hover:text-indigo-500 transition-colors"
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a
                    href="#feature"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#get-started"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#demo"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Demo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Docs
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    API Docs
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-white mb-4">Subscribe</h4>
              <p className="text-zinc-400 mb-4">
                Get the latest updates and news.
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 flex-1"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 border-t border-zinc-700 pt-6 text-center text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} Support IQ. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}

export default HomeClient;
