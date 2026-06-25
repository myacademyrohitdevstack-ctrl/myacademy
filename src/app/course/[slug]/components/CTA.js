"use client";

import { useRouter } from "next/navigation";
import {
  FaArrowRight,
  FaPhoneAlt,
  FaGraduationCap,
  FaClock,
  FaCertificate,
} from "react-icons/fa";

export default function CourseCTA({
  course,
}) {
  const router=useRouter()
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div
          className="
            overflow-hidden
            rounded-[40px]
            bg-gradient-to-br
            from-[#D6451B]
            to-orange-500
            text-white
          "
        >
          <div className="grid lg:grid-cols-2">

            {/* Left */}

            <div className="p-8 md:p-12 lg:p-16">

              <span
                className="
                  inline-flex
                  rounded-full
                  bg-white/15
                  px-4 py-2
                  text-sm
                  font-medium
                "
              >
                Limited Seats Available
              </span>

              <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
                Ready to start your
                <span className="block">
                  {course?.title}?
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-white/80 text-lg">
                Join live interactive classes,
                practice sessions, assignments,
                and expert guidance designed to
                help you achieve fluency faster.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">

                <button
                 onClick={()=>{router.push('/find-tutor')}}
                  className="
                    flex items-center justify-center gap-3
                    rounded-2xl
                    bg-white
                    px-7 py-4
                    font-semibold
                    text-[#D6451B]
                    transition
                    hover:scale-105
                  "
                >
                  Enroll Now
                  <FaArrowRight />
                </button>

                <button
                onClick={()=>{router.push('/about')}}
                  className="
                    flex items-center justify-center gap-3
                    rounded-2xl
                    border border-white/20
                    px-7 py-4
                    font-semibold
                    text-white
                    backdrop-blur-sm
                    transition
                    hover:bg-white/10
                  "
                >
                  <FaPhoneAlt />
                  Book Free Demo
                </button>

              </div>
            </div>

            {/* Right */}

            <div
              className="
                border-t lg:border-t-0
                lg:border-l
                border-white/10
                p-8 md:p-12 lg:p-16
              "
            >
              <div className="grid gap-5">

                <div
                  className="
                    flex items-center gap-4
                    rounded-3xl
                    bg-white/10
                    p-5
                  "
                >
                  <div
                    className="
                      flex h-14 w-14
                      items-center justify-center
                      rounded-2xl
                      bg-white/15
                    "
                  >
                    <FaGraduationCap />
                  </div>

                  <div>
                    <p className="text-sm text-white/70">
                      Course Level
                    </p>

                    <h3 className="font-semibold capitalize">
                      {course?.level}
                    </h3>
                  </div>
                </div>

                <div
                  className="
                    flex items-center gap-4
                    rounded-3xl
                    bg-white/10
                    p-5
                  "
                >
                  <div
                    className="
                      flex h-14 w-14
                      items-center justify-center
                      rounded-2xl
                      bg-white/15
                    "
                  >
                    <FaClock />
                  </div>

                  <div>
                    <p className="text-sm text-white/70">
                      Duration
                    </p>

                    <h3 className="font-semibold">
                      {course?.durationInMonths} Months
                    </h3>
                  </div>
                </div>

                <div
                  className="
                    flex items-center gap-4
                    rounded-3xl
                    bg-white/10
                    p-5
                  "
                >
                  <div
                    className="
                      flex h-14 w-14
                      items-center justify-center
                      rounded-2xl
                      bg-white/15
                    "
                  >
                    <FaCertificate />
                  </div>

                  <div>
                    <p className="text-sm text-white/70">
                      Certificate
                    </p>

                    <h3 className="font-semibold">
                      Course Completion Certificate
                    </h3>
                  </div>
                </div>

          

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}