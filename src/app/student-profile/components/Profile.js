
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
import { useProfileImageMutation } from "@/app/mutations/userMutation";
import ProfileSkeleton from "@/app/Skeletons/ProfileSkeleton";


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

  const {
  mutate: uploadImage,
  isPending: isUploading,
} = useProfileImageMutation();


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

 const handleImageUpload = (file, done) => {
  uploadImage(file, {
    onSuccess: () => {
      done();
    },
  });
};

if(!user || !profile) return <ProfileSkeleton></ProfileSkeleton>
return (
  <div className="min-h-screen bg-gradient-to-b from-orange-50/40 via-white to-slate-50">
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#D6451B] via-orange-500 to-orange-600 p-6 shadow-xl sm:p-8 lg:p-10"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-orange-300 blur-3xl" />
        </div>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-100 backdrop-blur">
              Student Portal
            </span>

            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              My Profile
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-orange-100 sm:text-base">
              Manage your personal information, contact details, guardian
              information and emergency contacts from one place.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:w-[320px]">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wider text-orange-100">
                Status
              </p>

              <h3 className="mt-2 text-lg font-semibold text-white">
                Active
              </h3>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wider text-orange-100">
                Profile
              </p>

              <h3 className="mt-2 text-lg font-semibold text-white">
                Complete
              </h3>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)] xl:gap-8"
      >
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:sticky lg:top-24 lg:self-start"
        >
            <ProfileSidebar
              user={user}
              profile={profile}
              onImageUpload={handleImageUpload}
              isUploading={isUploading}
            />
       
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-6"
        >
        
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your basic personal details.
              </p>
            </div>

            <PersonalInformation
              register={register}
              errors={errors}
            />
      

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Address Details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Keep your residential information updated.
              </p>
            </div>

            <AddressSection
              register={register}
              errors={errors}
            />
        

          
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Guardian Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Parent or guardian contact details.
              </p>
            </div>

            <GuardianSection
              register={register}
              errors={errors}
            />
        

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Emergency Contact
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                We'll use this contact in case of emergency.
              </p>
            </div>

            <EmergencySection
              register={register}
              profileUpdateMutation={profileUpdateMutation}
              errors={errors}
              isSubmitting={isSubmitting}
              handleCancel={handleCancel}
            />
       
        </motion.div>
      </form>
    </div>
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