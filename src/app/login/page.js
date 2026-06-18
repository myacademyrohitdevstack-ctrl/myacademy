"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaArrowRight,
} from "react-icons/fa";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white py-20">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,69,27,0.08),transparent_50%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-md items-center px-5 py-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          {/* Logo */}
          <div className="text-center">
            <img
              src="/icon1.png"
              alt="IMA"
              className="mx-auto h-16 w-16 object-contain"
            />

            <h1 className="mt-6 text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Login to continue your learning journey.
            </p>
          </div>

          {/* Form Card */}
          <div className="mt-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl">

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-2xl border border-slate-200 py-3.5 pl-12 pr-4 outline-none focus:border-[#D6451B]"
              />
            </div>

            {/* Password */}
            <div className="relative mt-4">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-2xl border border-slate-200 py-3.5 pl-12 pr-4 outline-none focus:border-[#D6451B]"
              />
            </div>

            {/* Forgot Password */}
            <div className="mt-3 text-right">
              <span className="text-xs font-medium text-[#D6451B] cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            {/* Submit */}
            <button
              onClick={() => setLoading(true)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D6451B] py-3.5 font-medium text-white hover:opacity-90"
            >
              {loading ? "Logging in..." : "Login"}
              <FaArrowRight />
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google */}
            <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 py-3.5 hover:bg-slate-50">
              <FaGoogle />
              Continue with Google
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account?
            <span className="ml-2 font-medium text-[#D6451B] cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}