"use client";

import {
  FaBookOpen,
  FaComments,
  FaBriefcase,
  FaGraduationCap,
  FaGlobe,
  FaArrowDown,
} from "react-icons/fa";

const roadmap = [
  {
    title: "Beginner Foundation",
    level: "A1 - A2",
    icon: <FaBookOpen />,
    description:
      "Build grammar, vocabulary, pronunciation, and everyday communication.",
  },
  {
    title: "Intermediate Communication",
    level: "B1 - B2",
    icon: <FaComments />,
    description:
      "Develop speaking confidence and natural conversation skills.",
  },
  {
    title: "Academic & IELTS",
    level: "Study Abroad",
    icon: <FaGraduationCap />,
    description:
      "Prepare for university admissions, IELTS, and academic success.",
  },
  {
    title: "Business English",
    level: "Professional",
    icon: <FaBriefcase />,
    description:
      "Master workplace communication, presentations, and interviews.",
  },
  {
    title: "Advanced Fluency",
    level: "C1",
    icon: <FaGlobe />,
    description:
      "Speak naturally, confidently, and professionally in global environments.",
  },
];

export default function LearningRoadmap() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs tracking-[0.35em] uppercase text-slate-400">
            Learning Journey
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
            Your Roadmap to
            <span className="block bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Global Fluency
            </span>
          </h2>

          <p className="mt-5 text-slate-600">
            Every learner follows a structured pathway designed to build
            confidence step by step.
          </p>
        </div>

        {/* Desktop Journey */}
        <div className="hidden lg:block relative">

          {/* Main Line */}
          <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-slate-200" />

          <div className="grid grid-cols-5 gap-8 relative">

            {roadmap.map((item, index) => (
              <div
                key={item.title}
                className={`relative ${
                  index % 2 === 0 ? "mt-0" : "mt-32"
                }`}
              >
                <div className="bg-white relative z-10">

                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white flex items-center justify-center text-2xl shadow-lg">
                    {item.icon}
                  </div>

                  <div className="mt-6 text-center">
                    <div className="text-xs text-blue-600 font-medium">
                      {item.level}
                    </div>

                    <h3 className="mt-2 font-bold text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Mobile Journey */}
        <div className="lg:hidden max-w-md mx-auto">

          {roadmap.map((item, index) => (
            <div key={item.title}>

              <div className="flex gap-5">

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white flex items-center justify-center">
                    {item.icon}
                  </div>

                  {index !== roadmap.length - 1 && (
                    <div className="w-px h-20 bg-slate-200 mt-3" />
                  )}
                </div>

                <div className="pb-10">
                  <div className="text-xs text-blue-600 font-medium">
                    {item.level}
                  </div>

                  <h3 className="mt-1 font-bold text-lg">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    {item.description}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* Final Goal */}
        <div className="mt-24 text-center">

          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-900 text-white text-3xl">
            🌍
          </div>

          <h3 className="mt-6 text-3xl font-bold">
            Become a Global Communicator
          </h3>

          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Whether your goal is career growth, higher education, immigration,
            or personal development, every pathway leads to real fluency.
          </p>

        </div>

      </div>
    </section>
  );
}