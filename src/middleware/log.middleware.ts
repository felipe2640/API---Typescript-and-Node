import { Request, Response } from 'express';
import { prisma } from '../services/prisma.service';

const myMiddleware = (req: Request, res: Response, next: any) => {
  res.status;

  next();
};

export default myMiddleware;
