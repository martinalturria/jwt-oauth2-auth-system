import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/User';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';
import logger from '../config/logger';

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      logger.warn('Authorization failed: No user in request');
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        error: ERROR_MESSAGES.AUTH.INVALID_TOKEN,
      });
      return;
    }

    const hasRole = allowedRoles.includes(req.user.role);

    if (!hasRole) {
      logger.warn(`Authorization failed: User role ${req.user.role} not allowed`);
      res.status(HTTP_STATUS.FORBIDDEN).json({
        error: ERROR_MESSAGES.AUTH.FORBIDDEN,
      });
      return;
    }

    next();
  };
};
