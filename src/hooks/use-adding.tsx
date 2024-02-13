import { create } from "zustand";

interface useAddingStore {
  status: boolean;
  open: () => void;
  close: () => void;
}

export const useAdding = create<useAddingStore>((set) => ({
  status: false,
  open: () => set({ status: true }),
  close: () => set({ status: false }),
}));
