import { create } from "zustand";

export const useDemoModalStore = create((set) => ({
  isOpen: false,
  presetData: null,
  openModal: (preset = null) => set({ isOpen: true, presetData: preset }),
  closeModal: () => set({ isOpen: false, presetData: null }),
}));

export default useDemoModalStore;
