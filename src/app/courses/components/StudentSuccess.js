"use client";

import { useRouter } from "next/navigation";
import {
  FaStar,
  FaQuoteLeft,
  FaGraduationCap,
} from "react-icons/fa";

const students = [
  {
    name: "Priya Sharma",
    result: "IELTS 7.5",
    achievement: "Canada Study Visa",
    quote:
      "The speaking practice and mock tests helped me achieve my target band score and secure admission abroad.",
  },
  {
    name: "Arjun Verma",
    result: "English Fluency",
    achievement: "Confident Public Speaker",
    quote:
      "Earlier I was afraid to speak English. Now I confidently communicate during interviews and presentations.",
  },
  {
    name: "Simran Kaur",
    result: "92%",
    achievement: "Class 10 Excellence",
    quote:
      "The personalized guidance improved my academic performance and boosted my confidence in school.",
  },
];

export default function StudentSuccess() {
  const router=useRouter()
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span
            className="
              rounded-full
              bg-[#D6451B]/10
              px-4 py-2
              text-xs
              font-semibold
              tracking-[0.3em]
              text-[#D6451B]
              uppercase
            "
          >
            Student Success Stories
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Real Results.
            <span className="block text-[#D6451B]">
              Real Transformations.
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Thousands of students have improved their English,
            cracked IELTS exams, mastered French, and achieved
            academic success through our programs.
          </p>

        </div>

        {/* Testimonials */}

        <div className="grid gap-6 lg:grid-cols-3">

          {students.map((student) => (
            <div
              key={student.name}
              className="
                group
                rounded-[32px]
                border border-slate-200
                bg-white
                p-8
                shadow-sm
                transition-all
                hover:-translate-y-2
                hover:border-[#D6451B]
                hover:shadow-xl
              "
            >
              {/* Badge */}

              <div className="flex items-center justify-between">

                <span
                  className="
                    rounded-full
                    bg-[#D6451B]/10
                    px-4 py-2
                    text-sm
                    font-semibold
                    text-[#D6451B]
                  "
                >
                  {student.result}
                </span>

                <FaQuoteLeft className="text-2xl text-[#D6451B]/20" />

              </div>

              {/* Content */}

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {student.achievement}
              </h3>

              <p className="mt-4 leading-relaxed text-slate-600">
                "{student.quote}"
              </p>

              {/* Rating */}

              <div className="mt-6 flex gap-1 text-[#D6451B]">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Footer */}

              <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">

                <div
                  className="
                    flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    bg-[#D6451B]
                    text-lg
                    font-bold
                    text-white
                  "
                >
                  {student.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">
                    {student.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    Student
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Stats */}

        <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {[
            ["5000+", "Students Trained"],
            ["95%", "Success Rate"],
            ["100+", "Live Batches"],
            ["4.9★", "Average Rating"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="
                rounded-3xl
                border border-slate-200
                bg-slate-50
                p-6
                text-center
                transition
                hover:border-[#D6451B]
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