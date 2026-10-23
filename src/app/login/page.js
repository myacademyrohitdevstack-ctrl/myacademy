"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaSpinner,
  FaGraduationCap,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaKey,
  FaArrowLeft,
} from "react-icons/fa";
import { useLoginMutation, useVerify2FaMutation } from "../mutations/AuthenticationMutations";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // 2FA state
  const [twoFactorPending, setTwoFactorPending] = useState(false);
  const [twoFactorData, setTwoFactorData] = useState({ tempToken: "", email: "" });
  const [twoFactorOtp, setTwoFactorOtp] = useState("");

  const loginMutation = useLoginMutation();
  const verify2FaMutation = useVerify2FaMutation();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const emailRegex = /^\S+@\S+\.\S+$/;

  const validate = () => {
    if (!formData.email.trim()) {
      return "Email cannot be empty";
    }
    if (!emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address";
    }
    if (!formData.password) {
      return "Password cannot be empty";
    }
    if (formData.password.length < 8) {
      return "Password length must be at least 8 characters";
    }
    return null;
  };

  const isFormValid = formData.email.trim() && formData.password;

  const handleLogin = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    loginMutation.mutate(
      {
        email: formData.email.trim(),
        password: formData.password,
      },
      {
        onSuccess: (data) => {
          if (data?.twoFactorRequired) {
            setTwoFactorPending(true);
            setTwoFactorData({
              tempToken: data.tempToken,
              email: data.email || formData.email.trim(),
            });
          }
        },
      }
    );
  };

  const handleVerify2Fa = (e) => {
    e.preventDefault();
    if (!twoFactorOtp || twoFactorOtp.trim().length !== 6) {
      toast.error("Please enter the 6-digit verification code");
      return;
    }

    verify2FaMutation.mutate({
      tempToken: twoFactorData.tempToken,
      otp: twoFactorOtp.trim(),
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 pt-24 sm:pt-28 pb-12 px-3 sm:px-6">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-orange-100/50 via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto flex min-h-[calc(100vh-140px)] max-w-md items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full"
        >
          {/* Header & Academy Icon */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6451B] to-orange-500 text-white shadow-md shadow-orange-500/25 transition hover:scale-105"
            >
              {twoFactorPending ? <FaShieldAlt className="text-2xl" /> : <FaGraduationCap className="text-3xl" />}
            </Link>

            <h1 className="mt-5 text-2xl sm:text-3xl font-extrabold text-slate-900">
              {twoFactorPending ? "Two-Factor Verification" : "Welcome Back"}
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
              {twoFactorPending
                ? `Enter the 6-digit security code sent to ${twoFactorData.email}`
                : "Log in to access your academy batches, classes & resources."}
            </p>
          </div>

          {/* Form Card */}
          <div className="mt-5 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-7 shadow-lg">
            {!twoFactorPending ? (
              // Step 1: Email + Password
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="login-email"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="email"
                      name="email"
                      id="login-email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="student@example.com"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#D6451B] focus:bg-white focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="login-password"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Password
                    </label>
                    <Link
                      href="/forget-password"
                      className="text-xs font-semibold text-[#D6451B] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="login-password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
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
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || loginMutation.isPending}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D6451B] to-orange-500 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                  {loginMutation.isPending ? (
                    <FaSpinner className="animate-spin text-lg" />
                  ) : (
                    <>
                      <span>Sign In to Portal</span>
                      <FaArrowRight className="text-xs" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              // Step 2: 2FA OTP Challenge
              <form onSubmit={handleVerify2Fa} className="space-y-4">
                <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-3.5 text-center">
                  <p className="text-xs font-bold text-amber-800">
                    Administrative Account Protected by 2FA
                  </p>
                  <p className="mt-0.5 text-[11px] text-amber-700">
                    A 6-digit authentication code has been dispatched to your email address.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="two-factor-code"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    6-Digit Security Code
                  </label>
                  <div className="relative">
                    <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      id="two-factor-code"
                      value={twoFactorOtp}
                      onChange={(e) => setTwoFactorOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="123456"
                      autoFocus
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-4 text-center text-lg font-extrabold tracking-widest text-slate-900 outline-none transition focus:border-[#D6451B] focus:bg-white focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={twoFactorOtp.length !== 6 || verify2FaMutation.isPending}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D6451B] to-orange-500 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                  {verify2FaMutation.isPending ? (
                    <FaSpinner className="animate-spin text-lg" />
                  ) : (
                    <>
                      <span>Verify & Authenticate</span>
                      <FaArrowRight className="text-xs" />
                    </>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setTwoFactorPending(false);
                      setTwoFactorOtp("");
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
                  >
                    <FaArrowLeft className="text-[10px]" />
                    <span>Back to Credentials</span>
                  </button>
                </div>
              </form>
            )}

            {/* Portal Role Guide Helper */}
            {!twoFactorPending && (
              <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50/50 p-3.5 text-center">
                <p className="text-[11px] font-semibold text-slate-600">
                  Are you a Student, Trainer, or Administrator?
                </p>
                <p className="mt-0.5 text-[11px] text-[#D6451B]">
                  Your account will automatically navigate to your authorized dashboard.
                </p>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          {!twoFactorPending && (
            <div className="mt-6 text-center text-xs text-slate-500">
              <span>Looking to launch an academy?</span>
              <Link
                href="/signup"
                className="ml-1.5 font-bold text-[#D6451B] hover:underline"
              >
                Register Academy
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
