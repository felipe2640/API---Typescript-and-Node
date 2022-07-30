export interface IUser {
  email: string;
  name?: string;
  password: string;
  token?: string;
}

export interface ILogin {
  email: string;
  password: string;
  token: string;
}
