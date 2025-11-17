# JWT & OAuth2 Authentication System

A professional authentication and authorization system built with Node.js, Express, and TypeScript, featuring JWT tokens and OAuth2 integration.

## Features

- **JWT Authentication**: Login endpoint with token generation and validation
- **Role-Based Access Control (RBAC)**: Protected endpoints with user and admin roles
- **OAuth2 Integration**: Google OAuth2 login with JWT token issuance
- **TypeScript**: Full type safety and modern JavaScript features
- **Testing**: Comprehensive unit tests with Jest
- **Professional Structure**: Clean architecture with separation of concerns

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Authentication**: JWT (jsonwebtoken), Passport.js
- **Security**: bcryptjs for password hashing
- **OAuth2**: Google OAuth2 via Passport
- **Logging**: Winston
- **Testing**: Jest with ts-jest

## Project Structure

```
src/
├── config/          # Configuration files (logger, passport)
├── controllers/     # Route controllers
├── middleware/      # Authentication and authorization middleware
├── models/          # Data models and interfaces
├── routes/          # API routes
├── services/        # Business logic
└── index.ts         # Application entry point
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/martinalturria/jwt-oauth2-auth-system.git
cd jwt-oauth2-auth-system
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- `JWT_SECRET`: Secret key for JWT signing
- `GOOGLE_CLIENT_ID`: Google OAuth2 client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth2 client secret

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication

#### POST /auth/login
Login with username and password to receive a JWT token.

**Request:**
```json
{
  "username": "user1",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "user1",
    "email": "user1@example.com",
    "role": "user"
  }
}
```

#### GET /auth/google
Initiates Google OAuth2 authentication flow.

#### GET /auth/google/callback
OAuth2 callback endpoint. Returns JWT token after successful authentication.

### Protected Endpoints

#### GET /api/usuario
Protected endpoint accessible by users with "user" role.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "message": "Welcome to user area",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### GET /api/admin
Protected endpoint accessible only by users with "admin" role.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "message": "Welcome to admin area",
  "user": {
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

## JWT Claims

The JWT tokens include the following claims:

- `sub`: User ID
- `name`: User's full name
- `email`: User's email address
- `role`: User's role (user/admin)
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Signing**: HMAC SHA256 algorithm
- **Token Expiration**: Configurable token lifetime
- **Role-Based Authorization**: Middleware for role validation
- **OAuth2 Security**: Secure token exchange flow

## Mock Users

For testing purposes, the following users are available:

| Username | Password | Role | Email |
|----------|----------|------|-------|
| user1 | password123 | user | user1@example.com |
| admin1 | admin123 | admin | admin@example.com |

## License

ISC
