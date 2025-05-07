# Study Notes API Documentation

A RESTful API for managing study notes with user authentication.

## Authentication

The API uses JWT (JSON Web Token) for authentication. Protected routes require a valid JWT token.

### Token Usage

Include the token in requests using one of these methods:

- Authorization header: `Authorization: Bearer <token>`
- Cookie: Automatically handled by the browser after login

## Endpoints

### User Authentication

#### Register User

```http
POST /auth/register
```

**Request Body:**

```json
{
  "name": {
    "firstName": "string", // required, min 3 characters
    "lastName": "string"   // optional, min 3 characters
  },
  "email": "string",     // required, valid email
  "password": "string"   // required, min 6 characters
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "string",
      "name": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string",
      "role": "string"
    },
    "token": "string"
  }
}
```

#### Login User

```http
POST /auth/login
```

**Request Body:**

```json
{
  "email": "string",    // required, valid email
  "password": "string"  // required, min 6 characters
}
```

**Response:**

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "string",
      "name": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string",
      "role": "string"
    },
    "token": "string"
  }
}
```

#### Get Current User

```http
GET /auth/me
```

**Headers:**

- Authorization: Bearer `token` (required)

**Response:**

```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "user": {
      "_id": "string",
      "name": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string",
      "role": "string"
    }
  }
}
```

#### Logout User

```http
GET /auth/logout
```

**Headers:**

- Authorization: Bearer `token` (required)

**Response:**

```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

## Error Responses

### Validation Error

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    {
      "param": "string",
      "msg": "string"
    }
  ]
}
```

### Authentication Error

```json
{
  "success": false,
  "message": "Unauthorized"
}
```
