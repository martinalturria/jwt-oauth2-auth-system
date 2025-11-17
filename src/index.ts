import 'dotenv/config';
import express, { Application, Request, Response, NextFunction } from 'express';
import passport from './config/passport';
import authRoutes from './routes/authRoutes';
import apiRoutes from './routes/apiRoutes';
import logger from './config/logger';
import { HTTP_STATUS } from './config/constants';
import { ApiResponse } from './models/ApiResponse';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/health', (req: Request, res: Response) => {
  const response = ApiResponse.success({ status: 'ok', service: 'jwt-oauth2-auth-system' });
  res.json(response);
});

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error:', { message: err.message, stack: err.stack });

  const errorResponse = ApiResponse.error(
    err.message || 'Internal server error',
    'INTERNAL_SERVER_ERROR',
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse);
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;
