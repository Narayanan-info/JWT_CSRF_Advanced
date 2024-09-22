<h1 align="center">
  <br>
  <a href="#"><img src="assets/jwt_csrf.png" alt="Assets"></a>
  <br>
  JWT & CSRF - Authentication 
  <br>
</h1>

<h4 align="center">Advanced ( 🔥 ) JWT & CSRF Auth Project V2.0</h4>  

<p align="center">
  <a href="#">
    <img src="assets/Frame 1.png">
  </a>
  <a href="#">
    <img src="https://img.shields.io/travis/com/s0md3v/XSStrike.svg">
  </a>
  <a href="#">
      <img src="https://github.com/Narayanan-info/Redir_X/blob/5b15405191648c6887a2876b603231f2ae41be1a/Assets/closed_issues.svg">
  </a>
</p>

# JWT and CSRF Protection with Node.js and MongoDB

This project demonstrates how to implement JWT-based authentication with RSA key signing and CSRF protection in a Node.js environment, using MongoDB for data storage. The API includes user registration, login, and a protected route that requires a valid JWT and CSRF token for access.

## Features
* User registration and login
* Password hashing using bcrypt
* JWT token-based authentication
* CSRF token-based security
* Rate limiting for login attempts
* Locked account feature after multiple failed login attempts
* JWT refresh token mechanism for generating new access tokens

## Table of Contents

* Installation
* Environment Variables
* API Endpoints
* Technologies Used
* Usage
* License

## Prerequisites
**Make sure you have the following installed:**

* Node.js: JavaScript runtime environment
* Express.js: Web framework for Node.js
* MongoDB: NoSQL database
* bcrypt: Password hashing
* jsonwebtoken: For JWT token generation and verification
* cookie-parser: Parse cookies for handling refresh tokens
* csurf: CSRF protection
* Rate Limiter: Throttle login attempts to prevent brute force attacks

```bash
JWT_CSRF/
├── config/
│   ├── keys/
│   │   ├── private.key      # RSA private key for JWT signing
│   │   ├── public.key       # RSA public key for JWT verification
│   └── db.js              # MongoDB connectivity
├── controllers/
│   └── authController.js    # Authentication and authorization logic
├── middlewares/
│   ├── authenticateJWT.js   # Middleware to authenticate JWT
│   ├── csrfProtection.js    # Middleware to protect against CSRF attacks
│   └── errorHandler.js      # Centralized error handler
├── models/
│   └── user.js              # User model for database interactions
├── routes/
│   └── authRoutes.js        # Routes for authentication (login, token generation)
├── services/
│   ├── jwtService.js        # JWT signing and verification
│   └── csrfService.js       # CSRF token generation and validation
├── utils/
│   └── generateKeys.js      # Utility for generating RSA keys (optional)
├── .env                     # Environment variables (e.g., JWT expiration, secret keys)
├── .gitignore               # Ignore sensitive files (e.g., .env, keys)
├── app.js                   # Main application entry point
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation 
```

## Installation

**Clone the repository:**
```bash
git clone https://github.com/Narayanan-info/JWT_CSRF_Advanced.git
cd JWT_CSRF_Advanced
```
**Install dependencies:**

```bash
npm install
```
**Set up environment variables: Create a .env file in the root directory and add the following variables:**

```bash
MONGODB_URI=<your_mongo_db_connection_string>
JWT_SECRET=<your_jwt_secret>
JWT_REFRESH_SECRET=<your_jwt_refresh_secret>
RATE_LIMIT_MAX=<max_login_attempts>
```
**Start the server:**

```bash
npm start
```
## Environment Variables

* MONGODB_URI: The MongoDB connection string.
* JWT_SECRET: Secret key for signing access JWT tokens.
* JWT_REFRESH_SECRET: Secret key for signing refresh JWT tokens.
* RATE_LIMIT_MAX: Maximum number of login attempts before locking the account.

## API Endpoints

1. POST /register: User registration

* Body :

```bash
{
  "email": "user@example.com",
  "password": "securepassword"
}

```
* Response :

```bash
{
  "message": "User registered successfully!"
}
```

2. POST /login: User login with JWT and CSRF token generation

* Body:

```bash
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

* Responce:

```bash
{
  "accessToken": "<jwt_access_token>",
  "csrfToken": "<csrf_token>"
}
```

3. POST /refresh: Generate a new access token using the refresh token and CSRF validation

* Headers:
    * csrf-token: CSRF token from the login response

* Cookies:
    * refreshToken: JWT refresh token stored in the HTTP-only cookie

* Response:

```bash
{
  "accessToken": "<new_jwt_access_token>"
}
```

4. Middleware:

* Rate Limiter: Limits excessive login attempts.
* CSRF Token Validation: Validates CSRF token on protected routes.

## Usage

**Running the Application**

1. Clone the repository and set up the environment as described above.
2. Run npm start to launch the API server.
3. Use tools like Postman or curl to test the API endpoints.

**Important Notes**

* Ensure that tokens are stored and managed securely (e.g., store the refresh token in HTTP-only cookies).
* CSRF protection is enforced by verifying the token provided in request headers.


## License

This project is licensed under the **MIT License**.