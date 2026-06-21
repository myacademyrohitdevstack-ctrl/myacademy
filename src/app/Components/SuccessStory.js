"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import Link from "next/link";
const stories = [
  {
    name: "Anjali Sharma",
    result: "B1 → C1 in 6 Months",
    video: "/students/anjali.mp4",
    thumbnail: "/students/anjali.jpg",
  },
  {
    name: "Rahul Mehta",
    result: "IELTS 7.5 Score",
    video: "/students/rahul.mp4",
    thumbnail: "/students/rahul.jpg",
  },
  {
    name: "Sofia Martin",
    result: "Fluent Conversation Level",
    video: "/students/anjali.mp4",
    thumbnail: "/students/anjali.jpg",
  },
];

export default function SuccessStories() {
    const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

const [activeVideo, setActiveVideo] = useState(null);
  return (
    <section className="relative overflow-hidden bg-white  text-slate-900">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(214,69,27,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            REAL TRANSFORMATIONS
          </div>

          <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Stories of{" "}
            <span className="bg-gradient-to-r from-[#D6451B] to-[#7BC3D7] bg-clip-text text-transparent">
              real change
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#D6451B] to-[#7BC3D7]" />

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            These are not testimonials. These are transformations of real people
            who learned to speak confidently in real life.
          </p>
        </div>
<div className="mb-20 grid grid-cols-3 gap-6" >
  <div className="rounded-2xl border border-slate-200 p-5 text-center" ref={ref}>
    <div className="text-2xl font-bold">
    {isInView && <CountUp end={12} duration={2} delay={1}></CountUp>}
      K+
      </div>
    <div className="text-sm text-slate-500">Students</div>
  </div>

  <div className="rounded-2xl border border-slate-200 p-5 text-center">
    <div className="text-2xl font-bold">
       {isInView && <CountUp end={98} duration={2} delay={1} ></CountUp>}
      %</div>
    <div className="text-sm text-slate-500">Success Rate</div>
  </div>

  <div className="rounded-2xl border border-slate-200 p-5 text-center">
    <div className="text-2xl font-bold">
       {isInView && <CountUp end={25} duration={2} delay={1} ></CountUp>}
      +</div>
    <div className="text-sm text-slate-500">Countries</div>
  </div>
</div>
        {/* Stories */}
   
<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  {stories.map((story, i) => (
    <motion.div
      key={story.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="group mx-auto w-full max-w-[340px]"
    >
      <div
        onClick={() => setActiveVideo(story)}
        className="relative cursor-pointer overflow-hidden rounded-[32px] border border-slate-200 bg-black shadow-xl"
      >
        {/* Thumbnail */}
        <img
          src={story.thumbnail}
          alt={story.name}
          className="aspect-[9/16] w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              fill="white"
              className="ml-1 h-8 w-8"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs text-white backdrop-blur">
            Student Success
          </div>

          <h4 className="mt-4 text-xl font-bold text-white">
            {story.name}
          </h4>

          <p className="mt-1 text-sm text-[#7BC3D7]">
            {story.result}
          </p>
        </div>
      </div>
    </motion.div>
  ))}
</div>
        {/* CTA */}
        <div className="mt-28 text-center">
          <h3 className="text-2xl font-semibold">
            Your transformation starts here
          </h3>

          <p className="mt-3 text-slate-600">
            Join learners who turned hesitation into confidence.
          </p>

          <button className="mt-6 rounded-full bg-[#D6451B] px-8 py-3 text-white transition hover:opacity-90">
            <Link href='/courses'>  Start Your Journey</Link>
          
          </button>
        </div>
      </div>
      {activeVideo && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
    onClick={() => setActiveVideo(null)}
  >
    <div
      className="relative w-full max-w-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setActiveVideo(null)}
        className="absolute -top-12 right-0 text-3xl text-white"
      >
        ×
      </button>

      <video
        controls
        autoPlay
        playsInline
        className="w-full rounded-3xl"
      >
        <source src={activeVideo.video} type="video/mp4" />
      </video>
    </div>
  </div>
)}
    </section>
  );
}