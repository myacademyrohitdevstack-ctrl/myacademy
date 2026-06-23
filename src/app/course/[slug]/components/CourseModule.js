"use client";

import { useState } from "react";
import {
  FaBookOpen,
  FaChevronDown,
  FaChevronUp,
  FaPlayCircle,
} from "react-icons/fa";

export default function CourseModules() {
  const [openModule, setOpenModule] =
    useState(0)
   const modules= [
  {
    title: "Introduction to Spoken English",
    description:
      "Build confidence with basic conversations and daily communication.",
    lessons: [
      "Self Introduction",
      "Basic Greetings",
      "Daily Vocabulary",
      "Simple Conversations",
    ],
  },
  {
    title: "Grammar Foundations",
    description:
      "Learn the grammar required for accurate speaking and writing.",
    lessons: [
      "Tenses",
      "Sentence Structure",
      "Articles & Prepositions",
      "Common Grammar Mistakes",
    ],
  },
  {
    title: "Public Speaking & Confidence",
    description:
      "Improve fluency and presentation skills through practical exercises.",
    lessons: [
      "Speech Practice",
      "Storytelling",
      "Presentation Skills",
      "Confidence Building",
    ],
  },
];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="max-w-3xl mb-12">
          <span
            className="
              inline-flex items-center
              rounded-full
              bg-orange-100
              px-4 py-2
              text-sm font-medium
              text-[#D6451B]
            "
          >
            Course Curriculum
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Course Modules
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Follow a structured roadmap designed
            to help students progress step by
            step.
          </p>
        </div>

        <div className="space-y-4">
          {modules.map((module, index) => {
            const isOpen =
              openModule === index;

            return (
              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-3xl
                  border border-slate-200
                  bg-white
                "
              >
                <button
                  onClick={() =>
                    setOpenModule(
                      isOpen ? null : index
                    )
                  }
                  className="
                    flex w-full
                    items-center justify-between
                    gap-4
                    p-6 text-left
                  "
                >
                  <div className="flex items-center gap-4">

                    <div
                      className="
                        flex h-14 w-14
                        items-center justify-center
                        rounded-2xl
                        bg-orange-50
                        text-[#D6451B]
                      "
                    >
                      <FaBookOpen />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Module {index + 1}:{" "}
                        {module.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {
                          module.lessons
                            ?.length
                        }{" "}
                        Lessons
                      </p>
                    </div>
                  </div>

                  {isOpen ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>

                <div
                  className={`transition-all duration-300 ${
                    isOpen
                      ? "max-h-[1000px]"
                      : "max-h-0"
                  } overflow-hidden`}
                >
                  <div className="border-t border-slate-100 px-6 py-6">

                    <p className="mb-6 text-slate-600">
                      {
                        module.description
                      }
                    </p>

                    <div className="space-y-3">
                      {module.lessons?.map(
                        (
                          lesson,
                          lessonIndex
                        ) => (
                          <div
                            key={
                              lessonIndex
                            }
                            className="
                              flex items-center gap-3
                              rounded-2xl
                              bg-slate-50
                              p-4
                            "
                          >
                            <FaPlayCircle
                              className="
                                text-[#D6451B]
                                shrink-0
                              "
                            />

                            <span className="text-slate-700">
                              {lesson}
                            </span>
                          </div>
                        )
                      )}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}