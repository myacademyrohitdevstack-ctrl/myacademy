"use client";

import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

const goals = [
{
title: "English Language",
subtitle:
"Spoken English • IELTS • Communication Skills • Interview Preparation",
image:
"/courses/english1.avif",
 slug: "english-speaking-mastery",
},
{
title: "French Language",
subtitle:
"DELF • TEF • Immigration Pathways • Study Abroad Preparation",
image:
"/courses/french1.avif",
  slug: "french-language-program",
},
{
title: "School Classes",
subtitle:
"Classes 1-12 • Academic Excellence • Subject Support • Exam Preparation",
image:
"/courses/academic1.avif",
  slug: "academic-excellence-program",
},
];

export default function Hero() {
  const router=useRouter()
return ( <section className="relative overflow-hidden bg-white pb-20 pt-28">
{/* Background */} <div className="absolute inset-0 bg-gradient-to-b from-orange-50/60 to-white" />

  <div className="relative mx-auto max-w-7xl px-6">
    {/* Hero Content */}

    <div className="mx-auto max-w-5xl text-center">
      <div
        className="
          inline-flex items-center
          rounded-full
          border border-orange-200
          bg-orange-50
          px-5 py-2
          text-xs font-semibold
          uppercase tracking-[0.25em]
          text-[#D6451B]
        "
      >
        English • French • School Education
      </div>

      <h1
        className="
          mt-8
          text-5xl
          font-bold
          leading-[0.95]
          text-slate-900
          md:text-7xl
        "
      >
        Learn Languages.
        <br />

        <span
          className="
            bg-gradient-to-r
            from-[#D6451B]
            to-orange-500
            bg-clip-text
            text-transparent
          "
        >
          Build Your Future.
        </span>
      </h1>

      <p
        className="
          mx-auto
          mt-6
          max-w-3xl
          text-lg
          leading-relaxed
          text-slate-600
        "
      >
        Join our expert-led English Language, French Language,
        and School Education programs designed to help students
        improve communication skills, achieve academic success,
        and unlock global opportunities.
      </p>

      <div
        className="
          mt-10
          flex
          flex-col
          justify-center
          gap-4
          sm:flex-row
        "
      >
        <button
        onClick={()=>{router.push('/find-tutor')}}
          className="
            rounded-2xl
            bg-[#D6451B]
            px-8 py-4
            font-semibold
            text-white
            shadow-lg
            transition
            hover:bg-[#bf3b14]
          "
        >
          Enroll Now 
        </button>

        <button
         onClick={()=>{router.push('/about')}}
          className="
            rounded-2xl
            border border-slate-300
            bg-white
            px-8 py-4
            font-semibold
            text-slate-700
            transition
            hover:bg-slate-50
          "
        >
          Book Free Demo
        </button>
      </div>
    </div>

    {/* Categories */}

    <div className="mt-20 grid gap-6 lg:grid-cols-3">
      {goals.map((goal) => (
        <div
          key={goal.title}
          className="
            group
            relative
            h-[320px]
            cursor-pointer
            overflow-hidden
            rounded-[32px]
            shadow-xl
          "
        >
          <img
            src={goal.image}
            alt={goal.title}
            className="
              absolute
              inset-0
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
              absolute inset-0
              bg-gradient-to-t
              from-black
              via-black/50
              to-black/10
            "
          />

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              p-8
              text-white
            "
          >
            <h3 className="text-3xl font-bold">
              {goal.title}
            </h3>

            <p className="mt-3 text-white/80">
              {goal.subtitle}
            </p>

            <button
            onClick={()=>{router.push(`/course/${goal.slug}`)}}
              className="
                mt-6
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-orange-300
                opacity-0
                transition
                duration-300
                group-hover:opacity-100
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
