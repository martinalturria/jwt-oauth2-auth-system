import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { HTTP_STATUS } from '../config/constants';
import logger from '../config/logger';
import { ApiResponse } from '../models/ApiResponse';

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
        const errorResponse = ApiResponse.error(
          'Username and password are required',
          'VALIDATION_ERROR',
          HTTP_STATUS.BAD_REQUEST
        );
        res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse);
        return;
      }

      const authResponse = await this.authService.login({ username, password });

      logger.info(`User ${username} logged in successfully`);

      const successResponse = ApiResponse.success(authResponse);
      res.status(HTTP_STATUS.OK).json(successResponse);
    } catch (error) {
      next(error);
    }
  };
}
