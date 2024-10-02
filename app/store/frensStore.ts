import { IFrensState } from "@/types/store";
import { create } from "zustand";

const useFrensStore = create<IFrensState>((set) => ({
  frens: null,
  setFrens: (frens) => set({ frens }),
}));

export default useFrensStore;
