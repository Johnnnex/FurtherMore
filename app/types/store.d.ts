import { IUserResponse } from "./api";

export interface IUser extends IUserResponse {}

export interface IUserState {
  user: IUser | null;
  setUser: (user: TelegramUser | null) => void;
  deleteUser: () => void;
  updateUser: (updates: Partial<TelegramUser>) => void;
  clearUser: () => void;
}
