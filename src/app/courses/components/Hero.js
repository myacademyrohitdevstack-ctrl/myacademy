"use client";

import { FaArrowRight } from "react-icons/fa";

const goals = [
  {
    title: "Study Abroad",
    subtitle: "Universities • Admissions • IELTS",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Career Growth",
    subtitle: "Business English • Interviews • Communication",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "English Fluency",
    subtitle: "Daily Speaking • Confidence • Real Conversations",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "French Language",
    subtitle: "DELF • DALF • Immigration Pathways",
    image:
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Hero() {
  return (
    <section className="relative bg-white pt-28 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-xs tracking-[0.35em] text-slate-400 uppercase">
            Find Your Learning Path
          </div>

          <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-[0.95] text-slate-900">
            Where do you want
            <span className="block bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              language skills
            </span>
            to take you?
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Choose your goal and discover the learning pathway designed
            specifically for your future.
          </p>
        </div>

        {/* Goal Grid */}
        <div className="mt-16 grid lg:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <div
              key={goal.title}
              className="group relative overflow-hidden rounded-3xl h-[340px] cursor-pointer"
            >
              {/* Image */}
              <img
                src={goal.image}
                alt={goal.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">

                <div className="overflow-hidden">
                  <h3 className="text-3xl font-bold translate-y-0 group-hover:-translate-y-1 transition duration-300">
                    {goal.title}
                  </h3>
                </div>

                <p className="mt-2 text-white/80">
                  {goal.subtitle}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
                  Explore Pathway
                  <FaArrowRight />
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Strip */}
        <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">

            <div>
              <div className="text-3xl font-bold text-slate-900">
                12K+
              </div>
              <div className="text-sm text-slate-500 mt-1">
                Students
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold text-slate-900">
                25+
              </div>
              <div className="text-sm text-slate-500 mt-1">
                Countries
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold text-slate-900">
                98%
              </div>
              <div className="text-sm text-slate-500 mt-1">
                Success Rate
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold text-slate-900">
                4
              </div>
              <div className="text-sm text-slate-500 mt-1">
                Learning Paths
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}