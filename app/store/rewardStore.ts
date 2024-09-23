import { create } from "zustand";
import { IRewardState } from "@/types/store";

const useRewardStore = create<IRewardState>((set) => ({
  points: 0,
  startTime: null,
  timeSpent: null,
  achievements: [],
  setTimeSpent: (timeSpent) => set({ timeSpent }),
  setStartTime: (startTime) => set({ startTime }),
  setPoints: (points) => set({ points }),
  addPoints: (amount) => set((state) => ({ points: state.points + amount })),
  setAchievements: (achievements) => set({ achievements }),
  addAchievement: (achievement) =>
    set((state) => ({
      achievements: [...state.achievements, achievement],
    })),
  clearRewards: () => set({ points: 0, achievements: [] }),
}));

export default useRewardStore;
