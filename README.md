**Internship Tracker Backend**
**Overview**

The Internship Tracker Backend is a RESTful API built with Node.js and Express that manages user authentication and internship application data. It allows users to securely store, update, and track their internship applications using a PostgreSQL database.

**Tech Stack**

**Backend**

Node.js

Express.js

**Database**

PostgreSQL

**Authentication**

JSON Web Tokens (JWT)

bcrypt

**Tools**

Git & GitHub

Postman (API testing)

dotenv (environment variables)

**Features**

User authentication (signup and login)

Password hashing using bcrypt

JWT-based authorization

CRUD operations for internship applications

Application status tracking

**API Endpoints**

**Authentication**
| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| POST   | /auth/register | Register a new user |
| POST   | /auth/login    | Login user          |

**Applications**
| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| GET    | /applications     | Get all applications |
| POST   | /applications     | Add new application  |
| PUT    | /applications/:id | Update application   |
| DELETE | /applications/:id | Delete application   |


**Future Improvements**

Interview notes for applications
Application deadline reminders
Analytics dashboard
Resume version tracking
Export applications as CSV/Excel

**Author**

Developed as part of a full-stack project to help students efficiently manage internship applications.


Protected routes for authenticated users
