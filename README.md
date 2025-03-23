# 📚 Book Review API (NestJS)

This is a backend API for managing book reviews, authentication, and user accounts using NestJS.

## 🚀 Features
- User authentication (Register & Login) with JWT
- Create, update, and delete book reviews
- Fetch reviews by book ID or user
- Secure endpoints with authentication

## 🛠️ Technologies Used
- **NestJS** - Backend framework
- **MongoDB** - Database
- **JWT (JSON Web Tokens)** - Authentication
- **Passport.js** - Authentication middleware

---

## 📌 API Endpoints

### 🔐 Authentication (`/auth`)
| Method | Endpoint       | Description          |
|--------|---------------|----------------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login`    | Login and get a JWT token |
| `GET`  | `/auth/profile`  | Get logged-in user profile (Requires JWT) |

---

### 👤 User Management (`/user`)
| Method | Endpoint        | Description          |
|--------|----------------|----------------------|
| `POST` | `/user/register` | Register a new user |
| `POST` | `/user/login`    | Login a user |

---

### 📖 Reviews (`/review`)
| Method   | Endpoint                 | Description                     |
|----------|---------------------------|---------------------------------|
| `POST`   | `/review`                 | Create a new review (Requires JWT) |
| `GET`    | `/review/book/:bookId`     | Get all reviews for a book |
| `GET`    | `/review/my-reviews`       | Get reviews by logged-in user (Requires JWT) |
| `PUT`    | `/review/:id`              | Update a review (Requires JWT) |
| `DELETE` | `/review/:id`              | Delete a review (Requires JWT) |

---

## 🔑 Authentication & Security
- All endpoints under `/review` require **JWT authentication**.
- To access protected routes, send the token in the `Authorization` header:  
