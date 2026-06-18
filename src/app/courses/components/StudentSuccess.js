"use client";

const students = [
  {
    name: "Anjali Sharma",
    image: "/students/student1.jpg",
    result: "B1 → C1",
    achievement: "Promoted to Team Lead",
    quote:
      "I went from avoiding meetings to leading presentations confidently.",
  },
  {
    name: "Rahul Mehta",
    image: "/students/student2.jpg",
    result: "IELTS 7.5",
    achievement: "Study Visa Approved",
    quote:
      "The speaking sessions helped me achieve my target score in just 4 months.",
  },
  {
    name: "Sofia Martin",
    image: "/students/student3.jpg",
    result: "Fluent Speaker",
    achievement: "International Career",
    quote:
      "I can now communicate naturally with colleagues from different countries.",
  },
];

export default function StudentSuccess() {
  return (
    <section className="relative py-28 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">

          <p className="text-xs tracking-[0.35em] text-slate-400">
            REAL STUDENT RESULTS
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold">
            Success stories that
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              {" "}inspire
            </span>
          </h2>

          <p className="mt-5 text-slate-600">
            Real learners. Real transformations. Real outcomes.
          </p>

        </div>

        {/* Masonry Layout */}
        <div className="grid lg:grid-cols-3 gap-6">

          {students.map((student) => (
            <div
              key={student.name}
              className="group relative h-[500px] rounded-3xl overflow-hidden"
            >

              {/* Image */}
              <img
                src={student.image}
                alt={student.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Result Badge */}
              <div className="absolute top-5 left-5 rounded-full bg-white/90 backdrop-blur px-4 py-2 text-sm font-semibold">
                {student.result}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 p-8 text-white">

                <div className="text-xs tracking-[0.3em] text-white/60">
                  ACHIEVEMENT
                </div>

                <h3 className="mt-2 text-2xl font-bold">
                  {student.achievement}
                </h3>

                <p className="mt-4 text-white/80 leading-relaxed">
                  "{student.quote}"
                </p>

                <div className="mt-6 border-t border-white/20 pt-4">
                  <div className="font-semibold">
                    {student.name}
                  </div>

                  <div className="text-sm text-white/60">
                    Student
                  </div>
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* Bottom Impact Stats */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            ["12K+", "Students Trained"],
            ["98%", "Success Rate"],
            ["25+", "Countries"],
            ["4.9★", "Average Rating"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 p-8 text-center"
            >
              <div className="text-4xl font-bold text-slate-900">
                {value}
              </div>

              <div className="mt-2 text-slate-500">
                {label}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}