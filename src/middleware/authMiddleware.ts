import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';
import { JwtPayload } from '../models/User';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';
import logger from '../config/logger';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn('Authentication failed: No token provided');
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: ERROR_MESSAGES.AUTH.MISSING_TOKEN,
    });
    return;
  }

  const token = authHeader.substring(7);

  const decoded = verifyToken(token);

  if (!decoded) {
    logger.warn('Authentication failed: Invalid token');
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: ERROR_MESSAGES.AUTH.INVALID_TOKEN,
    });
    return;
  }

  req.user = decoded;
  next();
};
