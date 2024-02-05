import { create } from "zustand";

interface useEditProfileStore {
  status: boolean;
  open: () => void;
  close: () => void;
}

export const useEditProfile = create<useEditProfileStore>((set) => ({
  status: false,
  open: () => set({ status: true }),
  close: () => set({ status: false }),
}));
