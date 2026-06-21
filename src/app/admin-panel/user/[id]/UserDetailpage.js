"use client";

import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaCheckCircle,
  FaBan,
  FaEdit,
  FaSave,
  FaTimes,
  FaPhoneAlt,
  FaBirthdayCake,
  FaVenusMars,
  FaSpinner,
} from "react-icons/fa";
import { useAdminUserById } from "@/Hooks/useUserByIdAdmin";
import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/schemas/profileSchema";
import Input from "@/app/student-profile/components/profile/Input";
import { toast } from "sonner";
import { useAdminApproveUser, useAdminBlockUser, useAdminRejectUser, useAdminUnblockUser, useAdminUserUpdateMutation } from "@/app/mutations/AdminMutations";
import Select from "@/app/student-profile/components/profile/Select";
import Modal from "@/app/Components/ui/Modals";
import { useRouter } from "next/navigation";


export default function UserDetailsPage({id}) {
  const [open, setOpen] = useState(false);
 const [reason, setReason] = useState("");
  const updateMutation=useAdminUserUpdateMutation(id)
  const approveUserMutation=useAdminApproveUser(id)
  const rejectUserMutation=useAdminRejectUser(id)
  const blockUserMutation=useAdminBlockUser(id,setOpen)
  const unblockUserMutation=useAdminUnblockUser(id)
  const router=useRouter()
 const {register,handleSubmit, reset,
    formState: {
      errors,
      isSubmitting,
      isDirty,
      dirtyFields
    },} =useForm({
      resolver:zodResolver(profileSchema),
       mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      profileImage: "",
       role : ""}
    })
  const {data,isLoading}=useAdminUserById(id)

useEffect(() => {
  if (data) {
     reset({
      fullName: data.fullName || "",
      email: data.email || "",
      phone: data.phone || "",
      profileImage: data.profileImage || "",
      role:data.role || ""
    })
  }
}, [data,reset]);
const user={approvalStatus:"approved",status:"active"}
 

  const onSubmit = async(data) => {
    console.log("error")
  if(!isDirty){
          toast.error("Nothing changed");
          return
        }
           console.log("error")
          const updatedData = getDirtyValues(dirtyFields, data);
             console.log(updatedData)
    await updateMutation.mutateAsync(updatedData);
    
  };
  const handleApproveUserClick=()=>{
    if(!id) return
    approveUserMutation.mutate()
  }
  const handleRejectUserClick=()=>{
    if(!id) return
    rejectUserMutation.mutate()
  }
  const handleBlockUserClick=()=>{
    if(!id) return
    blockUserMutation.mutate({reason})
  }
  const handleUnblockUserClick=()=>{
    if(!id) return
    unblockUserMutation.mutate()
  }
  if(isLoading) return
  return (
    <div className="  py-24">
      {/* Header */}
<div className="max-w-6xl mx-auto space-y-8 py-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[32px] bg-gradient-to-r from-[#D6451B] to-orange-500 p-8 text-white shadow-xl w-full"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <button onClick={()=>{router.push('/admin-panel/student')}} className="mb-4 flex items-center gap-2 text-white/90">
            
              <FaArrowLeft />
              Back to Users
            </button>

            <h1 className="text-4xl font-bold">
              User Profile
            </h1>

            <p className="mt-2 text-orange-100">
              View and manage user details.
            </p>
          </div>

         
        </div>
      </motion.div>

      {/* Profile Card */}

      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#D6451B]/10 text-4xl font-bold text-[#D6451B]">
            R
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold">
              {data?.fullName} {`(${capitalizeFirstLetter(data?.role)})`}
            </h2>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className={`rounded-full  px-4 py-2 text-sm font-medium  ${
        data?.approvalStatus === "approved"
          ? "bg-green-100 text-green-700"
          : data?.approvalStatus === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}>
                {data?.approvalStatus}
              </span>

              <span className={`rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700 ${
        data?.status === "active"
          ? "bg-green-100 text-green-700"
          : data?.approvalStatus === "block"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}>
            {data?.status}
              </span>

            
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}

   <section className={`rounded-[30px] border border-slate-200 bg-white px-8 pb-20 pt-8 shadow-lg`}>
 
       <div className="mb-8">
         <h2 className="text-2xl font-bold">
           Personal Information
         </h2>
 
         <p className="text-slate-500">
           Update your personal details.
         </p>
       </div>
 
 <form onSubmit={handleSubmit(onSubmit)}>
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
          <Select
                   icon={<FaUserShield />}
                   label="Role"
                   error={errors.role}
                   {...register("role")}
                   options={[
                     { value: "student", label: "Student" },
                     { value: "teacher", label: "Teacher" },
                    
                   ]}
                 />
 
         
       </div>

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
       </form>
     </section>

      {/* Account Information */}

      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
        <h2 className="mb-8 text-2xl font-bold">
          Account Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Info label="Email Verified" value="Yes" />
          <Info label="Phone Verified" value="No" />
          <Info label="Login Provider" value="Email" />
          <Info label="Last Login" value="21 Jun 2026" />
          <Info label="Created At" value="12 Jun 2026" />
          <Info label="Approval Status" value="Approved" />
        </div>
      </div>

      {/* Actions */}

    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
  <h2 className="mb-8 text-2xl font-bold">
    Account Actions
  </h2>

  <div className="flex flex-wrap gap-4">

    {data.approvalStatus === "pending" && (
      <>
        <button
        onClick={handleApproveUserClick}
        disabled={approveUserMutation.isPending}
          className="flex items-center gap-3 rounded-2xl bg-green-100 px-6 py-4 font-semibold text-green-700 transition hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
        >
        {
  approveUserMutation.isPending ? (
    <FaSpinner className="animate-spin text-black" />
  ) : (
    <>
      <FaCheckCircle />
      Approve User
    </>
  )
}
        
        </button>

        <button
           onClick={handleRejectUserClick}
        disabled={rejectUserMutation.isPending}
          className="flex items-center gap-3 rounded-2xl bg-yellow-100 px-6 py-4 font-semibold text-yellow-700 transition hover:scale-105"
        >
            {
  rejectUserMutation.isPending ? (
    <FaSpinner className="animate-spin text-black" />
  ) : (
    <>
      <FaTimes />
          Reject User
    </>
  )
}
        
        </button>
      </>
    )}

    {data.approvalStatus === "approved"  &&
      data.status === "active" && (
        <button
           onClick={()=>{setOpen(true)}}
      
          className="flex items-center gap-3 rounded-2xl bg-red-100 px-6 py-4 font-semibold text-red-700 transition hover:scale-105"
        > <FaBan></FaBan> Block User
         
        </button>
      )}

    {data.approvalStatus === "approved" &&
      data.status === "blocked" && (
        <button
           onClick={handleUnblockUserClick}
        disabled={unblockUserMutation.isPending}
          className="flex items-center gap-3 rounded-2xl bg-blue-100 px-6 py-4 font-semibold text-blue-700 transition hover:scale-105"
        >
          {
  unblockUserMutation.isPending ? (
    <FaSpinner className="animate-spin text-black" />
  ) : (
    <>
       <FaCheckCircle />
          Unblock User
    </>
  )
}
         
      
        </button>
      )}
 {data.approvalStatus === "rejected" && (
      <>
        <button
        onClick={handleApproveUserClick}
        disabled={approveUserMutation.isPending}
          className="flex items-center gap-3 rounded-2xl bg-green-100 px-6 py-4 font-semibold text-green-700 transition hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
        >
        {
  approveUserMutation.isPending ? (
    <FaSpinner className="animate-spin text-black" />
  ) : (
    <>
      <FaCheckCircle />
      Approve User
    </>
  )
}
        
        </button>

       
      </>
    )}
  

  </div>
</div>
    </div>
        <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Block User"
        actions={
          <>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              onClick={handleBlockUserClick}
                disabled={blockUserMutation.isPending}
              className="rounded-lg bg-red-600 px-5 py-2 text-white"
            >
           {
  blockUserMutation.isPending ? (
    <FaSpinner className="animate-spin text-black" />
  ) : (
    <>
     
          Block User
    </>
  )
}
            </button>
          </>
        }
      >
        <p className="mb-4 text-sm text-slate-600">
          Please provide a reason for blocking this user.
        </p>

        <textarea
          rows={5}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason..."
          className="w-full rounded-xl border p-3 outline-none focus:border-red-500"
        />
      </Modal>
    </div>
    
  );
}



function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">
        {label}
      </p>
      <p className="mt-1 font-semibold">
        {value}
      </p>
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