"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaLanguage,
  FaSchool,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";

const features = [
  {
    icon: <FaLanguage />,
    title: "English Speaking",
    description: "Fluency, grammar & confidence",
  },
  {
    icon: <FaSchool />,
    title: "School Classes",
    description: "Classes 1st to 12th",
  },
  {
    icon: <FaUserGraduate />,
    title: "French Language",
    description: "Beginner to advanced level",
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Live Interactive Classes",
    description: "Learn directly from expert trainers",
  },
];

export default function CTA() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[32px] lg:rounded-[40px] bg-[#D6451B]">

          {/* Decorative Shapes */}
          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-white/10 blur-sm lg:h-80 lg:w-80" />
          <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-orange-400/20 lg:h-64 lg:w-64" />

          <div className="relative grid gap-12 p-6 sm:p-8 lg:grid-cols-2 lg:gap-16 lg:p-16">

            {/* Left Content */}
            <div className="flex flex-col justify-center text-center lg:text-left">

              <span className="mx-auto lg:mx-0 inline-flex w-fit rounded-full bg-white/15 px-4 py-2 text-xs sm:text-sm font-medium text-white backdrop-blur">
                Admissions Open 2026
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Start Speaking
                <span className="block text-orange-100">
                  With Confidence
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-lg lg:mx-0">
                Join expert-led English Speaking, French Language and School
                Tuition classes designed to help students achieve academic
                excellence, communication skills, and career success.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 font-semibold text-[#D6451B] transition-all duration-300 hover:scale-[1.03]"
                >
                  Book Free Demo
                  <FaArrowRight />
                </Link>

                <Link
                  href="/courses"
                  className="w-full sm:w-auto rounded-2xl border border-white/30 px-7 py-4 text-center font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  View Courses
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-8">

                <div>
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    500+
                  </h3>
                  <p className="mt-1 text-xs text-white/70 sm:text-sm">
                    Students
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    50+
                  </h3>
                  <p className="mt-1 text-xs text-white/70 sm:text-sm">
                    Batches
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    98%
                  </h3>
                  <p className="mt-1 text-xs text-white/70 sm:text-sm">
                    Satisfaction
                  </p>
                </div>

              </div>
            </div>

            {/* Right Cards */}
            <div className="flex items-center">
              <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-5">

                {features.map((item, index) => (
                  <div
                    key={index}
                    className="
                      rounded-2xl lg:rounded-3xl
                      bg-white p-4 lg:p-6
                      shadow-xl
                      transition-all duration-300
                      hover:-translate-y-1
                      lg:even:ml-10
                    "
                  >
                    <div className="flex flex-col items-center gap-3 text-center lg:flex-row lg:items-start lg:text-left">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#D6451B] lg:h-14 lg:w-14 lg:rounded-2xl">
                        {item.icon}
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-900 lg:text-base">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500 lg:text-sm">
                          {item.description}
                        </p>
                      </div>

                    </div>
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