# Octofit Tracker Backend

## Overview

The Octofit Tracker is a multi-tier application designed to help users track their fitness activities, manage teams, and receive personalized workout suggestions. This backend service is built using Node.js, Express, and TypeScript, and it interacts with a MongoDB database for data storage.

## Project Structure

The backend project is organized as follows:

```
octofit-tracker/
└── backend/
    ├── src/
    │   ├── config/
    │   │   └── environment.ts       # Configuration settings and environment variables
    │   ├── routes/
    │   │   ├── activities.ts          # Route handlers for activities
    │   │   ├── leaderboard.ts          # Route handlers for leaderboard
    │   │   ├── teams.ts                # Route handlers for teams
    │   │   ├── users.ts                # Route handlers for users
    │   │   └── workouts.ts             # Route handlers for workouts
    │   └── server.ts                   # Entry point for the application
    ├── package.json                     # NPM dependencies and scripts
    ├── tsconfig.json                    # TypeScript configuration
    └── README.md                        # Project documentation
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/JonathansRepo/skills-build-applications-w-copilot-agent-mode.git
   cd skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm run start
   ```

4. **Development Mode**
   For development, you can use:
   ```bash
   npm run dev
   ```

## API Endpoints

The backend exposes the following API endpoints:

- **Users**
  - `POST /api/users/` - Register a new user
  - `GET /api/users/:id` - Get user profile
  - `PUT /api/users/:id` - Update user profile

- **Teams**
  - `POST /api/teams/` - Create a new team
  - `GET /api/teams/:id` - Get team details
  - `PUT /api/teams/:id` - Update team information

- **Activities**
  - `POST /api/activities/` - Log a new activity
  - `GET /api/activities/` - Retrieve all activities

- **Leaderboard**
  - `GET /api/leaderboard/` - Get leaderboard data

- **Workouts**
  - `POST /api/workouts/` - Create a new workout suggestion
  - `GET /api/workouts/` - Retrieve workout suggestions

## License

This project is licensed under the MIT License. See the LICENSE file for details.