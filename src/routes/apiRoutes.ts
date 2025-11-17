import { Router } from 'express';
import { ApiController } from '../controllers/ApiController';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';
import { UserRole } from '../models/User';

const router = Router();
const apiController = new ApiController();

router.get(
  '/usuario',
  authenticate,
  authorize(UserRole.USER, UserRole.ADMIN),
  apiController.getUserArea
);

router.get(
  '/admin',
  authenticate,
  authorize(UserRole.ADMIN),
  apiController.getAdminArea
);

export default router;
