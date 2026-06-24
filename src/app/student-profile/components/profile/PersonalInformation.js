"use client";

import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaBirthdayCake,
  FaLanguage,
  FaVenusMars,
  FaIdCard,
} from "react-icons/fa";

import Input from "./Input";
import Select from "./Select";

export default function PersonalInformation({
  register,
  errors,
  mode = "",
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-start gap-4 sm:mb-8">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-lg text-[#D6451B]">
          <FaIdCard />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Personal Information
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
            Update your personal details and keep your profile information
            accurate.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
        <Input
          icon={<FaUser />}
          label="Full Name"
          placeholder="Enter your full name"
          error={errors.fullName}
          {...register("fullName")}
        />

        <Input
          icon={<FaEnvelope />}
          label="Email Address"
          placeholder="Email"
          disabled
          error={errors.email}
          {...register("email")}
        />

        <Input
          icon={<FaPhoneAlt />}
          label="Phone Number"
          placeholder="Enter phone number"
          error={errors.phone}
          {...register("phone")}
        />

        {mode !== "user" && (
          <>
            <Input
              icon={<FaBirthdayCake />}
              type="date"
              label="Date of Birth"
              error={errors.dateOfBirth}
              {...register("dateOfBirth")}
            />

            <Select
              icon={<FaVenusMars />}
              label="Gender"
              error={errors.gender}
              {...register("gender")}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />

            <Select
              icon={<FaLanguage />}
              label="Language Level"
              error={errors.languageLevel}
              {...register("languageLevel")}
              options={[
                { value: "Beginner", label: "Beginner" },
                { value: "Elementary", label: "Elementary" },
                { value: "Intermediate", label: "Intermediate" },
                {
                  value: "Upper Intermediate",
                  label: "Upper Intermediate",
                },
                { value: "Advanced", label: "Advanced" },
              ]}
            />
          </>
        )}
      </div>
    </section>
  );
}