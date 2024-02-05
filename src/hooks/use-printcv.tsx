import { create } from "zustand";

interface usePrintCvStore {
  status: boolean;
  open: () => void;
  close: () => void;
}

export const usePrintCv = create<usePrintCvStore>((set) => ({
  status: false,
  open: () => set({ status: true }),
  close: () => set({ status: false }),
}));
