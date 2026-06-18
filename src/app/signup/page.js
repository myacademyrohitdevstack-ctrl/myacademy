"use client";

import { useState } from "react";
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

export default function SignUpPage() {
  const [role, setRole] = useState("student");
const [otpSent, setOtpSent] = useState(false);
const [otp, setOtp] = useState("");
const [emailVerified,setEmailVerified]=useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const signUpMutation = useSignUpMutation();
  const sendOtpMuatation=useSendOtpMutation(setOtpSent)
  const verifyOtpMutation=useVerifyOtpMutation(setOtpSent,setEmailVerified)
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const emailRegex = /^\S+@\S+\.\S+$/;
  const nameRegex = /^[A-Za-z\s'-]{2,50}$/;

  const validate = () => {
    if (!nameRegex.test(formData.name.trim())) {
      return "Enter a valid Name";
    }
    if (!emailRegex.test(formData.email.trim())) {
      return "Enter a valid Email";
    }
    if (formData.password.length < 8) {
      return "Password Length must be more than 8";
    }

    return null;
  };

  const isFormValid =
    formData.name.trim() &&
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
  const handleSignUp = (e) => {
    e.preventDefault();

    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }

    const data = {
      fullName: formData.name.trim(),
      email: formData.email.trim(),
      role,
      verificationToken:localStorage.getItem("verificationToken"),
      password: formData.password,
    };

    signUpMutation.mutate(data);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white py-20">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,69,27,0.08),transparent_50%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-md items-center px-5 py-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          {/* Logo */}
          <div className="text-center">
            <img
              src="/icon1.png"
              alt="IMA"
              className="mx-auto h-16 w-16 object-contain"
            />

            <h1 className="mt-6 text-3xl font-bold text-slate-900">
              Create Account
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Join thousands of learners improving communication skills worldwide.
            </p>
          </div>

          {/* Form Card */}
          <div className="mt-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl">

            {/* Role */}
            <div>
              <p className="mb-3 text-sm font-medium text-slate-700">
                Register As
              </p>

              <div className="flex rounded-2xl bg-slate-100 p-1">
                <button
                  onClick={() => setRole("student")}
                  type="button"
                  className={`flex-1 rounded-xl py-3 text-sm font-medium transition ${
                    role === "student"
                      ? "bg-white shadow text-[#D6451B]"
                      : "text-slate-500"
                  }`}
                >
                  🎓 Student
                </button>

                <button
                  onClick={() => setRole("teacher")}
                  type="button"
                  className={`flex-1 rounded-xl py-3 text-sm font-medium transition ${
                    role === "teacher"
                      ? "bg-white shadow text-[#D6451B]"
                      : "text-slate-500"
                  }`}
                >
                  👨‍🏫 Teacher
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="mt-6 space-y-4">

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  placeholder="Full Name"
                  name="name"
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
{otpSent && (
  <div className="relative">
    <input
      onChange={(e) => setOtp(e.target.value)}
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
  

    <button
      type="button"
      className="mt-2 text-xs font-medium text-[#D6451B] hover:underline"
      onClick={() => setOtpSent(false)}
    >
      Change Email
    </button>
  </div>
)}

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="signup-password"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 py-3.5 pl-12 pr-4 outline-none focus:border-[#D6451B]"
                />
              </div>

              {role === "teacher" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4"
                >
                  <input
                    placeholder="Specialization"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-[#D6451B]"
                  />

                  <input
                    placeholder="Years of Experience"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-[#D6451B]"
                  />
                </motion.div>
              )}

            </div>

            {/* Submit */}
            <button  disabled={!isFormValid || signUpMutation.isPending} onClick={handleSignUp} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D6451B] py-3.5 font-medium text-white hover:opacity-90 disabled:opacity-30 ">
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
            <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 py-3.5 hover:bg-slate-50">
              <FaGoogle />
              Continue with Google
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?
            <span className="ml-2 font-medium text-[#D6451B] cursor-pointer">
              Login
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}