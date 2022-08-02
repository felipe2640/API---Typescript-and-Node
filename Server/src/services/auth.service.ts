import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

import session from 'express-session';

import { IUser } from '../models/task.model';
import { prisma } from './prisma.service';

export default class AuthService {
  public async create(req: Request, res: Response) {
    const { email, name, password } = req.body as IUser;
    // Validate user input
    if (!(email && password && name)) {
      res.status(400).send('All input is required');
    }
    try {
      //Encrypt user password
      bcrypt
        .hash(password, 10)
        .then(async (hash) => {
          // const token = sign({ id: name, email }, process.env.TOKEN_KEY!);
          const user = { email, name, password: hash };
          await prisma.users.create({ data: user });
        })
        .then((user) => {
          // res.cookie('jwt', user, {
          //   httpOnly: true,
          //   maxAge: 30 * 60 * 60 * 1000 // 3hrs in ms
          // });
          res.status(201).json({
            message: 'User successfully created',
            user: user
          });
        })
        .catch((error) =>
          res.status(400).json({
            message: 'User not successful created',
            error: error.message
          })
        );
    } catch (error) {
      res.status(400).json({
        message: 'An error occurred',
        error: error
      });
    }
  }
  public async login(req: Request, res: Response, next: any) {
    const { email, password: pass } = req.body;

    // Validate user input
    if (!(email && pass)) {
      res.status(400).send('All input is required');
    }

    try {
      const userDB: any = await prisma.users.findUnique({ where: { email } });
      if (!userDB) {
        res.status(400).json({
          message: 'Login not successful',
          error: 'User not found'
        });
      } else {
        bcrypt.compare(pass, userDB.password).then(function (result) {
          if (result) {
            const maxAge = 3 * 60 * 60;
            const token = sign(
              { id: userDB.name, email },
              process.env.TOKEN_KEY!,
              {
                expiresIn: maxAge // 3hrs in sec
              }
            );
            res.status(201).json({
              message: 'User successfully Logged in',
              user: { userDB },
              token: token
            });
          } else {
            res.status(400).json({ message: 'Login not successful' });
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
  public async Logout(req: Request, res: Response) {
    res.header('jwt' + '');
  }

  public async Users(req: Request, res: Response) {
    const users = await prisma.users.findMany();
    res.json({ msg: users });
  }
}
