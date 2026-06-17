"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Inquisitive Mind Academy"
            className="h-9 w-9 rounded-full object-cover"
          />

          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">
              Inquisitive Mind
            </div>
            <div className="text-[10px] tracking-[0.3em] text-slate-500">
              ACADEMY
            </div>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-8 text-sm text-slate-600 lg:flex">
          <a href="#" className="hover:text-slate-900 transition">Home</a>
          <a href="#courses" className="hover:text-slate-900 transition">Courses</a>
          <a href="#about" className="hover:text-slate-900 transition">About</a>
          <a href="#success" className="hover:text-slate-900 transition">Results</a>
          <a href="#contact" className="hover:text-slate-900 transition">Contact</a>
        </nav>

        {/* ACTIONS */}
        <div className="hidden lg:flex items-center gap-5">

          {/* LOGIN (subtle text button) */}
          <a
            href="/login"
            className="text-sm text-slate-600 hover:text-slate-900 transition"
          >
            Login
          </a>

          {/* CTA */}
          <button className="rounded-full bg-slate-900 px-5 py-2 text-sm text-white hover:scale-105 transition">
            Enroll Now
          </button>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="text-slate-900 lg:hidden text-xl"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:hidden overflow-hidden border-t border-slate-100 bg-white"
          >
            <div className="flex flex-col gap-5 px-6 py-6 text-sm text-slate-600">

              {["Home", "Courses", "About", "Results", "Contact"].map(
                (item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="hover:text-slate-900 transition"
                    onClick={() => setOpen(false)}
                  >
                    {item}
                  </a>
                )
              )}

              {/* LOGIN */}
              <a
                href="/login"
                className="text-slate-700 hover:text-slate-900 transition"
              >
                Login
              </a>

              {/* CTA */}
              <button className="mt-2 rounded-full bg-slate-900 px-5 py-3 text-white">
                Enroll Now
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}