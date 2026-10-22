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
} from "react-icons/fa";
import {
  useSendOtpMutation,
  useSignUpMutation,
  useVerifyOtpMutation,
} from "../mutations/AuthenticationMutations";
import { toast } from "sonner";
import Link from "next/link";

export default function SignUpPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    academyName: "MyAcademy",
    email: "",
    password: "",
  });
  const [verificationToken, setVerificationToken] = useState("");

  const resetForm = () => {
    setFormData({
      name: "",
      academyName: "MyAcademy",
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
  const nameRegex = /^[A-Za-z\s'-]{2,50}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/;

  const validate = () => {
    if (!nameRegex.test(formData.name.trim())) {
      return "Please enter a valid full name";
    }
    if (!emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address";
    }
    if (!formData.academyName.trim()) {
      return "Academy Name is required";
    }
    if (!passwordRegex.test(formData.password)) {
      return "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
    }
    return null;
  };

  const isFormValid =
    formData.name.trim() &&
    formData.academyName.trim() &&
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

    signUpMutation.mutate(data);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 pt-20 pb-12 px-3 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-orange-100/50 via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto flex min-h-[calc(100vh-140px)] max-w-md items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full"
        >
          {/* Header */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6451B] to-orange-500 text-white shadow-md shadow-orange-500/25 transition hover:scale-105"
            >
              <FaGraduationCap className="text-3xl" />
            </Link>

            <h1 className="mt-5 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Enroll in Academy
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
              Create your account to access batches, live classes & learning paths.
            </p>
          </div>

          {/* Form Card */}
          <div className="mt-5 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-7 shadow-lg">
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    id="signup-name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="E.g. Navjot Singh"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#D6451B] focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Email Address + Send OTP */}
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    disabled={emailVerified}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-28 text-sm text-slate-900 outline-none transition focus:border-[#D6451B] focus:bg-white focus:ring-2 focus:ring-orange-100 disabled:bg-slate-100 disabled:text-slate-500"
                  />

                  {!otpSent && !emailVerified && (
                    <button
                      type="button"
                      onClick={sendOpt}
                      disabled={sendOtpMuatation.isPending || !formData.email}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-[#D6451B] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-orange-700 disabled:opacity-40"
                    >
                      {sendOtpMuatation.isPending ? (
                        <FaSpinner className="animate-spin text-sm" />
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* OTP Input Card */}
              {otpSent && !emailVerified && (
                <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Enter 6-Digit Verification Code:</span>
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
                      placeholder="Enter 6-digit OTP"
                      className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-28 text-center text-sm font-bold tracking-widest text-slate-900 outline-none focus:border-[#D6451B]"
                    />

                    <button
                      type="button"
                      onClick={verifyOtp}
                      disabled={verifyOtpMutation.isPending || otp.length !== 6}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:opacity-40"
                    >
                      {verifyOtpMutation.isPending ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setEmailVerified(false);
                        setVerificationToken("");
                        setOtp("");
                      }}
                      className="font-semibold text-[#D6451B] hover:underline"
                    >
                      Change Email
                    </button>

                    <button
                      type="button"
                      disabled={timer > 0 || sendOtpMuatation.isPending}
                      onClick={sendOpt}
                      className="font-semibold text-slate-600 hover:text-[#D6451B] disabled:text-slate-400"
                    >
                      {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                    </button>
                  </div>
                </div>
              )}

              {/* Verified Badge */}
              {emailVerified && (
                <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-700">
                  <FaCheckCircle className="text-emerald-600 text-sm shrink-0" />
                  <span>Email verified successfully</span>
                </div>
              )}

              {/* Password */}
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Create Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="signup-password"
                    name="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 8 chars, 1 uppercase, 1 symbol"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-11 text-sm text-slate-900 outline-none transition focus:border-[#D6451B] focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Must include uppercase, lowercase, number & special character.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  !emailVerified || !isFormValid || signUpMutation.isPending
                }
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D6451B] to-orange-500 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {signUpMutation.isPending ? (
                  <FaSpinner className="animate-spin text-lg" />
                ) : (
                  <>
                    <span>Complete Enrollment</span>
                    <FaArrowRight className="text-xs" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Navigation */}
          <div className="mt-6 text-center text-xs text-slate-500">
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
