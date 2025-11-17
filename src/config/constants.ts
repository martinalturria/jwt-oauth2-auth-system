export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid username or password',
    MISSING_TOKEN: 'No token provided',
    INVALID_TOKEN: 'Invalid or expired token',
    FORBIDDEN: 'You do not have permission to access this resource',
  },
  USER: {
    NOT_FOUND: 'User not found',
  },
};

export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Login successful',
    OAUTH_SUCCESS: 'OAuth login successful',
  },
};
