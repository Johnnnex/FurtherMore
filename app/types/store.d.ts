import { IFrensResponseTypes, IUser as IUserApi } from "./api";

export interface IUser extends IUserApi {}
export interface IFrens extends IFrensResponseTypes {}

export interface IUserState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  deleteUser: () => void;
  updateUser: (updates: Partial<IUser>) => void;
  clearUser: () => void;
}

export interface IRewardState {
  points: number;
  startTime: number | null;
  timeSpent: number | null;
  achievements: string[];
  setPoints: (points: number) => void;
  setStartTime: (startTime: number | null) => void;
  setTimeSpent: (timeSpent: number | null) => void;
  addPoints: (amount: number) => void;
  setAchievements: (achievements: string[]) => void;
  addAchievement: (achievement: string) => void;
  clearRewards: () => void;
}

export interface IFrensState {
  frens: null | IFrens[];
  setFrens: (frens: IFrens[]) => void;
}
