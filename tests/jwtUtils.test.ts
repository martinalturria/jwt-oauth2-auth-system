import { generateToken, verifyToken, generateOAuthToken } from '../src/utils/jwtUtils';
import { User, UserRole } from '../src/models/User';

describe('JWT Utils', () => {
  const mockUser: User = {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedpassword',
    role: UserRole.USER,
    name: 'Test User',
    createdAt: new Date(),
  };

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const token = generateToken(mockUser);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should include user data in token payload', () => {
      const token = generateToken(mockUser);
      const decoded = verifyToken(token);

      expect(decoded).not.toBeNull();
      expect(decoded?.sub).toBe(mockUser.id);
      expect(decoded?.name).toBe(mockUser.name);
      expect(decoded?.email).toBe(mockUser.email);
      expect(decoded?.role).toBe(mockUser.role);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const token = generateToken(mockUser);
      const decoded = verifyToken(token);

      expect(decoded).not.toBeNull();
      expect(decoded?.sub).toBe(mockUser.id);
    });

    it('should return null for an invalid token', () => {
      const invalidToken = 'invalid.token.here';
      const decoded = verifyToken(invalidToken);

      expect(decoded).toBeNull();
    });

    it('should return null for an expired token', () => {
      const expiredToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IlRlc3QgVXNlciIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjE2MjM5MDIyLCJleHAiOjE2MTYyMzkwMjJ9.fake';
      const decoded = verifyToken(expiredToken);

      expect(decoded).toBeNull();
    });
  });

  describe('generateOAuthToken', () => {
    it('should generate a token with OAuth user data', () => {
      const token = generateOAuthToken('oauth123', 'oauth@example.com', 'OAuth User');
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');

      const decoded = verifyToken(token);
      expect(decoded).not.toBeNull();
      expect(decoded?.sub).toBe('oauth123');
      expect(decoded?.email).toBe('oauth@example.com');
      expect(decoded?.name).toBe('OAuth User');
      expect(decoded?.role).toBe(UserRole.USER);
    });
  });
});
