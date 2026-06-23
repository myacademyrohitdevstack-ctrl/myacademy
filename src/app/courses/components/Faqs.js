"use client";

import { useState } from "react";
import {
  FaPlus,
  FaMinus,
  FaHeadset,
  FaWhatsapp,
} from "react-icons/fa";

const faqs = [
  {
    question:
      "Who can join your courses?",
    answer:
      "We offer English Speaking, IELTS, PTE, French Language, and academic classes for students from 6th to 12th grade. Both beginners and advanced learners are welcome.",
  },
  {
    question:
      "Are the classes live or recorded?",
    answer:
      "All classes are conducted live by experienced trainers. Students can interact, ask questions, and participate in activities during every session.",
  },
  {
    question:
      "Do you provide IELTS and PTE preparation?",
    answer:
      "Yes. We provide complete IELTS and PTE preparation including speaking practice, mock tests, writing evaluation, and personalized feedback.",
  },
  {
    question:
      "Can school students join online tuition classes?",
    answer:
      "Yes. We offer subject-specific coaching and academic support for students from classes 6th to 12th.",
  },
  {
    question:
      "Do I get certificates after completing a course?",
    answer:
      "Yes. Students receive completion certificates after successfully finishing their course requirements.",
  },
  {
    question:
      "How are French language classes conducted?",
    answer:
      "French classes focus on speaking, listening, reading, writing, grammar, and DELF exam preparation through live interactive sessions.",
  },
  {
    question:
      "Can I attend classes from anywhere?",
    answer:
      "Absolutely. Our academy is fully online, allowing students to learn from anywhere in India and around the world.",
  },
  {
    question:
      "How do I enroll?",
    answer:
      "Simply contact our team through WhatsApp or phone. We will guide you in selecting the right course and batch.",
  },
];

export default function FAQs() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Left Side */}

          <div className="lg:sticky lg:top-24 h-fit">

            <span
              className="
                rounded-full
                bg-[#D6451B]/10
                px-4 py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#D6451B]
              "
            >
              Frequently Asked Questions
            </span>

            <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
              Everything You
              <span className="block text-[#D6451B]">
                Need To Know
              </span>
            </h2>

            <p className="mt-5 text-lg text-slate-600">
              Find answers about English Speaking,
              IELTS, PTE, French Language courses,
              and academic coaching programs.
            </p>

            {/* Support Card */}

            <div
              className="
                mt-10
                rounded-[32px]
                bg-white
                border border-slate-200
                p-6
                shadow-sm
              "
            >
              <div
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  bg-[#D6451B]/10
                  text-[#D6451B]
                "
              >
                <FaHeadset />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Need Help Choosing?
              </h3>

              <p className="mt-2 text-slate-600">
                Speak with our advisors and find the
                perfect course or batch for your goals.
              </p>

              <button
                className="
                  mt-5
                  flex items-center gap-2
                  rounded-2xl
                  bg-[#D6451B]
                  px-5 py-3
                  text-white
                  transition
                  hover:scale-105
                "
              >
                <FaWhatsapp />
                Chat on WhatsApp
              </button>
            </div>

          </div>

          {/* FAQ List */}

          <div className="space-y-4">

            {faqs.map((faq, index) => {
              const isOpen = active === index;

              return (
                <div
                  key={index}
                  className="
                    overflow-hidden
                    rounded-3xl
                    border border-slate-200
                    bg-white
                    transition
                    hover:border-[#D6451B]
                  "
                >
                  <button
                    onClick={() =>
                      setActive(
                        isOpen ? null : index
                      )
                    }
                    className="
                      flex w-full
                      items-center
                      justify-between
                      p-5
                      text-left
                    "
                  >
                    <span
                      className="
                        pr-4
                        font-semibold
                        text-slate-900
                      "
                    >
                      {faq.question}
                    </span>

                    <div
                      className="
                        flex h-10 w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-slate-100
                        text-[#D6451B]
                      "
                    >
                      {isOpen ? (
                        <FaMinus />
                      ) : (
                        <FaPlus />
                      )}
                    </div>
                  </button>

                  <div
                    className={`
                      overflow-hidden
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "max-h-48 px-5 pb-5"
                          : "max-h-0"
                      }
                    `}
                  >
                    <p className="leading-relaxed text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </div>
    </section>
  );
}