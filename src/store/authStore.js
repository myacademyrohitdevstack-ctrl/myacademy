import { create } from "zustand";

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

  login: ({ user, accessToken }) =>
    set({
      user: normalizeUser(user),
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
