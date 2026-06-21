"use client";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHome,
  FaBookOpen,
  FaInfoCircle,
  FaPhoneAlt
} from "react-icons/fa";
const links = [
  { name: "Home", path: "/", icon: FaHome },
  { name: "Courses", path: "/courses", icon: FaBookOpen },
  { name: "About", path: "/about", icon: FaInfoCircle },
  { name: "Contact", path: "/contact", icon: FaPhoneAlt },
];
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white border-t border-slate-100">
      {/* Brand Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,69,27,0.06),transparent_60%)]" />
      {/* Premium Watermark */}
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  <div className="relative">

    <div className="absolute inset-0 blur-3xl bg-[#D6451B]/10 rounded-full" />

    <img
      src="/icon1.png"
      alt=""
      className="relative w-[450px] h-[450px] object-contain opacity-[0.04]"
    />
  </div>
</div>
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        {/* TOP */}
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <img
                src="/icon1.png"
                alt="Inquisitive Mind Academy"
                className="h-14 w-14 object-contain"
              />

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Inquisitive Mind Academy
                </h3>

                <p className="text-xs tracking-[0.3em] text-slate-500 mt-1">
                  LANGUAGE • COMMUNICATION • CONFIDENCE
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-lg text-slate-600 leading-relaxed">
              Empowering learners through English and French language training,
              real conversation practice, live mentorship, and structured
              fluency pathways designed for long-term success.
            </p>

            <div className="mt-6 flex gap-4 text-lg">
              <FaFacebook className="cursor-pointer text-slate-500 transition hover:text-[#D6451B]" />
              <FaInstagram className="cursor-pointer text-slate-500 transition hover:text-[#D6451B]" />
              <FaLinkedin className="cursor-pointer text-slate-500 transition hover:text-[#D6451B]" />
              <FaYoutube className="cursor-pointer text-slate-500 transition hover:text-[#D6451B]" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900">
              Quick Links
            </h4>

            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-600">
             {links.map((item) => {
  const Icon = item.icon;

  return (
    <Link
      key={item.name}
      href={item.path}
      className="flex items-center gap-4 rounded-2xl px-4 py-1 "
    >
      <Icon className="text-[#D6451B]" />
      {item.name}
    </Link>
  );
})}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-slate-900">
              Contact
            </h4>

            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="flex gap-3">
                <FaPhone className="mt-1 text-[#D6451B]" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex gap-3">
                <FaEnvelope className="mt-1 text-[#D6451B]" />
                <span>support@academy.com</span>
              </div>

              <div className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 text-[#D6451B]" />
                <span>India • Online & Offline Classes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-slate-200" />

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            BUILDING CONFIDENT COMMUNICATORS
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
            Speak with Confidence.
            <span className="block bg-gradient-to-r from-[#D6451B] to-[#7BC3D7] bg-clip-text text-transparent">
              Learn Without Limits.
            </span>
          </h2>

          <button className="mt-8 rounded-full bg-[#D6451B] px-8 py-3 text-white transition hover:opacity-90">
            Enroll Now
          </button>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Inquisitive Mind Academy. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}