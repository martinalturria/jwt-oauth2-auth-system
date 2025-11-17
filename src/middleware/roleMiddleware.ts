import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/User';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';
import logger from '../config/logger';
import '../types/express';

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as any;

    if (!user) {
      logger.warn('Authorization failed: No user in request');
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        error: ERROR_MESSAGES.AUTH.INVALID_TOKEN,
      });
      return;
    }

    const hasRole = allowedRoles.includes(user.role);

    if (!hasRole) {
      logger.warn(`Authorization failed: User role ${user.role} not allowed`);
      res.status(HTTP_STATUS.FORBIDDEN).json({
        error: ERROR_MESSAGES.AUTH.FORBIDDEN,
      });
      return;
    }

    next();
  };
};
