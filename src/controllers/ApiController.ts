import { Request, Response } from 'express';
import { HTTP_STATUS } from '../config/constants';

export class ApiController {
  getUserArea = (req: Request, res: Response): void => {
    res.status(HTTP_STATUS.OK).json({
      message: 'Welcome to user area',
      user: {
        name: req.user?.name,
        email: req.user?.email,
        role: req.user?.role,
      },
    });
  };

  getAdminArea = (req: Request, res: Response): void => {
    res.status(HTTP_STATUS.OK).json({
      message: 'Welcome to admin area',
      user: {
        name: req.user?.name,
        email: req.user?.email,
        role: req.user?.role,
      },
    });
  };
}
