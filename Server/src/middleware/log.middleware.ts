import { Request, Response } from 'express';

const myMiddleware = (req: Request, res: Response, next: any) => {
  return next();
};

export default myMiddleware;
