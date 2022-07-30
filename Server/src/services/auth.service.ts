import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import { IUser } from '../models/task.model';
import { prisma } from './prisma.service';
import { token } from 'morgan';
import { Cookie } from 'express-session';

export default class AuthService {
  public async create(req: Request, res: Response) {
    const { email, name, password: pass } = req.body as IUser;
    const jwtToken =
      '1ed4e67233e04a70f30bce6ffb2d2893c5d7942fdc0f21ef2305c9bbc37d3a057558a9';

    // Validate user input
    if (!(email && pass && name)) {
      res.status(400).send('All input is required');
    }
    try {
      //Encrypt user password
      bcrypt
        .hash(pass, 10)
        .then(async (hash) => {
          const token = sign({ user_id: name }, jwtToken);
          const user = { email, name, password: hash, token };
          await prisma.users.create({ data: user });
        })
        .then((user) => {
          res.cookie('jwt', user, {
            httpOnly: true,
            maxAge: 30 * 60 * 60 * 1000 // 3hrs in ms
          });
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
  public async login(req: Request, res: Response) {
    const jwtToken =
      '1ed4e67233e04a70f30bce6ffb2d2893c5d7942fdc0f21ef2305c9bbc37d3a057558a9';
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
            const token = sign({ id: userDB.id, email }, jwtToken, {
              expiresIn: maxAge // 3hrs in sec
            });
            res.cookie('jwt', token, {
              httpOnly: true,
              maxAge: maxAge * 1000 // 3hrs in ms
            });
            res.status(201).json({
              message: 'User successfully Logged in',
              user: userDB.id,
              Cookie: req.cookies.jwt
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
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }
}
