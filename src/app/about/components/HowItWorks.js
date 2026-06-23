"use client";

import {
FaUserPlus,
FaVideo,
FaUsers,
FaTrophy,
} from "react-icons/fa";

const steps = [
{
number: "01",
title: "Register For Free Demo",
icon: <FaUserPlus />,
description:
"Fill out the demo registration form and our team will contact you to schedule your free class.",
},
{
number: "02",
title: "Attend Live Demo Class",
icon: <FaVideo />,
description:
"Experience our teaching style, interact with trainers, and understand the learning process before joining.",
},
{
number: "03",
title: "Join Your Batch",
icon: <FaUsers />,
description:
"Choose the right course and get added to a batch that matches your level and learning goals.",
},
{
number: "04",
title: "Learn & Achieve Results",
icon: <FaTrophy />,
description:
"Attend classes, complete assignments, receive feedback, and achieve your academic or language goals.",
},
];

export default function HowItWorks() {
return ( <section className="bg-white py-24"> <div className="mx-auto max-w-7xl px-6">


    {/* Header */}

    <div className="mx-auto max-w-3xl text-center">
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
        How It Works
      </span>

      <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
        Start Learning In
        <span className="block text-[#D6451B]">
          4 Simple Steps
        </span>
      </h2>

      <p className="mt-5 text-lg text-slate-600">
        Getting started is easy. From your first demo class to
        achieving your goals, we guide you every step of the way.
      </p>
    </div>

    {/* Steps */}

    <div className="relative mt-20">

      {/* Desktop Line */}

      <div
        className="
          absolute left-0 right-0 top-16
          hidden h-1 bg-orange-100
          lg:block
        "
      />

      <div className="grid gap-8 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="
              relative
              rounded-[32px]
              border border-slate-200
              bg-white
              p-8
              text-center
              transition
              hover:-translate-y-2
              hover:border-[#D6451B]
              hover:shadow-xl
            "
          >
            {/* Step Number */}

            <div
              className="
                absolute right-5 top-5
                text-5xl font-black
                text-slate-100
              "
            >
              {step.number}
            </div>

            {/* Icon */}

            <div
              className="
                relative z-10
                mx-auto flex h-20 w-20
                items-center justify-center
                rounded-3xl
                bg-orange-50
                text-3xl
                text-[#D6451B]
              "
            >
              {step.icon}
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              {step.title}
            </h3>

            <p className="mt-4 text-slate-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>




  </div>
</section>


);
}
