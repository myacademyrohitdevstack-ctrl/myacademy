import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  loginApi,
  verify2FaApi,
  logoutApi,
  sendOtp,
  signUpApi,
  resetPasswordApi,
  updatePasswordApi,
  verifyOtp,
} from '../api/AuthApi';
import { useRouter } from 'next/navigation';
import handleError from '@/Utils/handleError';
import useAuthStore from '@/store/authStore';
import queryClient from '@/lib/queryClient';

export const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await loginApi(data);
      return response.data;
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: (data) => {
      // If 2FA is required for administrative account, component will switch to 2FA view
      if (data.twoFactorRequired) {
        toast.info(data.message || "Please enter the 6-digit code sent to your email.");
        return;
      }

      queryClient.clear();
      login({ user: data.user, accessToken: data.accessToken });
      toast.success("Logged in successfully");

      if (data.user?.platformRole === "super_admin" || data.user?.role === "super_admin") {
        router.replace('/super-admin/dashboard');
      } else if (data.user?.role === "parent") {
        router.replace('/parent-panel/dashboard');
      } else if (data.user?.role === "student") {
        router.replace('/student-profile/profile');
      } else if (data.user?.role === "admin") {
        router.replace('/admin-panel/student');
      } else if (data.user?.role === "teacher") {
        router.replace('/teacher-panel/dashboard');
      }
    },
  });
};

export const useVerify2FaMutation = () => {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await verify2FaApi(data);
      return response.data;
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: (data) => {
      login({ user: data.user, accessToken: data.accessToken });
      toast.success("Two-factor authentication verified successfully");

      if (data.user?.platformRole === "super_admin" || data.user?.role === "super_admin") {
        router.replace('/super-admin/dashboard');
      } else if (data.user?.role === "admin") {
        router.replace('/admin-panel/student');
      } else {
        router.replace('/');
      }
    },
  });
};

export const useSendOtpMutation = (setOtpSent, setTimer) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await sendOtp(data);
      return response.data;
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: (data) => {
      setTimer(data.resendAfter);
      toast.success("OTP sent successfully");
      setOtpSent(true);
    },
  });
};

export const useVerifyOtpMutation = (setOtpSent, setEmailVerified, setVerificationToken) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await verifyOtp(data);
      return response.data;
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: (data) => {
      setVerificationToken(data.verificationToken);
      toast.success("OTP verified successfully");
      setOtpSent(false);
      setEmailVerified(true);
    },
  });
};

export const useSignUpMutation = (resetForm) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      return await signUpApi(data);
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: () => {
      toast.success("Your account was created successfully");
      resetForm();
      router.push('/login');
    },
  });
};

export const useLogoutMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const response = await logoutApi();
      return response.data;
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: () => {
      queryClient.clear();
      useAuthStore.getState().logout();
      router.replace('/');
      toast.info("You have been logged out successfully");
    },
  });
};

export const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      // If verificationToken is provided (forgot password flow), use resetPasswordApi
      if (data.verificationToken) {
        return await resetPasswordApi(data);
      }
      return await updatePasswordApi(data);
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: () => {
      toast.success("Your password was updated successfully");
    },
  });
};
