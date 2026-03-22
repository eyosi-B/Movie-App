# MERN Movies App

A full-stack movie platform built with MongoDB, Express, React, Node.js, Redux Toolkit, and Vite.

The app includes:
- public movie browsing
- featured and filtered movie sections
- movie details and reviews
- user authentication
- admin movie and genre management

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose, JWT
- Frontend: React, Redux Toolkit, React Router, Tailwind CSS, Vite
- Tooling: Nodemon, Concurrently

## Project Structure

```text
MERN-Movies-App/
|- backend/
|- frontend/
|- package.json
|- .env.example
`- README.md
```

## Prerequisites

Before running the project, make sure you have:
- Node.js 18 or newer
- npm
- MongoDB running locally or a MongoDB connection string

## Environment Setup

1. Copy `.env.example` to `.env`
2. Update the values for your local machine

Example:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/moviesApp
NODE_ENV=development
JWT_SECRET=replace-with-a-strong-secret
```

Important:
- Use `PORT`, not `POST`
- `.env` is ignored by Git and should not be pushed to GitHub

## Installation

Install backend/root dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

## Running The App

Start backend and frontend together from the project root:

```bash
npm run fullstack
```

This starts:
- backend on `http://localhost:3000`
- frontend on Vite dev server, usually `http://localhost:5173`

You can also run them separately.

Backend only:

```bash
npm run backend
```

Frontend only:

```bash
npm run frontend
```

## How To Use The System

### Public User

1. Open the frontend in your browser
2. Browse featured movies on the home page
3. Open the `Browse` page to search and filter movies by genre, year, or sort order
4. Click any movie card to see full details
5. Register or log in to leave reviews

### Authenticated User

After logging in, a user can:
- view their profile
- add reviews to movie detail pages
- browse the full catalog

### Admin

If the account has admin access, the user can:
- open the admin dashboard
- create movies
- update movies
- manage genres
- review comments

## API Overview

Main backend routes:

- `/api/v1/users`
- `/api/v1/genre`
- `/api/v1/movies`
- `/api/v1/upload`

Uploaded files are served from:

- `/uploads`

## Build Frontend

To create a production frontend build:

```bash
cd frontend
npm run build
```

## What Should Not Be Pushed To GitHub

These are now ignored in `.gitignore`:

- `.env`
- `node_modules`
- `frontend/node_modules`
- frontend build output like `frontend/dist`
- logs and local editor files

## Notes

- If you clone the project on a new machine, run both installs again
- Make sure MongoDB is running before starting the backend
- If login or protected routes fail, check your `JWT_SECRET` and database connection first
