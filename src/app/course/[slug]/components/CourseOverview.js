"use client";

import {
  FaBookOpen,
  FaUsers,
  FaCheckCircle,
  FaTag,
} from "react-icons/fa";

export default function CourseOverview({ course }) {
  return (
    <section className="bg-[#FFF7F4] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Left */}
          <div>
            <span
              className="
                rounded-full
                bg-orange-100
                px-4 py-2
                text-sm font-medium
                text-[#D6451B]
              "
            >
              Course Overview
            </span>

            <h2 className="mt-5 text-4xl font-bold text-slate-900">
              About This Course
            </h2>

            <div
              className="
                mt-6 rounded-[32px]
                bg-white
                p-8
                shadow-sm
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex h-12 w-12
                    items-center justify-center
                    rounded-2xl
                    bg-orange-50
                    text-[#D6451B]
                  "
                >
                  <FaBookOpen />
                </div>

                <h3 className="text-xl font-bold">
                  Course Description
                </h3>
              </div>

              <p className="mt-6 whitespace-pre-line leading-8 text-slate-600">
                {course?.description}
              </p>
            </div>

            {/* Tags */}
            {course?.tags?.length > 0 && (
              <div
                className="
                  mt-6 rounded-[32px]
                  bg-white
                  p-8
                  shadow-sm
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-12 w-12
                      items-center justify-center
                      rounded-2xl
                      bg-orange-50
                      text-[#D6451B]
                    "
                  >
                    <FaTag />
                  </div>

                  <h3 className="text-xl font-bold">
                    Skills Covered
                  </h3>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        rounded-full
                        bg-orange-50
                        px-4 py-2
                        text-sm font-medium
                        text-[#D6451B]
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Target Audience */}
            <div
              className="
                rounded-[32px]
                bg-white
                p-8
                shadow-sm
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex h-12 w-12
                    items-center justify-center
                    rounded-2xl
                    bg-orange-50
                    text-[#D6451B]
                  "
                >
                  <FaUsers />
                </div>

                <h3 className="text-xl font-bold">
                  Who Is This For?
                </h3>
              </div>

              <div className="mt-6 space-y-4">
                {course?.targetAudience?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <FaCheckCircle className="mt-1 text-[#D6451B]" />

                      <span className="text-slate-600">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Requirements */}
            <div
              className="
                rounded-[32px]
                bg-white
                p-8
                shadow-sm
              "
            >
              <h3 className="text-xl font-bold">
                Requirements
              </h3>

              <div className="mt-6 space-y-4">
                {course?.requirements?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <FaCheckCircle className="mt-1 text-[#D6451B]" />

                      <span className="text-slate-600">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div
              className="
                rounded-[32px]
                bg-[#D6451B]
                p-8
                text-white
              "
            >
              <h3 className="text-xl font-bold">
                Course Details
              </h3>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <span>Duration</span>

                  <span className="font-semibold">
                    {course?.durationInMonths} Months
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Level</span>

                  <span className="font-semibold capitalize">
                    {course?.level}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Language</span>

                  <span className="font-semibold">
                    {course?.language}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Certificate</span>

                  <span className="font-semibold">
                    {course?.certificateAvailable
                      ? "Included"
                      : "Not Available"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Class Type</span>

                  <span className="font-semibold">
                    {course?.classType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}