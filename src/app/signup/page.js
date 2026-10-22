"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaSpinner,
  FaGraduationCap,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaSchool,
} from "react-icons/fa";
import {
  useSendOtpMutation,
  useSignUpMutation,
  useVerifyOtpMutation,
} from "../mutations/AuthenticationMutations";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
  const sendOtpMuatation = useSendOtpMutation(setOtpSent, setTimer);
  const verifyOtpMutation = useVerifyOtpMutation(
    setOtpSent,
    setEmailVerified,
    setVerificationToken
  );

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const emailRegex = /^\S+@\S+\.\S+$/;
  const nameRegex = /^[A-Za-z\s'.-]{2,60}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/;

  const validate = () => {
    if (!formData.academyName.trim() || formData.academyName.trim().length < 2) {
      return "Please enter your Academy or Institute name";
    }
    if (!nameRegex.test(formData.name.trim())) {
      return "Please enter your full name";
    }
    if (!emailRegex.test(formData.email.trim())) {
      return "Please enter a valid work email address";
    }
    if (!passwordRegex.test(formData.password)) {
      return "Password must be at least 8 characters with uppercase, number & symbol";
    }
    return null;
  };

  const isFormValid =
    formData.name.trim().length >= 2 &&
    formData.academyName.trim().length >= 2 &&
    formData.email.trim() &&
    formData.password;

  const sendOpt = () => {
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }
    sendOtpMuatation.mutate({
      email: formData.email.trim(),
      purpose: "register",
    });
  };

  const verifyOtp = () => {
    if (!otp.trim() || otp.trim().length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    verifyOtpMutation.mutate({
      email: formData.email.trim(),
      purpose: "register",
      otp,
    });
  };

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
    if (!emailVerified) {
      toast.error("Please verify your email via OTP first");
      return;
    }

    const data = {
      fullName: formData.name.trim(),
      academyName: formData.academyName.trim(),
      email: formData.email.trim(),
      verificationToken,
      password: formData.password,
    };

    signUpMutation.mutate(data, {
      onSuccess: () => {
        router.push("/signup/pending");
      },
    });
  };

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-slate-50 pt-24 sm:pt-28 pb-10 px-3 sm:px-6">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-orange-100/50 via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto flex max-w-md flex-col items-center justify-start">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {/* Header - Compact & Mobile-First */}
          <div className="text-center mb-3 sm:mb-4">
            <Link
              href="/"
              className="inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6451B] to-orange-500 text-white shadow-md shadow-orange-500/20 transition hover:scale-105"
            >
              <FaGraduationCap className="text-2xl" />
            </Link>

            <h1 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Register Your Academy
            </h1>
            <p className="mt-0.5 text-xs text-slate-500 max-w-xs mx-auto">
              Launch your academy portal in under 2 minutes
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-md">
            <form onSubmit={handleSignUp} className="space-y-3 sm:space-y-3.5">
              {/* 1. Academy Name */}
              <div>
                <label
                  htmlFor="signup-academy"
                  className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Academy Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FaSchool className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    id="signup-academy"
                    name="academyName"
                    autoComplete="organization"
                    required
                    value={formData.academyName}
                    onChange={handleChange}
                    placeholder="e.g. Apex Learning Academy"
                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 py-2.5 sm:py-3 pl-10 pr-3 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition focus:border-[#D6451B] focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* 2. Admin Name */}
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    id="signup-name"
                    name="name"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 py-2.5 sm:py-3 pl-10 pr-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-[#D6451B] focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* 3. Email Address + Send OTP */}
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Work Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    disabled={emailVerified}
                    onChange={handleChange}
                    placeholder="admin@academy.com"
                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 py-2.5 sm:py-3 pl-10 pr-24 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-[#D6451B] focus:bg-white focus:ring-2 focus:ring-orange-100 disabled:bg-slate-100 disabled:text-slate-500"
                  />

                  {!otpSent && !emailVerified && (
                    <button
                      type="button"
                      onClick={sendOpt}
                      disabled={sendOtpMuatation.isPending || !formData.email}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-[#D6451B] px-3 py-1.5 text-[11px] font-bold text-white shadow-2xs transition hover:bg-orange-700 disabled:opacity-40 cursor-pointer"
                    >
                      {sendOtpMuatation.isPending ? (
                        <FaSpinner className="animate-spin text-xs" />
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* OTP Input Card */}
              {otpSent && !emailVerified && (
                <div className="rounded-xl border border-orange-200 bg-orange-50/70 p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                    <span>Enter 6-Digit Code:</span>
                    {timer > 0 && (
                      <span className="text-[#D6451B] font-bold">
                        Resend in {timer}s
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      value={otp}
                      maxLength={6}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="• • • • • •"
                      className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-24 text-center text-sm font-bold tracking-widest text-slate-900 outline-none focus:border-[#D6451B]"
                    />

                    <button
                      type="button"
                      onClick={verifyOtp}
                      disabled={verifyOtpMutation.isPending || otp.length !== 6}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-emerald-600 px-3 py-1 text-[11px] font-bold text-white transition hover:bg-emerald-700 disabled:opacity-40 cursor-pointer"
                    >
                      {verifyOtpMutation.isPending ? (
                        <FaSpinner className="animate-spin text-xs" />
                      ) : (
                        "Verify"
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setEmailVerified(false);
                        setVerificationToken("");
                        setOtp("");
                      }}
                      className="font-semibold text-[#D6451B] hover:underline cursor-pointer"
                    >
                      Change Email
                    </button>

                    <button
                      type="button"
                      disabled={timer > 0 || sendOtpMuatation.isPending}
                      onClick={sendOpt}
                      className="font-semibold text-slate-600 hover:text-[#D6451B] disabled:text-slate-400 cursor-pointer"
                    >
                      {timer > 0 ? `${timer}s remaining` : "Resend OTP"}
                    </button>
                  </div>
                </div>
              )}

              {/* Verified Badge */}
              {emailVerified && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-bold text-emerald-700">
                  <FaCheckCircle className="text-emerald-600 text-xs shrink-0" />
                  <span>Email verified successfully</span>
                </div>
              )}

              {/* 4. Password */}
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="signup-password"
                    name="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 8 chars (e.g. Pass@123)"
                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 py-2.5 sm:py-3 pl-10 pr-10 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-[#D6451B] focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                  </button>
                </div>
                <p className="mt-1 text-[10px] text-slate-400">
                  Must include uppercase, lowercase, number & symbol.
                </p>
              </div>

              {/* Submit Button - Compact Single Line */}
              <button
                type="submit"
                disabled={
                  !emailVerified || !isFormValid || signUpMutation.isPending
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#D6451B] to-orange-500 py-3 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-orange-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
              >
                {signUpMutation.isPending ? (
                  <FaSpinner className="animate-spin text-base" />
                ) : (
                  <>
                    <span>Register Academy</span>
                    <FaArrowRight className="text-xs" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Navigation */}
          <div className="mt-4 text-center text-xs text-slate-500">
            <span>Already have an account?</span>
            <Link
              href="/login"
              className="ml-1.5 font-bold text-[#D6451B] hover:underline"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
