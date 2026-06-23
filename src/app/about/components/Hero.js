"use client";

import { useState } from "react";
import {
FaPhoneAlt,
FaUserGraduate,
FaLanguage,
FaSchool,
FaCheckCircle,
} from "react-icons/fa";

export default function Hero() {
const [form, setForm] = useState({
name: "",
phone: "",
course: "english",
});

const handleSubmit = (e) => {
e.preventDefault();

```
console.log(form);

// API Call Here
```

};

return ( <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20 lg:py-28">
{/* Background Shapes */}

  <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#D6451B]/10 blur-3xl" />

  <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" />

  <div className="mx-auto max-w-7xl px-6">
    <div className="grid items-center gap-14 lg:grid-cols-2">
      {/* Left Content */}

      <div>
        <span
          className="
            inline-flex items-center gap-2
            rounded-full
            bg-orange-100
            px-4 py-2
            text-sm font-medium
            text-[#D6451B]
          "
        >
          <FaCheckCircle />
          Free Demo Classes Available
        </span>

        <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
          Learn
          <span className="text-[#D6451B]">
            {" "}
            English,
          </span>

          <span className="block text-[#D6451B]">
            French & School Subjects
          </span>

          With Expert Teachers
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
          Join live interactive classes for Spoken English,
          IELTS Preparation, French Language, and School
          Tuition from Class 1st to 12th.
        </p>

        {/* Features */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <FaLanguage className="text-[#D6451B]" />

            <span className="font-medium">
              English & French
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <FaUserGraduate className="text-[#D6451B]" />

            <span className="font-medium">
              IELTS Preparation
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <FaSchool className="text-[#D6451B]" />

            <span className="font-medium">
              Classes 1st–12th
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <FaCheckCircle className="text-[#D6451B]" />

            <span className="font-medium">
              Live Interactive Classes
            </span>
          </div>
        </div>

        {/* Stats */}

        <div className="mt-10 flex flex-wrap gap-8">
          <div>
            <h3 className="text-3xl font-bold text-[#D6451B]">
              500+
            </h3>

            <p className="text-slate-500">
              Students
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-[#D6451B]">
              20+
            </h3>

            <p className="text-slate-500">
              Teachers
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-[#D6451B]">
              95%
            </h3>

            <p className="text-slate-500">
              Success Rate
            </p>
          </div>
        </div>
      </div>

      {/* Right Form */}

      <div>
        <div
          className="
            rounded-[32px]
            border border-slate-200
            bg-white
            p-8
            shadow-xl
          "
        >
          <h2 className="text-3xl font-bold text-slate-900">
            Register For Free Demo
          </h2>

          <p className="mt-2 text-slate-500">
            Book your free class and speak with our
            academic advisors.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="
                  w-full rounded-2xl
                  border border-slate-300
                  px-4 py-3
                  outline-none
                  focus:border-[#D6451B]
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="9876543210"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="
                  w-full rounded-2xl
                  border border-slate-300
                  px-4 py-3
                  outline-none
                  focus:border-[#D6451B]
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Interested In
              </label>

              <select
                value={form.course}
                onChange={(e) =>
                  setForm({
                    ...form,
                    course: e.target.value,
                  })
                }
                className="
                  w-full rounded-2xl
                  border border-slate-300
                  px-4 py-3
                  outline-none
                  focus:border-[#D6451B]
                "
              >
                <option value="english">
                  Spoken English
                </option>

                <option value="ielts">
                  IELTS Preparation
                </option>

                <option value="french">
                  French Language
                </option>

                <option value="school">
                  School Classes (1st-12th)
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="
                w-full rounded-2xl
                bg-[#D6451B]
                px-6 py-4
                font-semibold
                text-white
                transition
                hover:bg-[#bf3b14]
              "
            >
              Book Free Demo Class
            </button>

            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <FaPhoneAlt />

              Call / WhatsApp:
              <span className="font-semibold text-slate-900">
                +91 XXXXX XXXXX
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>


);
}
