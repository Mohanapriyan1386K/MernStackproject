
export type LoginPayload = {
  email: string;
  password: string;
};

export type CreateUserPayload = {
  name: string;
  user_name: string;
  email: string;
  password: string;
  page?:number
  size?:number
};