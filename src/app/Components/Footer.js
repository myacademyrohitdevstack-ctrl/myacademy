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

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.10),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 pt-16 sm:pt-24 pb-10">

        {/* ================= CTA ================= */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 sm:p-10 md:p-14 text-center">

          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-slate-400">
            JOIN GLOBAL LANGUAGE LEARNERS
          </p>

          <h2 className="mt-4 sm:mt-5 text-2xl sm:text-4xl font-bold leading-snug">
            Learn English & French with{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              real speaking practice
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Live classes, structured pathways, and global speaking rooms designed for real fluency.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-80 rounded-full border border-slate-300 px-5 py-3 text-sm outline-none focus:border-blue-500"
            />

            <button className="rounded-full bg-slate-900 px-6 sm:px-8 py-3 text-white hover:scale-105 transition">
              Get Free Demo
            </button>
          </div>
        </div>

        {/* ================= GRID ================= */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <h2 className="text-lg sm:text-xl font-bold">
              Global Language Academy
            </h2>

            <p className="mt-3 sm:mt-4 text-sm text-slate-600 leading-relaxed">
              Structured learning for real-world communication. Speak confidently with global practice.
            </p>

            {/* Contact */}
            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <FaPhone /> +91 98765 43210
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope /> support@academy.com
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt /> India • Online Classes
              </div>
            </div>

            {/* Social */}
            <div className="mt-5 flex gap-4 text-slate-600">
              <FaFacebook className="hover:text-blue-600 cursor-pointer transition" />
              <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />
              <FaLinkedin className="hover:text-blue-700 cursor-pointer transition" />
              <FaYoutube className="hover:text-red-500 cursor-pointer transition" />
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold mb-3">Programs</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>English Fluency</li>
              <li>French Course</li>
              <li>IELTS Prep</li>
              <li>Business English</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Live Classes</li>
              <li>Native Trainers</li>
              <li>Speaking Practice</li>
              <li>Global Community</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>About</li>
              <li>Faculty</li>
              <li>Success Stories</li>
              <li>Contact</li>
            </ul>
          </div>

        </div>

        {/* ================= TRUST STRIP ================= */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm text-slate-600 border-t border-slate-200 pt-8">

          <div>
            <p className="font-semibold text-slate-900">12K+</p>
            <p className="text-xs">Students</p>
          </div>

          <div>
            <p className="font-semibold text-slate-900">25+</p>
            <p className="text-xs">Countries</p>
          </div>

          <div>
            <p className="font-semibold text-slate-900">98%</p>
            <p className="text-xs">Success</p>
          </div>

          <div>
            <p className="font-semibold text-slate-900">24/7</p>
            <p className="text-xs">Support</p>
          </div>

        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-10 sm:mt-14 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-center">

          <p className="text-[10px] sm:text-xs text-slate-500 tracking-[0.2em]">
            © {new Date().getFullYear()} GLOBAL LANGUAGE ACADEMY
          </p>

          <p className="text-[10px] sm:text-xs text-slate-400 tracking-[0.3em]">
            SPEAK • PRACTICE • FLUENCY
          </p>

        </div>

      </div>
    </footer>
  );
}