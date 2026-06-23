"use client";

import { FaQuoteLeft } from "react-icons/fa";

export default function StudentResult() {
   const results= [
  {
    name: "Aman Sharma",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43d",
    achievement: "Improved Spoken English Confidence",
    result: "Beginner → Fluent Speaker",
    quote:
      "I was afraid of speaking English in class. After completing this course, I confidently participate in discussions and presentations.",
  },
  {
    name: "Priya Verma",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    achievement: "Scored IELTS 7.5",
    result: "Band 5.5 → Band 7.5",
    quote:
      "The speaking and writing modules helped me achieve my target score for studying abroad.",
  },
  {
    name: "Rahul Singh",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    achievement: "Improved Academic Performance",
    result: "More Confidence in School",
    quote:
      "My grammar and vocabulary improved significantly. I now communicate much better in English.",
  },
];
  if (!results?.length) return null;

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 max-w-3xl">
          <span
            className="
              inline-flex items-center
              rounded-full
              bg-orange-100
              px-4 py-2
              text-sm font-medium
              text-[#D6451B]
            "
          >
            Student Success Stories
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Real Results From Real Students
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            See how students transformed
            their communication skills,
            confidence, and academic
            performance through this course.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {results.map((student, index) => (
            <div
              key={index}
              className="
                flex h-full flex-col
                rounded-3xl
                border border-slate-200
                bg-white
                p-6
                shadow-sm
              "
            >
              <div className="flex items-center gap-4">

                <img
                  src={student.image}
                  alt={student.name}
                  className="
                    h-16 w-16
                    rounded-2xl
                    object-cover
                  "
                />

                <div>
                  <h3 className="font-bold text-slate-900">
                    {student.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {student.achievement}
                  </p>
                </div>

              </div>

              <div
                className="
                  mt-5 w-fit
                  rounded-full
                  bg-orange-50
                  px-4 py-2
                  text-sm font-semibold
                  text-[#D6451B]
                "
              >
                {student.result}
              </div>

              <div className="mt-5 flex-1">
                <FaQuoteLeft className="mb-4 text-2xl text-[#D6451B]" />

                <p className="leading-relaxed text-slate-600">
                  {student.quote}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}