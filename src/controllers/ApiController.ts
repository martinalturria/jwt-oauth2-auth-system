import { Request, Response } from 'express';
import { HTTP_STATUS } from '../config/constants';
import '../types/express';

export class ApiController {
  getUserArea = (req: Request, res: Response): void => {
    const user = req.user as any;
    res.status(HTTP_STATUS.OK).json({
      message: 'Welcome to user area',
      user: {
        name: user?.name,
        email: user?.email,
        role: user?.role,
      },
    });
  };

  getAdminArea = (req: Request, res: Response): void => {
    const user = req.user as any;
    res.status(HTTP_STATUS.OK).json({
      message: 'Welcome to admin area',
      user: {
        name: user?.name,
        email: user?.email,
        role: user?.role,
      },
    });
  };
}
