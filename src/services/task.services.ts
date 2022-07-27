import { Request, Response } from 'express';

import { IUser } from '../models/task.model';
import { prisma } from './prisma.service';

export default class TaskService {
  public Inicial(req: Request, res: Response) {
    const routes = res.app._router;
    //.filter((r: any) => r.route);
    // .map((r: any) => r.route.path); // get all the paths

    return res.json({ msg: routes });
  }

  public async Users(req: Request, res: Response) {
    const connect = await prisma.user.findMany();
    return res.json({ msg: connect });
  }

  public async create(req: Request, res: Response) {
    const iUser = req.body as IUser;
    const user = await prisma.user.create({ data: iUser });

    return res.json({ user });
  }
}
