"use client";

import { FaArrowRight } from "react-icons/fa";

const categories = [
  {
    title: "English Fluency",
    courses: "6 Courses",
    image: "/categories/english.jpg",
    description:
      "Build confidence through speaking, listening, grammar, and real-world communication.",
  },
  {
    title: "IELTS Preparation",
    courses: "3 Courses",
    image: "/categories/ielts.jpg",
    description:
      "Achieve your target band score with expert guidance and mock tests.",
  },
  {
    title: "French Language",
    courses: "4 Courses",
    image: "/categories/french.jpg",
    description:
      "From beginner to DELF/DALF preparation with immersive learning.",
  },
  {
    title: "Business Communication",
    courses: "2 Courses",
    image: "/categories/business.jpg",
    description:
      "Master meetings, presentations, interviews, and workplace fluency.",
  },
];

export default function CourseCategories() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">

          <div>
            <p className="text-xs tracking-[0.35em] text-slate-400 uppercase">
              Course Categories
            </p>

            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">
              Choose your
              <span className="block text-transparent bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text">
                learning direction
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-slate-600">
            Explore specialized programs designed for fluency, study abroad,
            professional growth, and international communication.
          </p>

        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 gap-6">

          {categories.map((category) => (
            <div
              key={category.title}
              className="group relative overflow-hidden rounded-3xl h-[420px]"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

              {/* Content */}
              <div className="absolute bottom-0 p-8 text-white">

                <div className="inline-flex rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-xs">
                  {category.courses}
                </div>

                <h3 className="mt-5 text-3xl font-bold">
                  {category.title}
                </h3>

                <p className="mt-3 text-white/80 max-w-md">
                  {category.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium">
                  Explore Category
                  <FaArrowRight />
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}