# Developer Profile Playgroun
A full-stack application to showcase and manage developer profiles with search capabilities.

## Additional Resources

- **Resume**: https://drive.google.com/file/d/1FEvzoR5LRvsmRoeaKAozdo-UfyFXLo0d/view?usp=sharing
- **Postman Collection**: https://api.postman.com/collections/38947318-677533d6-8b05-405f-880f-97da08ecd17a?access_key=PMAT-01K4AZZN9TPH8HX3FDSY023XNN

## Local SetupA full-stack application to showcase and manage developer profiles with search capabilities.

## Architecture

- **Frontend**: React.js with functional components and hooks
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM

## Deployment

- **Frontend**: Vercel
- **Backend**: Vercel
- **Database**: MongoDB Atlas

## Features

- CRUD operations for developer profiles
- Search projects by skills
- Global search across all profile data
- Skills listing with click-to-filter functionality
- Responsive UI

## Live Demo

- **Frontend**: https://developer-profile-playground-fronte.vercel.app/
- **Health Check**: https://developer-profile-playground-backen.vercel.app/health

## Repository

https://github.com/Shivam-k-y/developer-profile-playground-backend

## Local Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/developerProfile
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```
4 Seed the database: `npm run seed`
5. Start the server: `npm run dev`

### Frontend Setup

1. Install dependencies: `npm install`
2. Create `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```
3. Start the application: `npm start`

## Production Deployment

### Backend (Vercel)

1. Connect your GitHub repo to Vercel
2. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `PORT`
   - `FRONTEND_URL`
3. Deploy automatically on push to main

### Frontend (Vercel)

1. Build the app: `npm run build`
2. Deploy to Vercel or connect GitHub
3. Set environment variable: `REACT_APP_API_URL` to your deployed backend URL

### Database (MongoDB Atlas)

1. Create a free cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in your production environment

## Database Schema

The application uses a single Profile collection with the following structure:

```javascript
{
  name: String,
  email: String,
  education: [{
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  skills: [String],
  projects: [{
    title: String,
    description: String,
    skills: [String],
    links: {
      github: String,
      demo: String,
      other: String
    }
  }],
  work: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
    other: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## API Documentation

### Endpoints

- `GET /api/profile` - Get profile data
- `POST /api/profile` - Create/update profile
- `GET /api/profile/projects?skill=python` - Get projects by skill
- `GET /api/profile/skills/top` - Get all skills
- `GET /api/profile/search?q=react` - Search across all content
- `GET /health` - Health check

## Future Enhancements

- Add authentication for write operations
- Improve input validation and error handling
- Support for multiple profiles
- Add API rate limiting
- Create admin dashboard for profile management

## Current Profile Data

This backend is seeded with sample data for **SHIVAM KUMAR**, including:

- Education from IIIT Kottayam
- 11 technical skills
- 5 projects including Todos App, SIP Calculator, Currency Converter, Anonymous Chat App, and Food App
- Work experience (dummy data)
- Social links (GitHub, LinkedIn, Portfolio)

