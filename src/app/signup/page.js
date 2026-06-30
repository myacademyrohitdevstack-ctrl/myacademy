"use client";

import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";
import { useSendOtpMutation, useSignUpMutation, useVerifyOtpMutation } from "../mutations/AuthenticationMutations";
import { toast } from "sonner";
import Link from "next/link";

export default function SignUpPage() {

const [otpSent, setOtpSent] = useState(false);
const [otp, setOtp] = useState("");
const [timer, setTimer] = useState(0);
const [emailVerified,setEmailVerified]=useState(false)
const [formData, setFormData] = useState({
  name: "",
  academyName: "",
  email: "",
  password: "",
});
const [verificationToken, setVerificationToken] = useState("");
const resetForm = () => {
 setFormData({
  name: "",
  academyName: "",
  email: "",
  password: "",
});

  setOtp("");
  setOtpSent(false);
  setEmailVerified(false);
  setVerificationToken("");
  setTimer(0);
};
  const signUpMutation = useSignUpMutation(resetForm);
  const sendOtpMuatation=useSendOtpMutation(setOtpSent,setTimer)
  const verifyOtpMutation=useVerifyOtpMutation(setOtpSent,setEmailVerified,setVerificationToken)
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const emailRegex = /^\S+@\S+\.\S+$/;
  const nameRegex = /^[A-Za-z\s'-]{2,50}$/;
  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/;

  const validate = () => {
    if (!nameRegex.test(formData.name.trim())) {
      return "Enter a valid Name";
    }
    if (!emailRegex.test(formData.email.trim())) {
      return "Enter a valid Email";
    }
    if (!formData.academyName.trim()) {
  return "Enter Academy Name";
}
   if (!passwordRegex.test(formData.password)) {
  return "Password must contain uppercase, lowercase, number and special character.";
}

    return null;
  };

const isFormValid =
  formData.name.trim() &&
  formData.academyName.trim() &&
  formData.email.trim() &&
  formData.password;
const sendOpt=()=>{
   if (!emailRegex.test(formData.email.trim())) {
      toast.error("Enter a valid Email");
      return
    }
    sendOtpMuatation.mutate({email:formData.email.trim(),purpose:"register"})
  

}
const verifyOtp=()=>{
   if (!otp.trim() || otp.trim().length!==6) {
      toast.error("Enter a valid otp");
      return
    }
    verifyOtpMutation.mutate({email:formData.email.trim(),purpose:"register",otp})


}
useEffect(() => {
  if (!timer) return;

  const interval = setInterval(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer]);
  const handleSignUp = (e) => {
    e.preventDefault();

    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }

  const data = {
  fullName: formData.name.trim(),
  academyName: formData.academyName.trim(),
  email: formData.email.trim(),
  verificationToken,
  password: formData.password,
};

    signUpMutation.mutate(data);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white ">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,69,27,0.08),transparent_50%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-md items-center px-5 py-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          {/* Logo */}
         
{/* Header */}

<div className="text-center py-10">
  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D6451B]/10">
    <FaUser className="text-3xl text-[#D6451B]" />
  </div>

  <h1 className="mt-6 text-3xl font-bold text-slate-900">
    Register Your Academy
  </h1>

 
</div>
          {/* Form Card */}
          <div className="mt-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl">

         <div className="relative">
  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

  <input
    placeholder="Academy Name"
    name="academyName"
    value={formData.academyName}
    onChange={handleChange}
    className="w-full rounded-2xl border border-slate-200 py-3.5 pl-12 pr-4 outline-none focus:border-[#D6451B]"
  />
</div>

            {/* Inputs */}
            <div className="mt-6 space-y-4">

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  autoComplete="name"
                  id="signup-name"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 py-3.5 pl-12 pr-4 outline-none focus:border-[#D6451B]"
                />
              </div>

           <div className="relative">
  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

  <input
    
    name="email"
autoComplete="email"
id="signup-email"
value={formData.email}
disabled={emailVerified}
    onChange={handleChange}
    placeholder="Email Address"
    className="w-full rounded-2xl border border-slate-200 py-3.5 pl-12 pr-32 outline-none focus:border-[#D6451B]"
  />

  {!otpSent && !emailVerified && (
    <button
      type="button"
      onClick={sendOpt}
      className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 rounded-xl bg-[#D6451B] px-3 py-2 text-xs text-white hover:opacity-90"
    >
     {sendOtpMuatation.isPending?<FaSpinner className="text-white animate-spin"></FaSpinner>:"Send OTP"} 
    </button>
  )}
</div>
{otpSent && !emailVerified && (
  <div className="relative">
    <input
       value={otp}
  maxLength={6}
  inputMode="numeric"
  autoComplete="one-time-code"
  onChange={(e) =>
    setOtp(e.target.value.replace(/\D/g, ""))
  }
      placeholder="Enter OTP"
      className="w-full rounded-2xl border border-slate-200 py-3.5 px-4 outline-none focus:border-[#D6451B]"
    />
 
     
    <button
      type="button"
      onClick={verifyOtp}
      className="absolute cursor-pointer right-2 top-1/2 -translate-y-5/6 rounded-xl bg-[#D6451B] px-3 py-2 text-xs text-white hover:opacity-90"
    >
    {verifyOtpMutation.isPending?<FaSpinner className="text-white animate-spin"></FaSpinner>:"Verify OTP"} 
    </button>
  

  <div className="mt-3 flex items-center justify-between">
  <button
    type="button"
  onClick={() => {
  setOtpSent(false);
  setEmailVerified(false);
  setVerificationToken("");
  setOtp("");
}}
    className="text-xs font-medium text-[#D6451B] hover:underline"
  >
    Change Email
  </button>

  <button
    type="button"
    disabled={timer > 0 || sendOtpMuatation.isPending}
    onClick={sendOpt}
    className="text-xs font-medium text-[#D6451B] hover:underline disabled:text-gray-400 disabled:no-underline"
  >
    {sendOtpMuatation.isPending
      ? "Sending..."
      : timer > 0
      ? `Resend OTP (${timer}s)`
      : "Resend OTP"}
  </button>
</div>
  </div>
)}
{emailVerified && (
  <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-700">
    ✅ Email verified successfully
  </div>
)}
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  id="signup-password"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 py-3.5 pl-12 pr-4 outline-none focus:border-[#D6451B]"
                />
              </div>

         

            </div>

            {/* Submit */}
            <button  disabled={!emailVerified || !isFormValid || signUpMutation.isPending} onClick={handleSignUp} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D6451B] py-3.5 font-medium text-white hover:opacity-90 disabled:opacity-30 ">
              {signUpMutation.isPending?<FaSpinner className="text-white animate-spin"></FaSpinner>:"Create Account"}
              <FaArrowRight />
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google */}
            <button disabled className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 py-3.5 hover:bg-slate-50 disabled:opacity-20">
              <FaGoogle />
              Continue with Google
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?
            <Link href='/login' className="ml-2 font-medium text-[#D6451B] cursor-pointer">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}