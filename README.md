# Social Media Platform

This project implements a basic social media platform with functionalities like user authentication, posting, and commenting using Node.js, Express, React, and MongoDB.

## Project Setup Instructions

### Prerequisites

- Node.js (version 16.x or later)
- MongoDB (local or remote instance)
- npm or yarn package manager

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/social-media-platform.git
   cd social-media-platform
2. Install dependencies for the backend
cd backend
npm install

3. Set up environment variables Create a .env file in the backend directory and fill it with the necessary environment variables:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001

4. Run the backend server
npm start

5. Install dependencies for the frontend
cd ../frontend
npm install

6. Start the frontend application
npm start
This will serve the frontend on http://localhost:3000
