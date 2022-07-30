import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const adminAuth = (req: Request, res: Response, next: any) => {
  const token = req.cookies.jwt;
  const jwtToken =
    '1ed4e67233e04a70f30bce6ffb2d2893c5d7942fdc0f21ef2305c9bbc37d3a057558a9';
  if (token) {
    verify(token, jwtToken, (err: any, decodedToken: any) => {
      if (err) {
        return res.status(401).json({ message: 'Not authorized' });
      } else {
        if (decodedToken.name !== 'Test') {
          return res.status(401).json({ message: 'Not authorized' });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: 'Not authorized, token not available' });
  }
};

export default adminAuth;
