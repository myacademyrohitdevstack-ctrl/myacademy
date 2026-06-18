"use client";

import { motion } from "framer-motion";

export default function OurStory() {
return ( <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
{/* Background Accent */} <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_60%)]" />


  <div className="relative max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <img
          src="/our-story.jpg"
          alt="Students learning languages"
          className="w-full h-[420px] sm:h-[520px] lg:h-[650px] object-cover rounded-3xl"
        />

        {/* Floating Stats Card */}
        <div className="absolute -bottom-6 right-6 bg-white rounded-3xl shadow-xl p-6 w-[220px]">
          <div className="text-4xl font-bold text-slate-900">
            12K+
          </div>

          <div className="mt-2 text-slate-500 text-sm">
            Students transformed through English and French fluency programs.
          </div>
        </div>
      </motion.div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-[10px] tracking-[0.35em] text-slate-400">
          OUR STORY
        </div>

        <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
          Built around
          <span className="block bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            confidence,
          </span>
          not memorization.
        </h2>

        <p className="mt-8 text-slate-600 text-lg leading-relaxed">
          Our journey started with a simple belief:
          language learning should feel practical,
          engaging, and confidence-building.
        </p>

        <p className="mt-6 text-slate-600 leading-relaxed">
          What began as a small academy has grown into a
          global learning community helping students,
          professionals, and future immigrants achieve
          their academic and career goals through
          real-world communication skills.
        </p>

        <p className="mt-6 text-slate-600 leading-relaxed">
          Today, we continue to focus on immersive
          learning experiences that prepare learners
          for conversations, exams, workplaces,
          and opportunities around the world.
        </p>

        {/* STATS */}
        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-slate-200 pt-8">
          <div>
            <div className="text-3xl font-bold text-slate-900">
              25+
            </div>
            <div className="mt-2 text-sm text-slate-500">
              Countries Reached
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold text-slate-900">
              98%
            </div>
            <div className="mt-2 text-sm text-slate-500">
              Success Rate
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold text-slate-900">
              10+
            </div>
            <div className="mt-2 text-sm text-slate-500">
              Years Experience
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold text-slate-900">
              50K+
            </div>
            <div className="mt-2 text-sm text-slate-500">
              Speaking Sessions
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>


);
}
