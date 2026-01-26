import { Request, Response, NextFunction } from 'express';
import { APP_CONSTANTS } from '../../../shared/constants';

export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.header(APP_CONSTANTS.HTTP.HEADERS.ACCESS_CONTROL_ALLOW_ORIGIN, '*');
  res.header(APP_CONSTANTS.HTTP.HEADERS.ACCESS_CONTROL_ALLOW_METHODS, APP_CONSTANTS.HTTP.METHODS.ALLOWED);
  res.header(APP_CONSTANTS.HTTP.HEADERS.ACCESS_CONTROL_ALLOW_HEADERS, 'Content-Type, Authorization');
  if (req.method === APP_CONSTANTS.HTTP.METHODS.OPTIONS) {
    res.sendStatus(200);
  } else {
    next();
  }
};
