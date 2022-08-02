import { JwtPayload } from 'jsonwebtoken';
export interface IUser {
  email: string;
  name?: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
  token: string;
}

export interface SessionData {
  token: string;
}

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
