"use client";

import { motion } from "framer-motion";
import {
  FaCheck,
  FaArrowRight,
  FaRegCalendarAlt,
} from "react-icons/fa";

export default function StepCard({
  title,
  subtitle,
  options,
  selected,
  onSelect,
  multiSelect = false,
}) {
  const isSelected = (item) => {
    if (multiSelect) {
      return selected?.includes(item.title || item);
    }

    return selected === (item.title || item);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -30,
      }}
      transition={{
        duration: 0.35,
      }}
      className="w-full"
    >
      {/* Heading */}

      <div className="mb-8">
        <div className="text-[11px] tracking-[0.35em] text-[#D6451B]">
          PERSONALIZED LEARNING
        </div>

        <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 lg:text-5xl">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-4 max-w-xl text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Options */}

      <div className="grid gap-4">

        {options.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.title || item}
              whileHover={{
                y: -4,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() =>
                onSelect(item.title || item)
              }
              className={`group relative overflow-hidden rounded-[28px] border p-5 text-left transition-all duration-300 lg:p-6 ${
                isSelected(item)
                  ? "border-[#D6451B] bg-white shadow-[0_15px_40px_rgba(214,69,27,0.12)]"
                  : "border-slate-200 bg-white hover:border-[#D6451B]/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
              }`}
            >
              {/* Glow */}

              {isSelected(item) && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#D6451B]/5 to-[#7BC3D7]/5" />
              )}

              <div className="relative flex items-center gap-4">

                {Icon && (
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6451B]/10 to-[#7BC3D7]/10 text-xl text-[#D6451B]">
                    <Icon />
                  </div>
                )}

                <div className="flex-1">
                  <div className="font-semibold text-slate-900">
                    {item.title || item}
                  </div>

                  {item.subtitle && (
                    <div className="mt-1 text-sm text-slate-500">
                      {item.subtitle}
                    </div>
                  )}
                </div>

                {isSelected(item) ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D6451B] text-white">
                    <FaCheck />
                  </div>
                ) : (
                  <FaArrowRight className="text-slate-300 transition group-hover:text-[#D6451B]" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ===========================
   Budget Selection Component
=========================== */

export function BudgetSelector({
  value,
  onChange,
  budgets,
}) {
  return (
    <div>
      <div className="mb-8">
        <div className="text-[11px] tracking-[0.35em] text-[#D6451B]">
          BUDGET
        </div>

        <h2 className="mt-3 text-3xl font-bold lg:text-5xl">
          What's your budget?
        </h2>

        <p className="mt-4 text-slate-500">
          Choose a comfortable lesson range.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {budgets.map((budget) => (
          <button
            key={budget}
            onClick={() => onChange(budget)}
            className={`rounded-3xl border p-6 text-center transition-all ${
              value === budget
                ? "border-[#D6451B] bg-[#D6451B] text-white shadow-xl"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="text-lg font-semibold">
              {budget}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ===========================
   Availability Calendar
=========================== */

export function AvailabilitySelector({
  selected,
  toggleDay,
  days,
}) {
  return (
    <div>
      <div className="mb-8">
        <div className="text-[11px] tracking-[0.35em] text-[#D6451B]">
          SCHEDULE
        </div>

        <h2 className="mt-3 text-3xl font-bold lg:text-5xl">
          When are you available?
        </h2>

        <p className="mt-4 text-slate-500">
          Select all days that work for you.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`rounded-[24px] border p-5 transition-all ${
              selected.includes(day)
                ? "border-[#D6451B] bg-[#D6451B] text-white"
                : "border-slate-200 bg-white"
            }`}
          >
            <FaRegCalendarAlt className="mx-auto mb-3 text-lg" />

            <div>{day}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ===========================
   Contact Form
=========================== */

export function ContactForm({
  form,
  update,
}) {
  return (
    <div>
      <div className="mb-8">
        <div className="text-[11px] tracking-[0.35em] text-[#D6451B]">
          ALMOST DONE
        </div>

        <h2 className="mt-3 text-3xl font-bold lg:text-5xl">
          Tell us about yourself
        </h2>

        <p className="mt-4 text-slate-500">
          We'll use this information to connect
          you with the right tutor.
        </p>
      </div>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            update("name", e.target.value)
          }
          className="w-full rounded-3xl border border-slate-200 px-5 py-4 outline-none transition focus:border-[#D6451B]"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            update("email", e.target.value)
          }
          className="w-full rounded-3xl border border-slate-200 px-5 py-4 outline-none transition focus:border-[#D6451B]"
        />

     <input
  type="tel"
  placeholder="Phone Number"
  value={form.phone || ""}
  onChange={(e) =>
    update("phone", e.target.value)
  }
  className="w-full rounded-3xl border border-slate-200 px-5 py-4 outline-none transition focus:border-[#D6451B]"
/>
      </div>
    </div>
  );
}