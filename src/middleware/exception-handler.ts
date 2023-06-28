import { NextFunction, Request, Response } from 'express';

export const ExceptionHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).json({ 'Something went wrong. Error message': err.message });
};
