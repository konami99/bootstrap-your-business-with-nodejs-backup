import { Request, Response, NextFunction } from 'express';

export default function(req: Request, res: Response, next: NextFunction) {
  // console.log('authentication middleware!');
  throw new Error('error from middleware');
  next();
};