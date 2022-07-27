import { prisma } from './prisma.service';
import { IUser } from '../models/task.model';
import { Request, Response } from 'express';
import { Session } from 'express-session';

export type SessionWithUser = Session & { user: string | {} };

export type AuthRequest = Request & {
  session?: SessionWithUser;
  auth?: { user: string; permission_id: number };
};

export default class LoginAuth {
  public async Users(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    const iUser = req.body! as IUser;

    const user = users.find((user) => user.email === iUser.email);
    if (!user) {
      const status = 401;
      const message = 'Incorrect email or password';
      res.status(status).json({ status, message });
    } else {
    }
  }
}
