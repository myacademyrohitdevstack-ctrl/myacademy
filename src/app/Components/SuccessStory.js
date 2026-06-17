"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const stories = [
  {
    name: "Anjali Sharma",
    country: "India",
    result: "B1 → C1 in 6 Months",
    text: "I could barely speak English before joining. Now I confidently give presentations at work.",
    img: "/students/anjali.jpg",
  },
  {
    name: "Rahul Mehta",
    country: "India",
    result: "IELTS 7.5 Score",
    text: "Structured speaking practice helped me achieve my dream IELTS score.",
    img: "/students/rahul.jpg",
  },
  {
    name: "Sofia Martin",
    country: "France",
    result: "Fluent Conversation Level",
    text: "Live classes made me confident speaking with people worldwide.",
    img: "/students/sofia.jpg",
  },
];

export default function SuccessStories() {
  return (
    <section className="relative bg-white text-slate-900 py-28 overflow-hidden">

      {/* soft cinematic glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.06),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            REAL TRANSFORMATIONS
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
            Stories of{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              real change
            </span>
          </h2>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
            These are not testimonials. These are transformations of real people
            who learned to speak confidently in real life.
          </p>
        </div>

        {/* STORY LAYOUT (NOT GRID CARDS) */}
     <div className="grid lg:grid-cols-3 gap-6">

  {/* BIG STORY */}
  <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl h-[500px]">

    <img
      src="/students/anjali.jpg"
      className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
    />

    {/* cinematic overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

    <div className="absolute bottom-6 left-6 text-white space-y-2">
      <div className="text-xs tracking-[0.3em] text-white/60">
        B1 → C1 IN 6 MONTHS
      </div>

      <div className="text-2xl font-bold">
        Anjali Sharma
      </div>

      <p className="text-sm text-white/80 max-w-md">
        “I could barely speak English before. Now I give presentations at work confidently.”
      </p>
    </div>

    <div className="absolute top-4 left-4 bg-white/90 text-black text-xs px-3 py-1 rounded-full">
      TOP TRANSFORMATION
    </div>
  </div>

  {/* SIDE STORIES */}
  <div className="space-y-6">

    {[
      {
        name: "Rahul Mehta",
        img: "/students/rahul.jpg",
        result: "IELTS 7.5",
      },
      {
        name: "Sofia Martin",
        img: "/students/sofia.jpg",
        result: "Fluent Speaker",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="relative group overflow-hidden rounded-2xl h-[240px]"
      >

        <img
          src={item.img}
          className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-sm font-semibold">{item.name}</div>
          <div className="text-xs text-white/70">{item.result}</div>
        </div>

      </div>
    ))}

  </div>

</div>

        {/* CTA */}
        <div className="mt-28 text-center">
          <h3 className="text-2xl font-semibold">
            Your transformation starts here
          </h3>

          <p className="mt-3 text-slate-600">
            Join learners who turned hesitation into confidence.
          </p>

          <button className="mt-6 rounded-full bg-slate-900 px-8 py-3 text-white hover:scale-105 transition">
            Start Your Journey
          </button>
        </div>

      </div>
    </section>
  );
}