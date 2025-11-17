import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { HTTP_STATUS } from '../config/constants';
import logger from '../config/logger';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          error: 'Username and password are required',
        });
        return;
      }

      const authResponse = await this.authService.login({ username, password });

      logger.info(`User ${username} logged in successfully`);

      res.status(HTTP_STATUS.OK).json(authResponse);
    } catch (error) {
      next(error);
    }
  };
}
