# Pathfinder.ai

A full stack AI-powered learning roadmap generator. Enter your goal and current skills, and get a personalized step-by-step learning path.

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Auth:** JWT, bcryptjs
- **AI:** Groq API (llama-3.1-8b-instant)

## Features

- User authentication (register/login)
- AI-generated personalized learning roadmaps
- Step progress tracking
- View and revisit past roadmaps

## Getting Started

### Prerequisites

- Node.js
- MongoDB (local) or MongoDB Atlas
- Groq 
 key

### Installation

**Backend**
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pathfinder
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

```bash
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

## Project Structure

```
pathfinder.ai/
  frontend/        # React app (port 5173)
  backend/         # Express API (port 5000)
    models/        # Mongoose schemas
    routes/        # API routes
    controllers/   # Route handlers
    middleware/    # JWT auth
    services/      # Groq API, DB logic
```