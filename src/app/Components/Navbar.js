"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">

        {/* Logo */}
        <div className="text-sm font-semibold tracking-[0.3em] text-slate-900">
          Inquistive Mind Accademy
        </div>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-10 text-sm text-slate-600 lg:flex">

          <a href="#" className="hover:text-slate-900 transition">
            Home
          </a>

          <a href="#courses" className="hover:text-slate-900 transition">
            Courses
          </a>

          <a href="#about" className="hover:text-slate-900 transition">
            About
          </a>

          <a href="#success" className="hover:text-slate-900 transition">
            Results
          </a>

          <a href="#contact" className="hover:text-slate-900 transition">
            Contact
          </a>
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <button className="rounded-full bg-slate-900 px-5 py-2 text-sm text-white hover:scale-105 transition">
            Enroll Now
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-slate-900 lg:hidden"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-slate-100 bg-white">

          <div className="flex flex-col gap-6 px-6 py-6 text-sm text-slate-600">

            <a href="#">Home</a>
            <a href="#courses">Courses</a>
            <a href="#about">About</a>
            <a href="#success">Results</a>
            <a href="#contact">Contact</a>

            <button className="mt-4 rounded-full bg-slate-900 px-5 py-3 text-white">
              Enroll Now
            </button>

          </div>
        </div>
      )}

    </header>
  );
}