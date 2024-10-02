export interface INextResponse<T> {
  code: number;
  message: string;
  data: T;
}
export interface IUserResponse {
  user: User;
  rewards: Rewards;
}

export interface IUser {
  u_id: number;
  username: string;
  firstname: string;
  type: string;
  is_bot: boolean;
  language_code: string;
  is_premium: boolean;
  is_new: boolean;
  u_ip: string;
  created_at: string;
}

export interface IRewards {
  user_id: number;
  created_at: string;
  time_spent: number;
}

export interface IFrensResponseTypes {
  users: IUser;
  created_at: string;
  ref_count: number;
  refree: number;
  user_id: number;
}

export interface IUser {
  u_id: number;
  username: string;
  firstname: string;
  type: string;
  is_bot: boolean;
  language_code: string;
  is_premium: boolean;
  is_new: boolean;
  u_ip: unknown;
  created_at: string;
}
