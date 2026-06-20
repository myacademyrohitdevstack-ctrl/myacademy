import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  profile:null,

  login: ({ user, accessToken }) =>
    set({
      user,
      accessToken,
      isAuthenticated: true,
       profile:null,
    }),
   
  setAccessToken: (accessToken) =>
    set({ accessToken }),
  setProfile: (profile) =>
    set({ profile }),
  setUser: (user) =>
    set({ user }),
 
  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      profile:null,
    }),
}));

export default useAuthStore;