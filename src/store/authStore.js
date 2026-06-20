import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isInitialized: false,
  profile: null,

  login: ({ user, accessToken }) =>
    set({
      user,
      accessToken,
      isAuthenticated: true,
      isInitialized: true,
      profile: null,
    }),

  setAccessToken: (accessToken) =>
    set({
      accessToken,
      isAuthenticated: !!accessToken,
    }),

  setUser: (user) =>
    set({
      user,
    }),

  setProfile: (profile) =>
    set({
      profile,
    }),

  setInitialized: () =>
    set({
      isInitialized: true,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isInitialized: true,
      profile: null,
    }),
}));

export default useAuthStore;