"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
<div className="min-h-screen pt-20 flex items-center justify-center bg-white text-slate-900 relative overflow-hidden px-4 sm:px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_60%)]" />

      {/* MAIN CARD */}
      <div className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 shadow-xl border border-slate-200 rounded-2xl md:rounded-3xl overflow-hidden ">

        {/* LEFT SIDE (hidden on mobile) */}
        <div className="hidden md:flex flex-col justify-center p-10 lg:p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">

          <h1 className="text-3xl font-bold leading-snug">
            Start Your Journey at{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Global Language Academy
            </span>
          </h1>

          <p className="mt-4 text-slate-300 text-sm leading-relaxed">
            Join thousands of learners improving fluency through live classes,
            structured learning paths, and real conversations.
          </p>

          <div className="mt-8 space-y-2 text-sm text-slate-300">
            <p>✔ Beginner → Advanced roadmap</p>
            <p>✔ Live speaking practice</p>
            <p>✔ Global community access</p>
            <p>✔ Expert trainers</p>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="bg-white p-6 sm:p-10 lg:p-12">

          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-sm text-slate-500 mt-1">
              Start your free learning journey
            </p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 sm:space-y-5"
          >

            {/* Name */}
            <div className="relative">
              <FaUser className="absolute top-3.5 left-3 text-slate-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-3.5 left-3 text-slate-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-3.5 left-3 text-slate-400" />
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-blue-500 outline-none"
              />
            </div>

            {/* Terms */}
            <div className="text-xs text-slate-500 leading-relaxed">
              By signing up, you agree to our{" "}
              <span className="text-blue-600 cursor-pointer">Terms</span> and{" "}
              <span className="text-blue-600 cursor-pointer">Privacy Policy</span>.
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-3 rounded-xl hover:scale-[1.02] transition"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-xs text-slate-400">OR</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            {/* Google */}
            <button className="w-full border border-slate-300 py-3 rounded-xl text-sm hover:bg-slate-50 transition">
              Continue with Google
            </button>

            {/* Login */}
            <p className="text-xs text-center text-slate-500 mt-5">
              Already have an account?{" "}
              <span className="text-blue-600 cursor-pointer">Login</span>
            </p>

          </motion.form>
        </div>

      </div>
    </div>
  );
}