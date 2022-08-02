import { Request, Response } from 'express';

import { prisma } from './prisma.service';

export default class TaskService {
  public async Inicial(req: Request, res: Response) {
    const routes = req.app._router;

    return res.json({ msg: routes });
  }
}
