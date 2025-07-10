# QueueEase API Documentation

## Base URL

```
http://localhost:5000/api
```
*(Replace `localhost:5000` with your deployed URL in production)*

---

## Authentication

- **Admin login** returns a JWT token. For protected admin endpoints (if any in the future), include:
  ```
  Authorization: Bearer <token>
  ```

---

## Endpoints

### 1. Queue Management

#### Add User to Queue
- **POST** `/queue`
- **Body:**
  ```json
  {
    "name": "Adam Ridwanullahi",
    "phone": "09033295837",
    "remarks": "Optional remarks"
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "_id": "string",
    "name": "Adam Ridwanullahi",
    "phone": "09033295837",
    "remarks": "Optional remarks",
    "status": "waiting",
    "joinTime": "2024-05-01T12:00:00.000Z"
  }
  ```

---

#### Get All Users in Queue
- **GET** `/queue`
- **Response:** `200 OK`
  ```json
  [
    {
      "_id": "string",
      "name": "Adam Ridwanullahi",
      "phone": "09033295837",
      "remarks": "Optional remarks",
      "status": "waiting",
      "joinTime": "2024-05-01T12:00:00.000Z"
    }
    // ...more users
  ]
  ```

---

#### Update User Status
- **PATCH** `/queue/:id`
- **Body:**
  ```json
  { "status": "served" } // or "skipped" or "waiting"
  ```
- **Response:** `200 OK`
  ```json
  {
    "_id": "string",
    "name": "Adam Ridwanullahi",
    "status": "served"
    // ...other fields
  }
  ```

---

#### Remove User from Queue
- **DELETE** `/queue/:id`
- **Response:** `200 OK`
  ```json
  {
    "_id": "string",
    "name": "Adam Ridwanullahi",
    // ...other fields
  }
  ```

---

### 2. Admin Login

#### Login
- **POST** `/admin/login`
- **Body:**
  ```json
  {
    "username": "omotosho@gmail.com",
    "password": "omotosho123"
  }
  ```
- **Response:** `200 OK`
  ```json
  {
    "token": "jwt_token_string"
  }
  ```

---

### 3. Feedback Submission

#### Submit Feedback
- **POST** `/feedback`
- **Body:**
  ```json
  {
    "name": "Adam Ridwanullahi",
    "rating": 5,
    "comment": "Great service!"
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "_id": "string",
    "name": "Adam Ridwanullahi",
    "rating": 5,
    "comment": "Great service!",
    "createdAt": "2024-05-01T12:00:00.000Z"
  }
  ```

---

#### Get All Feedback
- **GET** `/feedback`
- **Response:** `200 OK`
  ```json
  [
    {
      "_id": "string",
      "name": "Adam Ridwanullahi",
      "rating": 5,
      "comment": "Great service!",
      "createdAt": "2024-05-01T12:00:00.000Z"
    }
    // ...more feedback
  ]
  ```

---

### 4. Analytics

#### Get Queue Stats
- **GET** `/stats`
- **Response:** `200 OK`
  ```json
  {
    "served": 10,
    "skipped": 2,
    "waiting": 5
  }
  ```

---

## Error Responses

- All endpoints return errors in the following format:
  ```json
  { "error": "Error message here" }
  ```

---

## Notes

- All endpoints accept and return JSON.
- If MongoDB is unavailable, the backend uses in-memory storage (data will not persist after restart).
- For production, secure your JWT secret and admin credentials in your environment variables. 