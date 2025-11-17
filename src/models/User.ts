export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  createdAt: Date;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserInfo;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface OAuthUser {
  id: string;
  email: string;
  name: string;
  provider: string;
}
