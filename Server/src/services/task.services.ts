import { Request, Response } from 'express';

import { prisma } from './prisma.service';

export default class TaskService {
  public Inicial(req: Request, res: Response) {
    const routes = req.cookies;

    return res.json({ msg: routes });
  }

  public async Users(req: Request, res: Response) {
    const users = await prisma.users.findMany();
    res.json({ msg: users });
  }
}
