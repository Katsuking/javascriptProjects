import { AuthenticationError } from '../errors/AuthenticationError';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

// error を扱うmiddlewareでは 4つ引数渡す
export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // error handling logic here
  if (error instanceof AuthenticationError) {
    return res.status(403).json({ message: 'authentication error' });
  }
  console.log(error.name, error.message);
};

export default errorHandler;
