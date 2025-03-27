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
   git clone https://github.com/your-username/social-media-platform.git](https://github.com/kalolaini/social-media-platform)
   cd social-media-platform

   
2. **Install dependencies for the backend**
   ```bash
   cd backend
   npm install

3. **Set up environment variables Create a .env file in the backend directory and fill it with the necessary environment variables:**
   ```bash
   MONGO_URI=mongodb+srv://Kalo:Kalo2018!@socialmediaplatform.ghluj.mongodb.net/socialmediaplatform?retryWrites=true&w=majority&appName=SocialMediaPlatform
   JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DQZsd3Yx8mF3Bl0kch6HYtFs=
   PORT=5001
   
4. **Run the backend server**
   ```bash
   npm start

   
5. **Install dependencies for the frontend**
   ```bash
   cd ../frontend
   npm install


6. **Start the frontend application**
   ```bash
   npm start

# CI/CD Pipeline Details

The CI/CD pipeline is configured using GitHub Actions and deploys the application to an AWS EC2 instance.

## Workflow Configuration

The .github/workflows/ci-cd.yml file contains the pipeline configuration, which includes:

- Continuous Integration: Runs tests, builds the application, and checks code quality.

- Continuous Deployment: Deploys the application to AWS EC2 whenever the main branch is updated.

### Steps

1. Install Dependencies: Installs all required npm packages for both backend and frontend.

2. Run Tests: Executes unit tests using Mocha and Chai for the backend.

3. Build Frontend: Builds the React frontend.

4. Deploy to AWS: Uses SSH to access the EC2 instance and updates the running application with new code.

#### Secrets

Ensure the following secrets are configured in your GitHub repository:

- AWS_ACCESS_KEY_ID: Your AWS access key for programmatic access.

- AWS_SECRET_ACCESS_KEY: Your AWS secret access key.

- HOST: IP address of your EC2 instance.

- PORT: Port number on which the application runs.

- SSH_KEY: Private SSH key to access the EC2 instance.

# Running the Application

1. **Once deploye, access the application via**
   ```bash
   http://3.26.39.90:22

##Conclusion
The project demonstrates a full-stack application setup with automated CI/CD pipelines facilitating continuous integration and deployment practices.
