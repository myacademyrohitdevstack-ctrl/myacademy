"use client";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-white text-slate-900 overflow-hidden">

      {/* glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.10),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-12">

        {/* ================= NAME MONUMENT ================= */}
        <div className="text-center">

          <p className="text-[10px] tracking-[0.35em] text-slate-400">
            GLOBAL LANGUAGE ACADEMY
          </p>

          <h1 className="mt-6 text-4xl sm:text-6xl font-bold leading-tight">
            Speak{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              confidently
            </span>
          </h1>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
            English & French fluency training through live practice, real conversations,
            and structured learning paths.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-80 rounded-full border border-slate-300 px-5 py-3 text-sm outline-none focus:border-blue-500"
            />

            <button className="rounded-full bg-slate-900 px-8 py-3 text-white hover:scale-105 transition">
              Get Free Demo
            </button>

          </div>

        </div>

        {/* ================= DIVIDER ================= */}
        <div className="my-16 flex items-center justify-center">
          <div className="h-px w-full bg-slate-200" />
        </div>

        {/* ================= BRAND DETAILS (minimal) ================= */}
        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">

          {/* Contact */}
          <div className="space-y-3 text-sm text-slate-600">

            <div className="flex items-center justify-center md:justify-start gap-2">
              <FaPhone /> +91 98765 43210
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope /> support@academy.com
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2">
              <FaMapMarkerAlt /> India • Online Classes
            </div>

          </div>

          {/* Social */}
          <div className="flex justify-center gap-5 text-xl text-slate-600">
            <FaFacebook className="hover:text-blue-600 cursor-pointer transition" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />
            <FaLinkedin className="hover:text-blue-700 cursor-pointer transition" />
            <FaYoutube className="hover:text-red-500 cursor-pointer transition" />
          </div>

          {/* Tagline */}
          <div className="text-center md:text-right text-xs tracking-[0.3em] text-slate-400">
            SPEAK • PRACTICE • FLUENCY
          </div>

        </div>

        {/* ================= FINAL BRAND EMPHASIS ================= */}
        <div className="mt-16 text-center">

          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            THE FUTURE OF LANGUAGE LEARNING
          </div>

          <div className="mt-4 text-2xl sm:text-3xl font-semibold">
            INQUISTIVE MIND ACADEMY
          </div>

          <p className="mt-3 text-xs text-slate-500">
            © {new Date().getFullYear()} All rights reserved
          </p>

        </div>

      </div>
    </footer>
  );
}