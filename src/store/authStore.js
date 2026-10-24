import { create } from "zustand";
import queryClient from "@/lib/queryClient";

const normalizeUser = (user) => {
  if (!user) return null;
  const id = user._id || user.id;
  return {
    ...user,
    _id: id,
    id: id,
  };
};

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isInitialized: false,
  profile: null,

  login: ({ user, accessToken }) => {
    // Clear any cached queries from a prior session/account
    try {
      queryClient.clear();
    } catch (e) {
      // ignore in non-browser env
    }
    set({
      user: normalizeUser(user),
      accessToken,
      isAuthenticated: true,
      isInitialized: true,
      profile: null,
    });
  },

  setAccessToken: (accessToken) =>
    set({
      accessToken,
      isAuthenticated: !!accessToken,
    }),

  setUser: (user) =>
    set({
      user: normalizeUser(user),
    }),

  setProfile: (profile) =>
    set({
      profile,
    }),

  setInitialized: () =>
    set({
      isInitialized: true,
    }),

  logout: () => {
    // Clear all TanStack query and mutation caches on logout
    try {
      queryClient.clear();
    } catch (e) {
      // ignore in non-browser env
    }
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isInitialized: true,
      profile: null,
    });
  },
}));

export default useAuthStore;
