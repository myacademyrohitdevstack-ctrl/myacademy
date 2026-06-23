"use client";

import Link from "next/link";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* Top CTA Strip */}

      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 text-center lg:flex-row lg:text-left">
          <div>
            <h3 className="text-2xl font-bold">
              Start Your Learning Journey Today
            </h3>

            <p className="mt-2 text-white/60">
              English Speaking • French Language • Classes 6th to 12th
            </p>
          </div>

          <button
            className="
              rounded-2xl
              bg-[#D6451B]
              px-6 py-3
              font-semibold
              transition
              hover:bg-[#bf3b14]
            "
          >
            Book Free Demo
          </button>
        </div>
      </div>

      {/* Main Footer */}

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">

          {/* Brand */}

          <div>
            <h2 className="text-3xl font-bold text-[#D6451B]">
              Your Academy
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Helping students build confidence in English,
              master French language skills, and achieve
              academic success through live interactive classes.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="rounded-xl bg-white/10 p-3 transition hover:bg-[#D6451B]"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="rounded-xl bg-white/10 p-3 transition hover:bg-[#D6451B]"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="rounded-xl bg-white/10 p-3 transition hover:bg-[#D6451B]"
              >
                <FaYoutube />
              </a>

              <a
                href="#"
                className="rounded-xl bg-white/10 p-3 transition hover:bg-[#D6451B]"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Courses */}

          <div>
            <h3 className="text-lg font-semibold">
              Courses
            </h3>

            <ul className="mt-5 space-y-3 text-white/60">
              <li>
                <Link href="#">
                  Spoken English
                </Link>
              </li>

              <li>
                <Link href="#">
                  English Grammar
                </Link>
              </li>

              <li>
                <Link href="#">
                  IELTS Preparation
                </Link>
              </li>

              <li>
                <Link href="#">
                  French Language
                </Link>
              </li>

              <li>
                <Link href="#">
                  School English (6th-12th)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-white/60">
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/about">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/courses">
                  Courses
                </Link>
              </li>

              <li>
                <Link href="/contact">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-lg font-semibold">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4">

              <div className="flex gap-3">
                <FaPhoneAlt className="mt-1 text-[#D6451B]" />

                <div className="text-white/60">
                  +91 98765 43210
                </div>
              </div>

              <div className="flex gap-3">
                <FaEnvelope className="mt-1 text-[#D6451B]" />

                <div className="text-white/60">
                  info@youracademy.com
                </div>
              </div>

              <div className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 text-[#D6451B]" />

                <div className="text-white/60">
                  Punjab, India
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-white/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} Your Academy.
            All rights reserved.
          </p>

          <p>
            Designed for English • French • School Education
          </p>
        </div>
      </div>
    </footer>
  );
}