import bcrypt from 'bcryptjs';
import { User, UserRole, OAuthUser } from './User';

const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'user1',
    email: 'user1@example.com',
    password: hashPassword('password123'),
    role: UserRole.USER,
    name: 'John Doe',
    createdAt: new Date(),
  },
  {
    id: '2',
    username: 'admin1',
    email: 'admin@example.com',
    password: hashPassword('admin123'),
    role: UserRole.ADMIN,
    name: 'Admin User',
    createdAt: new Date(),
  },
];

export const oauthUsers: OAuthUser[] = [];

export const findUserByUsername = (username: string): User | undefined => {
  return mockUsers.find((user) => user.username === username);
};

export const findUserById = (id: string): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};

export const addOAuthUser = (user: OAuthUser): void => {
  const exists = oauthUsers.find((u) => u.email === user.email);
  if (!exists) {
    oauthUsers.push(user);
  }
};

export const findOAuthUser = (email: string): OAuthUser | undefined => {
  return oauthUsers.find((user) => user.email === email);
};
