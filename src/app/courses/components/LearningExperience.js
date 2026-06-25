"use client";

import { useRouter } from "next/navigation";
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
    title: "Join Live Classes",
    icon: <FaVideo />,
    desc: "Attend interactive online classes for English, French, IELTS, PTE, and school subjects with experienced instructors.",
  },
  {
    step: "02",
    title: "Practice & Participate",
    icon: <FaMicrophone />,
    desc: "Engage in speaking sessions, quizzes, assignments, and classroom discussions to strengthen learning.",
  },
  {
    step: "03",
    title: "Get Expert Feedback",
    icon: <FaChartLine />,
    desc: "Receive personalized feedback on pronunciation, grammar, communication skills, and academic performance.",
  },
  {
    step: "04",
    title: "Learn With Community",
    icon: <FaUsers />,
    desc: "Collaborate with fellow students, participate in group activities, and improve confidence together.",
  },
  {
    step: "05",
    title: "Achieve Your Goals",
    icon: <FaCertificate />,
    desc: "Earn certificates, improve grades, crack language exams, and unlock better opportunities.",
  },
];

export default function LearningExperience() {
  const router=useRouter()
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 md:py-28">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#D6451B]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-[#D6451B]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#D6451B]">
            How Learning Works
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            A Simple Path To
            <span className="block text-[#D6451B]">
              Learning Success
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Whether you're preparing for IELTS, learning French,
            improving English fluency, or excelling in school studies,
            our structured learning process ensures measurable progress.
          </p>
        </div>

        {/* Timeline */}

        <div className="relative mx-auto max-w-5xl">
          {/* Vertical Line */}

          <div className="absolute left-7 top-0 hidden h-full w-1 rounded-full bg-orange-100 md:block" />

          <div className="space-y-8 md:space-y-10">
            {journey.map((item) => (
              <div
                key={item.step}
                className="
                  group relative
                  rounded-3xl
                  border border-slate-200
                  bg-white
                  p-6 md:p-8
                  shadow-sm
                  transition-all
                  hover:-translate-y-1
                  hover:border-[#D6451B]
                  hover:shadow-xl
                "
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start">
                  {/* Icon */}

                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className="
                        flex h-16 w-16 items-center justify-center
                        rounded-2xl
                        bg-[#D6451B]
                        text-xl text-white
                        shadow-lg
                      "
                    >
                      {item.icon}
                    </div>
                  </div>

                  {/* Content */}

                  <div className="flex-1">
                    <div className="text-sm font-bold tracking-[0.25em] text-[#D6451B]">
                      STEP {item.step}
                    </div>

                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}

        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["5000+", "Students Trained"],
            ["95%", "Success Rate"],
            ["100+", "Live Batches"],
            ["4.9/5", "Student Rating"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="
                rounded-3xl
                border border-slate-200
                bg-white
                p-6
                text-center
                shadow-sm
                transition
                hover:border-[#D6451B]
                hover:shadow-lg
              "
            >
              <div className="text-3xl font-bold text-[#D6451B]">
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