"use client";

import {
FaLanguage,
FaGraduationCap,
FaSchool,
FaChalkboardTeacher,
FaUsers,
FaAward,
} from "react-icons/fa";

export default function AboutAcademy() {
const features = [
{
icon: <FaLanguage />,
title: "English & French Training",
description:
"Practical language learning focused on speaking confidence, communication skills, and real-world usage.",
},
{
icon: <FaGraduationCap />,
title: "IELTS Preparation",
description:
"Structured coaching with mock tests, speaking practice, and personalized guidance to achieve your target band score.",
},
{
icon: <FaSchool />,
title: "Classes 1st to 12th",
description:
"Academic support for school students with experienced teachers and concept-based learning.",
},
{
icon: <FaChalkboardTeacher />,
title: "Live Interactive Classes",
description:
"Learn directly from expert teachers through engaging live sessions and doubt-solving support.",
},
];

return ( <section className="bg-white py-24"> <div className="mx-auto max-w-7xl px-6"> <div className="grid items-center gap-14 lg:grid-cols-2">
{/* Left Content */}


      <div>
        <span
          className="
            inline-flex items-center
            rounded-full
            bg-orange-100
            px-4 py-2
            text-sm font-semibold
            text-[#D6451B]
          "
        >
          About Our Academy
        </span>

        <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
          Building Confidence,
          <span className="block text-[#D6451B]">
            Knowledge & Success
          </span>
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-slate-600">
          We are dedicated to helping students improve their
          communication skills, achieve academic excellence,
          and prepare for future opportunities through quality
          education and expert guidance.
        </p>

        <p className="mt-4 leading-relaxed text-slate-600">
          Whether you're learning Spoken English, preparing
          for IELTS, studying French, or looking for academic
          support from Class 1st to 12th, our programs are
          designed to deliver measurable results.
        </p>

        {/* Stats */}

        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 p-5">
            <FaUsers className="text-2xl text-[#D6451B]" />

            <h3 className="mt-3 text-3xl font-bold">
              500+
            </h3>

            <p className="text-sm text-slate-500">
              Students Trained
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 p-5">
            <FaChalkboardTeacher className="text-2xl text-[#D6451B]" />

            <h3 className="mt-3 text-3xl font-bold">
              20+
            </h3>

            <p className="text-sm text-slate-500">
              Expert Teachers
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 p-5 col-span-2 md:col-span-1">
            <FaAward className="text-2xl text-[#D6451B]" />

            <h3 className="mt-3 text-3xl font-bold">
              95%
            </h3>

            <p className="text-sm text-slate-500">
              Success Rate
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="grid gap-5 sm:grid-cols-2">
        {features.map((item) => (
          <div
            key={item.title}
            className="
              rounded-[28px]
              border border-slate-200
              bg-white
              p-6
              transition
              hover:-translate-y-1
              hover:border-[#D6451B]
              hover:shadow-lg
            "
          >
            <div
              className="
                flex h-14 w-14
                items-center justify-center
                rounded-2xl
                bg-orange-50
                text-2xl
                text-[#D6451B]
              "
            >
              {item.icon}
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


);
}
