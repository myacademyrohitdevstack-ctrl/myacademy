
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
  onImageUpload={handleImageUpload}
  isUploading={isUploading}
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