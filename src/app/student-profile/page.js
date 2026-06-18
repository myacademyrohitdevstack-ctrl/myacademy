"use client";

import {
  FaUserGraduate,
  FaBookOpen,
  FaChartLine,
  FaCertificate,
  FaCalendarAlt,
} from "react-icons/fa";

export default function StudentProfile() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">

          {/* Sidebar */}
          <aside className="bg-white rounded-3xl border border-slate-200 p-6 h-fit">

            <div className="text-center">
              <img
                src="/student.jpg"
                alt=""
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />

              <h2 className="mt-4 text-xl font-bold">
                Anjali Sharma
              </h2>

              <p className="text-sm text-slate-500">
                Intermediate English
              </p>
            </div>

            <nav className="mt-8 space-y-2">

              <button className="w-full text-left rounded-xl bg-slate-900 text-white px-4 py-3">
                Dashboard
              </button>

              <button className="w-full text-left rounded-xl px-4 py-3 hover:bg-slate-100">
                My Courses
              </button>

              <button className="w-full text-left rounded-xl px-4 py-3 hover:bg-slate-100">
                Progress
              </button>

              <button className="w-full text-left rounded-xl px-4 py-3 hover:bg-slate-100">
                Certificates
              </button>

              <button className="w-full text-left rounded-xl px-4 py-3 hover:bg-slate-100">
                Settings
              </button>

            </nav>

          </aside>

          {/* Main */}
          <main>

            {/* Welcome */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8">

              <h1 className="text-3xl font-bold">
                Welcome back, Anjali 👋
              </h1>

              <p className="mt-2 text-slate-600">
                Continue your fluency journey and track your progress.
              </p>

            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-5 mt-6">

              {[
                ["32", "Classes Attended", <FaBookOpen />],
                ["78%", "Course Progress", <FaChartLine />],
                ["5", "Certificates", <FaCertificate />],
                ["12", "Speaking Sessions", <FaUserGraduate />],
              ].map(([value, label, icon]) => (
                <div
                  key={label}
                  className="bg-white rounded-3xl border border-slate-200 p-6"
                >
                  <div className="text-blue-600 text-xl">
                    {icon}
                  </div>

                  <div className="mt-4 text-3xl font-bold">
                    {value}
                  </div>

                  <div className="text-sm text-slate-500">
                    {label}
                  </div>
                </div>
              ))}

            </div>

            {/* Current Program */}
            <div className="mt-6 bg-white rounded-3xl border border-slate-200 p-8">

              <div className="flex justify-between items-center">

                <div>
                  <h2 className="text-xl font-semibold">
                    Current Program
                  </h2>

                  <p className="text-slate-500">
                    General English - Intermediate Level
                  </p>
                </div>

                <div className="text-blue-600 font-semibold">
                  78% Complete
                </div>

              </div>

              <div className="mt-5 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[78%] bg-gradient-to-r from-blue-500 to-violet-500" />
              </div>

            </div>

            {/* Upcoming Classes */}
            <div className="mt-6 bg-white rounded-3xl border border-slate-200 p-8">

              <h2 className="text-xl font-semibold">
                Upcoming Classes
              </h2>

              <div className="mt-5 space-y-4">

                {[
                  "English Speaking Practice",
                  "Business Communication",
                  "Grammar Workshop",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex justify-between items-center rounded-2xl border border-slate-200 p-4"
                  >
                    <div>
                      <h3 className="font-medium">{item}</h3>
                      <p className="text-sm text-slate-500">
                        Tomorrow • 6:00 PM
                      </p>
                    </div>

                    <FaCalendarAlt />
                  </div>
                ))}

              </div>

            </div>

          </main>

        </div>

      </div>

    </div>
  );
}