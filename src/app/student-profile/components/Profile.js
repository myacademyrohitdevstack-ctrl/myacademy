// "use client";

// import { useState,useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   FaCamera,
//   FaUser,
//   FaEnvelope,
//   FaPhoneAlt,
//   FaMapMarkerAlt,
//   FaBirthdayCake,
//   FaSave,
// } from "react-icons/fa";


// export default function Profile({user,profile}) {

// const [form, setForm] = useState({
//   // User
//   fullName: "",
//   email: "",
//   phone: "",
//   profileImage: "",

//   // Student
//   dateOfBirth: "",
//   gender: "",
//   languageLevel: "",

//   address: {
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     postalCode: "",
//   },

//   guardian: {
//     fatherName: "",
//     motherName: "",
//     guardianName: "",
//     relationship: "",
//     phone: "",
//     email: "",
//   },

//   emergencyContact: {
//     name: "",
//     phone: "",
//     relation: "",
//   },
// });
// useEffect(() => {
//   if (!user || !profile) return;

//   setForm({
//     fullName: user.fullName || "",
//     email: user.email || "",
//     phone: user.phone || "",
//     profileImage: user.profileImage || "",

//     dateOfBirth: profile.dateOfBirth?.split("T")[0] || "",
//     gender: profile.gender || "",
//     languageLevel: profile.languageLevel || "",

//     address: {
//       street: profile.address?.street || "",
//       city: profile.address?.city || "",
//       state: profile.address?.state || "",
//       country: profile.address?.country || "",
//       postalCode: profile.address?.postalCode || "",
//     },

//     guardian: {
//       fatherName: profile.guardian?.fatherName || "",
//       motherName: profile.guardian?.motherName || "",
//       guardianName: profile.guardian?.guardianName || "",
//       relationship: profile.guardian?.relationship || "",
//       phone: profile.guardian?.phone || "",
//       email: profile.guardian?.email || "",
//     },

//     emergencyContact: {
//       name: profile.emergencyContact?.name || "",
//       phone: profile.emergencyContact?.phone || "",
//       relation: profile.emergencyContact?.relation || "",
//     },
//   });
// }, [user, profile]);
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // TODO:
//     // await axios.put("/api/student/profile", form);

//     console.log(form);
//   };

//   return (
//     <div className="space-y-8">

//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="rounded-[32px] bg-gradient-to-r from-[#D6451B] to-orange-500 p-8 text-white"
//       >
//         <h1 className="text-4xl font-bold">
//           My Profile
      
       
//         </h1>

//         <p className="mt-2 text-orange-100">
//           Manage your personal information.
//         </p>
//       </motion.div>

//       <form
//         onSubmit={handleSubmit}
//         className="grid gap-8 lg:grid-cols-[320px_1fr]"
//       >

//         {/* Left Card */}
//         <div className="rounded-[30px] border bg-white p-8 shadow-lg">

//           <div className="relative mx-auto w-fit">

//             <img
//               src="/student.jpg"
//               className="h-40 w-40 rounded-full object-cover"
//             />

//             <button
//               type="button"
//               className="absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#D6451B] text-white"
//             >
//               <FaCamera />
//             </button>

//           </div>

//           <h2 className="mt-6 text-center text-2xl font-bold">
//             {form.name}
//           </h2>

//           <p className="text-center text-slate-500">
//             Intermediate English
//           </p>

//           <div className="mt-8 space-y-4">

//             <Info title="Course" value="General English" />

//             <Info title="Batch" value="Morning Batch" />

//             <Info title="Trainer" value="John Smith" />

//             <Info title="Student ID" value="IMA240015" />

//           </div>

//         </div>

//         {/* Right Card */}
//         <div className="rounded-[30px] border bg-white p-8 shadow-lg">

//           <div className="grid gap-6 md:grid-cols-2">

//             <Input
//               icon={<FaUser />}
//               label="Full Name"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//             />

//             <Input
//               icon={<FaEnvelope />}
//               label="Email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//             />

//             <Input
//               icon={<FaPhoneAlt />}
//               label="Phone"
//               name="phone"
//               value={form.phone}
//               onChange={handleChange}
//             />

//             <Input
//               icon={<FaBirthdayCake />}
//               label="Date of Birth"
//               type="date"
//               name="dob"
//               value={form.dob}
//               onChange={handleChange}
//             />

//             <div className="md:col-span-2">

//               <label className="mb-2 block font-medium">
//                 Address
//               </label>

//               <div className="relative">

//                 <FaMapMarkerAlt className="absolute left-4 top-4 text-slate-400" />

//                 <textarea
//                   rows={4}
//                   name="address"
//                   value={form.address}
//                   onChange={handleChange}
//                   className="w-full rounded-2xl border border-slate-200 pl-12 pr-4 pt-4 outline-none focus:border-[#D6451B]"
//                 />

//               </div>

//             </div>

//           </div>

//           <div className="mt-8 flex justify-end gap-4">

//             <button
//               type="button"
//               className="rounded-2xl border px-6 py-3"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="flex items-center gap-2 rounded-2xl bg-[#D6451B] px-6 py-3 font-medium text-white"
//             >
//               <FaSave />
//               Save Changes
//             </button>

//           </div>

//         </div>

//       </form>

//     </div>
//   );
// }

// function Input({
//   icon,
//   label,
//   type = "text",
//   ...props
// }) {
//   return (
//     <div>

//       <label className="mb-2 block font-medium">
//         {label}
//       </label>

//       <div className="relative">

//         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
//           {icon}
//         </span>

//         <input
//           type={type}
//           {...props}
//           className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-[#D6451B]"
//         />

//       </div>

//     </div>
//   );
// }

// function Info({ title, value }) {
//   return (
//     <div className="rounded-2xl bg-slate-50 p-4">
//       <p className="text-sm text-slate-500">{title}</p>
//       <h3 className="font-semibold">{value}</h3>
//     </div>
//   );
// }
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { profileSchema } from "@/schemas/profileSchema";
import ProfileSidebar from "./profile/ProfileSidebar";
import PersonalInformation from "./profile/PersonalInformation";
import AddressSection from "./profile/AddressSection";
import GuardianSection from "./profile/GuardianSection";
import EmergencySection from "./profile/EmergencySection";
import { toast } from "sonner";
import { useProfileUpdateMutation } from "@/app/mutations/studentMutation";


export default function Profile({ user, profile }) {
  const profileUpdateMutation=useProfileUpdateMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      isDirty,
      dirtyFields
    },
  } = useForm({
    resolver: zodResolver(profileSchema),
     mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      profileImage: "",

      dateOfBirth: "",
      gender: "",
      languageLevel: "",

      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },

      guardian: {
        fatherName: "",
        motherName: "",
        guardianName: "",
        relationship: "",
        phone: "",
        email: "",
      },

      emergencyContact: {
        name: "",
        phone: "",
        relation: "",
      },
    },
  });

  // Populate form when profile loads
  useEffect(() => {
    if (!user || !profile) return;

    reset({
      // User
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      profileImage: user.profileImage || "",

      // Student
      dateOfBirth: profile.dateOfBirth
        ? new Date(profile.dateOfBirth)
            .toISOString()
            .split("T")[0]
        : "",

      gender: profile.gender || "",

      languageLevel:
        profile.languageLevel || "Beginner",

      address: {
        street: profile.address?.street || "",
        city: profile.address?.city || "",
        state: profile.address?.state || "",
        country: profile.address?.country || "",
        postalCode:
          profile.address?.postalCode || "",
      },

      guardian: {
        fatherName:
          profile.guardian?.fatherName || "",
        motherName:
          profile.guardian?.motherName || "",
        guardianName:
          profile.guardian?.guardianName || "",
        relationship:
          profile.guardian?.relationship || "",
        phone:
          profile.guardian?.phone || "",
        email:
          profile.guardian?.email || "",
      },

      emergencyContact: {
        name:
          profile.emergencyContact?.name || "",
        phone:
          profile.emergencyContact?.phone || "",
        relation:
          profile.emergencyContact?.relation || "",
      },
    });
  }, [user, profile, reset]);

  const onSubmit = async (data) => {
        if(!isDirty){
          toast.error("Nothing changed");
          return
        }
        const updatedData = getDirtyValues(dirtyFields, data);

    await profileUpdateMutation.mutateAsync(updatedData);
  };

  const handleCancel = () => {
    if (!user || !profile) return;

    reset({
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      profileImage: user.profileImage || "",

      dateOfBirth: profile.dateOfBirth
        ? new Date(profile.dateOfBirth)
            .toISOString()
            .split("T")[0]
        : "",

      gender: profile.gender || "",

      languageLevel:
        profile.languageLevel || "Beginner",

      address: {
        street: profile.address?.street || "",
        city: profile.address?.city || "",
        state: profile.address?.state || "",
        country: profile.address?.country || "",
        postalCode:
          profile.address?.postalCode || "",
      },

      guardian: {
        fatherName:
          profile.guardian?.fatherName || "",
        motherName:
          profile.guardian?.motherName || "",
        guardianName:
          profile.guardian?.guardianName || "",
        relationship:
          profile.guardian?.relationship || "",
        phone:
          profile.guardian?.phone || "",
        email:
          profile.guardian?.email || "",
      },

      emergencyContact: {
        name:
          profile.emergencyContact?.name || "",
        phone:
          profile.emergencyContact?.phone || "",
        relation:
          profile.emergencyContact?.relation || "",
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    console.log(file);

    // TODO:
    // uploadProfileImage(file)
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[32px] bg-gradient-to-r from-[#D6451B] to-orange-500 p-8 text-white"
      >
        <h1 className="text-4xl font-bold">
          My Profile
        </h1>

        <p className="mt-2 text-orange-100">
          Manage your personal information.
        </p>
      </motion.div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-8 lg:grid-cols-[320px_1fr]"
      >
        {/* Sidebar */}

        <ProfileSidebar
          user={user}
          profile={profile}
          onImageChange={handleImageChange}
        />

        {/* Form */}

        <div className="space-y-8">
          <PersonalInformation
            register={register}
            errors={errors}
          />

          <AddressSection
            register={register}
            errors={errors}
          />

          <GuardianSection
            register={register}
            errors={errors}
          />

          <EmergencySection
            register={register}
            profileUpdateMutation={profileUpdateMutation}
            errors={errors}
            isSubmitting={isSubmitting}
            handleCancel={handleCancel}
          />
        </div>
      </form>
    </div>
  );
}
function getDirtyValues(dirtyFields, allValues) {
  if (dirtyFields === true) {
    return allValues;
  }

  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) => [
      key,
      getDirtyValues(dirtyFields[key], allValues[key]),
    ])
  );
}