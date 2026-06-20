"use client";

import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaBirthdayCake,
  FaLanguage,
  FaVenusMars,
} from "react-icons/fa";

import Input from "./Input";
import Select from "./Select";

export default function PersonalInformation({
  register,
  errors,
}) {
  return (
    <section className={`rounded-[30px] border border-slate-200 bg-white px-8 pb-20 pt-8 shadow-lg`}>

      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          Personal Information
        </h2>

        <p className="text-slate-500">
          Update your personal details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          icon={<FaUser />}
          label="Full Name"
          placeholder="Full Name"
          error={errors.fullName}
          {...register("fullName")}
        />

        <Input
          icon={<FaEnvelope />}
          label="Email"
          disabled
          error={errors.email}
          {...register("email")}
        />

        <Input
          icon={<FaPhoneAlt />}
          label="Phone"
          error={errors.phone}
          {...register("phone")}
        />

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
            { value: "Upper Intermediate", label: "Upper Intermediate" },
            { value: "Advanced", label: "Advanced" },
          ]}
        />

      </div>

    </section>
  );
}