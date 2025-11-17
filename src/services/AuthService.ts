import bcrypt from 'bcryptjs';
import { AuthResponse, LoginRequest, UserInfo } from '../models/User';
import { findUserByUsername } from '../models/UserStore';
import { generateToken } from '../utils/jwtUtils';
import { ERROR_MESSAGES } from '../config/constants';

export class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const { username, password } = credentials;

    const user = findUserByUsername(username);

    if (!user) {
      throw new Error(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const token = generateToken(user);

    const userInfo: UserInfo = {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return {
      token,
      user: userInfo,
    };
  }
}
