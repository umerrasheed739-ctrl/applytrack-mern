# ApplyTrack – Job Application Tracker

ApplyTrack is a full-stack MERN web application that helps users organize, manage, and track their job applications in one place.

Users can create an account, securely log in, add job applications, update their application status, edit application information, and delete applications.

## Problem / Idea

Job seekers often apply to multiple companies and find it difficult to remember where they applied, which position they applied for, and the current status of each application.

ApplyTrack provides a centralized dashboard where users can manage their job search and track the progress of their applications.

## Features

- User registration
- User login and logout
- JWT-based authentication
- Secure password hashing using bcrypt
- Protected application routes
- Personal job application dashboard
- Add new job applications
- View all applications
- Edit existing applications
- Delete applications
- Track application status
- Search applications by company or position
- Filter applications by status
- Store job posting URLs
- Loading and error handling
- Responsive user interface
- Persistent MongoDB database storage

## Application Status

Applications can be tracked using statuses such as:

- Applied
- Interview
- Offer
- Rejected

## Technology Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- React Icons
- CSS
- React Hooks

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- bcrypt

### Database

- MongoDB Atlas
- Mongoose

### Deployment

- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database

## Project Structure

```text
applytrack-mern/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## REST API

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Job Applications

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get user's applications |
| POST | `/api/jobs` | Create a new application |
| GET | `/api/jobs/:id` | Get a single application |
| PUT | `/api/jobs/:id` | Update an application |
| DELETE | `/api/jobs/:id` | Delete an application |

Job routes are protected and require authentication.

## Installation and Setup

### 1. Clone Repository

```bash
git clone https://github.com/umerrasheed739-ctrl/applytrack-mern.git
```

```bash
cd applytrack-mern
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

The backend will run locally on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

## Environment Variables

The following environment variables are required:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Actual credentials and secrets are not included in this repository.

## Security

- Passwords are hashed using bcrypt before being stored.
- Authentication is handled using JSON Web Tokens (JWT).
- Protected API endpoints require a valid authentication token.
- Environment variables are used for sensitive configuration.
- `.env` files are excluded from Git.

## Deployment

### Frontend

Vercel

Live URL:

```text
Coming Soon
```

### Backend

Render

API URL:

```text
Coming Soon
```

### Database

MongoDB Atlas

## Author

**Umer Rasheed**

Final Capstone Project – Full-Stack MERN Application