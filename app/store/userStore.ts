import { create } from "zustand";
import { IUserState } from "@/types/store";

const useUserStore = create<IUserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  deleteUser: () => set({ user: null }),
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
