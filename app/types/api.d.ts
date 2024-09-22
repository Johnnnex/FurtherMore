export interface INextResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface IUserResponse {
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
