import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { addOAuthUser, findOAuthUser } from '../models/UserStore';
import logger from './logger';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_CALLBACK_URL =
  process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || '';
        const name = profile.displayName || '';

        let user = findOAuthUser(email);

        if (!user) {
          user = {
            id: profile.id,
            email,
            name,
            provider: 'google',
          };
          addOAuthUser(user);
          logger.info(`New OAuth user registered: ${email}`);
        }

        done(null, user);
      } catch (error) {
        logger.error('Error in Google OAuth strategy', error);
        done(error as Error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;
