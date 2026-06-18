"use client";

import {
  FaVideo,
  FaMicrophone,
  FaChartLine,
  FaUsers,
  FaCertificate,
} from "react-icons/fa";

const journey = [
  {
    step: "01",
    title: "Attend Live Interactive Class",
    icon: <FaVideo />,
    desc: "Join expert-led live sessions designed around real communication situations.",
  },
  {
    step: "02",
    title: "Practice Speaking",
    icon: <FaMicrophone />,
    desc: "Participate in guided speaking activities and conversation exercises.",
  },
  {
    step: "03",
    title: "Receive Personal Feedback",
    icon: <FaChartLine />,
    desc: "Get corrections on pronunciation, grammar, and fluency in real time.",
  },
  {
    step: "04",
    title: "Connect With Community",
    icon: <FaUsers />,
    desc: "Practice with learners from different countries and cultures.",
  },
  {
    step: "05",
    title: "Track Progress & Earn Certificates",
    icon: <FaCertificate />,
    desc: "Monitor improvement and unlock certificates as you advance.",
  },
];

export default function LearningExperience() {
  return (
    <section className="relative py-28 bg-slate-50 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">

          <p className="text-xs tracking-[0.35em] text-slate-400">
            HOW LEARNING WORKS
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-slate-900">
            Your learning experience
          </h2>

          <p className="mt-5 text-slate-600">
            Every lesson follows a structured process that transforms
            knowledge into real-world communication skills.
          </p>

        </div>

        {/* Journey */}
        <div className="relative">

          {/* Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />

          <div className="space-y-12">

            {journey.map((item) => (
              <div
                key={item.step}
                className="relative flex flex-col md:flex-row gap-6 md:gap-10 items-start"
              >

                {/* Step */}
                <div className="relative z-10 flex-shrink-0">

                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 text-xl shadow-sm">
                    {item.icon}
                  </div>

                </div>

                {/* Content */}
                <div className="flex-1 pb-10">

                  <div className="text-xs tracking-[0.3em] text-blue-600">
                    STEP {item.step}
                  </div>

                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-slate-600 max-w-xl">
                    {item.desc}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Bottom Stats */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            ["95%", "Speaking Confidence"],
            ["12K+", "Active Students"],
            ["25+", "Countries"],
            ["4.9/5", "Student Rating"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-slate-200 p-6 text-center"
            >
              <div className="text-3xl font-bold text-slate-900">
                {value}
              </div>

              <div className="mt-2 text-sm text-slate-500">
                {label}
              </div>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}