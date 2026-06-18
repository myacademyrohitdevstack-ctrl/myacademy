"use client";

import {
  FaArrowRight,
  FaGlobe,
  FaBriefcase,
  FaGraduationCap,
  FaComments,
} from "react-icons/fa";

export default function CTA() {
  return (
    <section className="relative py-28 overflow-hidden bg-slate-950 text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}
            <div className="p-8 md:p-14 lg:p-20">

              <p className="text-xs tracking-[0.35em] text-white/50">
                YOUR FUTURE STARTS HERE
              </p>

              <h2 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
                Where will your
                <span className="block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  language skills
                </span>
                take you?
              </h2>

              <p className="mt-6 text-white/70 max-w-lg leading-relaxed">
                Every fluent speaker started with a single lesson.
                Join a learning system designed around real-world
                communication, confidence, and growth.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">

                <button className="group rounded-full bg-white text-slate-900 px-8 py-4 font-medium flex items-center justify-center gap-3 hover:scale-105 transition">
                  Start Learning Today
                  <FaArrowRight className="group-hover:translate-x-1 transition" />
                </button>

                <button className="rounded-full border border-white/20 px-8 py-4 text-white hover:bg-white/5 transition">
                  Book Free Demo
                </button>

              </div>

            </div>

            {/* RIGHT */}
            <div className="border-l border-white/10 p-8 md:p-14 lg:p-20">

              <div className="grid sm:grid-cols-2 gap-5">

                {[
                  {
                    icon: <FaGraduationCap />,
                    title: "Study Abroad",
                    desc: "Prepare for universities and international admissions.",
                  },
                  {
                    icon: <FaBriefcase />,
                    title: "Career Growth",
                    desc: "Improve workplace communication and opportunities.",
                  },
                  {
                    icon: <FaGlobe />,
                    title: "Global Access",
                    desc: "Connect confidently with people worldwide.",
                  },
                  {
                    icon: <FaComments />,
                    title: "Fluent Speaking",
                    desc: "Express yourself naturally and confidently.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition"
                  >

                    <div className="text-2xl text-blue-400">
                      {item.icon}
                    </div>

                    <h3 className="mt-4 text-lg font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-white/60 leading-relaxed">
                      {item.desc}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}