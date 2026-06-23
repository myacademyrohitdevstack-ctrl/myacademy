"use client";

import { useRouter } from "next/navigation";
import {
  FaArrowRight,
  FaLanguage,
  FaGraduationCap,
  FaSchool,
  FaBookReader,
} from "react-icons/fa";

export default function CTA() {
  const router=useRouter()
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D6451B] via-[#e95c2d] to-[#ff7a45]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-white/10 backdrop-blur-xl">

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}
            <div className="p-8 md:p-12 lg:p-16 text-white">

              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.25em] uppercase">
                Start Your Learning Journey
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
                Learn English,
                <span className="block">
                  French & School Subjects
                </span>
                With Expert Teachers
              </h2>

              <p className="mt-6 max-w-xl text-lg text-white/80">
                Whether you're preparing for IELTS, improving spoken
                English, learning French, or excelling in school classes
                from 1st to 12th, we have the right program for you.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button  onClick={()=>{router.push('/login')}} className="group flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 font-semibold text-[#D6451B] transition hover:scale-105">
                  Enroll Now

                  <FaArrowRight className="transition group-hover:translate-x-1" />
                </button>

                <button  onClick={()=>{router.push('/about')}} className="rounded-2xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10">
                  Book Free Demo Class
                </button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-3xl font-bold">
                    500+
                  </h3>

                  <p className="text-sm text-white/70">
                    Students
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">
                    20+
                  </h3>

                  <p className="text-sm text-white/70">
                    Expert Teachers
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">
                    95%
                  </h3>

                  <p className="text-sm text-white/70">
                    Success Rate
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="border-t border-white/10 p-8 lg:border-l lg:border-t-0 lg:p-16">

              <div className="grid gap-5 sm:grid-cols-2">

                {[
                  {
                    icon: <FaLanguage />,
                    title: "Spoken English",
                    desc:
                      "Improve confidence, fluency, grammar and communication skills.",
                  },
                  {
                    icon: <FaGraduationCap />,
                    title: "IELTS Preparation",
                    desc:
                      "Expert coaching with mock tests and speaking practice.",
                  },
                  {
                    icon: <FaBookReader />,
                    title: "French Language",
                    desc:
                      "Beginner to advanced French courses with certification guidance.",
                  },
                  {
                    icon: <FaSchool />,
                    title: "Classes 1st–12th",
                    desc:
                      "School tuition and academic support for all major subjects.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="
                      rounded-3xl
                      border border-white/10
                      bg-white/10
                      p-6
                      text-white
                      backdrop-blur-sm
                      transition
                      hover:bg-white/15
                    "
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                      {item.icon}
                    </div>

                    <h3 className="mt-5 text-lg font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Trust Card */}
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-6 text-white">
                <h3 className="text-xl font-bold">
                  Free Demo Available
                </h3>

                <p className="mt-2 text-white/70">
                  Experience our teaching methodology before enrolling.
                  Attend a free live session and interact with our expert
                  trainers.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}