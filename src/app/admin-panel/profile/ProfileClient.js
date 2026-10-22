
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { toast } from "sonner";


import ProfileSidebar from "@/app/student-profile/components/profile/ProfileSidebar";
import PersonalInformation from "@/app/student-profile/components/profile/PersonalInformation";
import { profileSchema } from "@/schemas/profileSchema";
import useAuthStore from "@/store/authStore";
import { useProfileImageMutation } from "@/app/mutations/userMutation";
import { useProfileUpdateMutation } from "@/app/mutations/studentMutation";
import { FaSave } from "react-icons/fa";


export default function ProfileClient() {
      const user = useAuthStore((state)=>state.user)
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
    },
  });

  const {
  mutate: uploadImage,
  isPending: isUploading,
} = useProfileImageMutation();


  // Populate form when profile loads
  useEffect(() => {
    if (!user ) return;

    reset({
      // User
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      
    });
  }, [user, reset]);

  const onSubmit = async (data) => {
        if(!isDirty){
          toast.error("Nothing changed");
          return
        }
        const updatedData = getDirtyValues(dirtyFields, data);

    await profileUpdateMutation.mutateAsync(updatedData);
  };


 const handleImageUpload = (file, done) => {
  uploadImage(file, {
    onSuccess: () => {
      done();
    },
  });
};

  return (
    <div className="py-2 sm:py-4">
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg"
      >
        <h1 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
          My Profile
        </h1>

        <p className="mt-2 text-orange-100">
          Manage your personal information.
        </p>
      </motion.div>

      <form
       onSubmit={handleSubmit(onSubmit,(error)=>console.log(error))}
        className="grid gap-8 lg:grid-cols-[320px_1fr]"
      >
        {/* Sidebar */}

       <ProfileSidebar
  user={user}
  onImageUpload={handleImageUpload}
  isUploading={isUploading}
/>

        {/* Form */}

        <div className="space-y-8">
          <PersonalInformation
            register={register}
            errors={errors}
            mode="user"

          />

         
          <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#D6451B] px-6 py-3 font-medium text-white transition hover:bg-[#b93814] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <FaSave />
        
                  {isSubmitting
                    ? "Saving..."
                    : "Save Changes"}
                </button>
        
              </div>
        </div>
      </form>
    </div></div>
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