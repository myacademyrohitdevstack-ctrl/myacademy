"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200/60 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/icon1.png"
            alt="Inquisitive Mind Academy"
            className="h-11 w-11 object-contain"
          />

          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Inquisitive Mind
            </h2>

            <p className="text-[10px] tracking-[0.35em] text-[#D6451B]">
              ACADEMY
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#D6451B]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-5">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Login
          </Link>

          <button className="rounded-full bg-[#D6451B] px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
            Enroll Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-xl text-slate-900 lg:hidden"
          aria-label="Toggle Menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-100 bg-white lg:hidden"
          >
            <div className="px-6 py-6">
              <nav className="flex flex-col gap-5">
                {links.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-slate-700"
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <Link
                    href="/login"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Login
                  </Link>

                  <button className="mt-4 w-full rounded-full bg-[#D6451B] py-3 text-sm font-medium text-white">
                    Enroll Now
                  </button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}