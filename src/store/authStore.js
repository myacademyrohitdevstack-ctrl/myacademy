import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import queryClient from "@/lib/queryClient";

const normalizeUser = (user) => {
  if (!user) return null;
  const id = user._id || user.id;
  return {
    ...user,
    _id: id,
    id: id,
    permissions: Array.isArray(user.permissions) ? user.permissions : [],
    staffTitle: user.staffTitle || "",
  };
};

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isInitialized: false,
      profile: null,

      login: ({ user, accessToken }) => {
        try {
          queryClient.clear();
        } catch (e) {}
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
        try {
          queryClient.clear();
        } catch (e) {}
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isInitialized: true,
          profile: null,
        });
      },
    }),
    {
      name: "inquisitive-auth-storage",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : null)),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
