"use client";

import { FaArrowRight } from "react-icons/fa";

const categories = [
{
title: "English Language",
courses: "10+ Courses",
image: "/categories/english.jpg",
description:
"Spoken English, IELTS preparation, grammar, vocabulary, communication skills, and interview training.",
},
{
title: "French Language",
courses: "6+ Courses",
image: "/categories/french.jpg",
description:
"Learn French from beginner to advanced levels with DELF, TEF, and immigration-focused preparation.",
},
{
title: "School Classes (1–12)",
courses: "All Subjects",
image: "/categories/classes.jpg",
description:
"Expert coaching for students from Class 1 to 12 with personalized attention and exam preparation.",
},
];

export default function CourseCategories() {
return ( <section className="bg-slate-50 py-24"> <div className="mx-auto max-w-7xl px-6">

    {/* Header */}

    <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

      <div>

        <span
          className="
            rounded-full
            border border-orange-200
            bg-orange-50
            px-4 py-2
            text-xs font-semibold
            uppercase tracking-[0.25em]
            text-[#D6451B]
          "
        >
          Programs
        </span>

        <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">

          Explore Our

          <span
            className="
              block
              bg-gradient-to-r
              from-[#D6451B]
              to-orange-500
              bg-clip-text
              text-transparent
            "
          >
            Learning Programs
          </span>

        </h2>

      </div>

      <p className="max-w-xl text-lg text-slate-600">
        Whether you want to improve your language skills,
        prepare for international opportunities, or excel in
        academics, we have a program designed for your success.
      </p>

    </div>

    {/* Cards */}

    <div className="grid gap-8 lg:grid-cols-3">

      {categories.map((category) => (

        <div
          key={category.title}
          className="
            group
            overflow-hidden
            rounded-[32px]
            bg-white
            shadow-lg
            transition
            duration-300
            hover:-translate-y-2
            hover:shadow-2xl
          "
        >

          {/* Image */}

          <div className="relative h-72 overflow-hidden">

            <img
              src={category.image}
              alt={category.title}
              className="
                h-full
                w-full
                object-cover
                transition
                duration-700
                group-hover:scale-110
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/70
                to-transparent
              "
            />

            <div className="absolute bottom-5 left-5">

              <span
                className="
                  rounded-full
                  bg-white
                  px-4 py-2
                  text-xs
                  font-semibold
                  text-[#D6451B]
                "
              >
                {category.courses}
              </span>

            </div>

          </div>

          {/* Content */}

          <div className="p-7">

            <h3 className="text-2xl font-bold text-slate-900">
              {category.title}
            </h3>

            <p className="mt-4 min-h-[96px] text-slate-600">
              {category.description}
            </p>

            <button
              className="
                mt-6
                flex
                items-center
                gap-2
                font-semibold
                text-[#D6451B]
                transition
                group-hover:gap-4
              "
            >
              Explore Program

              <FaArrowRight />
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>
</section>


);
}
