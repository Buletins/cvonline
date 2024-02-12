import { create } from "zustand";

interface useTabStore {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useTab = create<useTabStore>((set) => ({
  activeTab: "Algemeen",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
