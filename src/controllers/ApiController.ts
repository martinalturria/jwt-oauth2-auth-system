import { Request, Response } from 'express';
import { HTTP_STATUS } from '../config/constants';
import { ApiResponse } from '../models/ApiResponse';

export class ApiController {
  getUserArea = (req: Request, res: Response): void => {
    const user = req.user as any;
    const response = ApiResponse.success({
      message: 'Welcome to user area',
      user: {
        name: user?.name,
        email: user?.email,
        role: user?.role,
      },
    });
    res.status(HTTP_STATUS.OK).json(response);
  };

  getAdminArea = (req: Request, res: Response): void => {
    const user = req.user as any;
    const response = ApiResponse.success({
      message: 'Welcome to admin area',
      user: {
        name: user?.name,
        email: user?.email,
        role: user?.role,
      },
    });
    res.status(HTTP_STATUS.OK).json(response);
  };
}
