import { Router, Request, Response } from 'express';
import passport from '../config/passport';
import { AuthController } from '../controllers/AuthController';
import { generateOAuthToken } from '../utils/jwtUtils';
import { HTTP_STATUS } from '../config/constants';
import { OAuthUser } from '../models/User';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/failure' }),
  (req: Request, res: Response) => {
    const user = req.user as OAuthUser;

    const token = generateOAuthToken(user.id, user.email, user.name);

    res.status(HTTP_STATUS.OK).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: 'user',
      },
    });
  }
);

router.get('/failure', (req: Request, res: Response) => {
  res.status(HTTP_STATUS.UNAUTHORIZED).json({
    error: 'OAuth authentication failed',
  });
});

export default router;
