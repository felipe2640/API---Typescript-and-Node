import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

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
    const jwtToken =
      '1ed4e67233e04a70f30bce6ffb2d2893c5d7942fdc0f21ef2305c9bbc37d3a057558a9';

    try {
      const { email, name, password: pass } = req.body as IUser;

      // Validate user input
      if (!(email && pass && name)) {
        res.status(400).send('All input is required');
      }

      //Encrypt user password
      const password = await bcrypt.hash(pass, 10);

      const token = sign({ user_id: email }, jwtToken, {
        expiresIn: '2h'
      });

      const user = { email, name, password, token };
      await prisma.user.create({ data: user });
      const prismamsg = prisma.$use(async (params, next) => {
        return next(params);
      });
      res.json({ msg: prismamsg });
    } catch (err) {
      console.error(err);
    }
  }
}
