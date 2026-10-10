# Mini SaaS Template Store

Full-stack app where users can register, log in, browse templates and mark them as favorites.

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, Axios, React Router
- Backend: Node.js, Express.js
- Database: SQLite with Knex.js
- Auth: JWT, bcrypt

## Features
- Register and login with validation
- JWT stored in localStorage, protected routes, logout
- Templates list with search and category filter
- Add/remove favorites, "My Favorites" page

## Setup

### Backend
```bash
cd server
npm install
```
Create `server/.env`:
```
PORT=5000
JWT_SECRET=your_secret_here
```
Create tables, seed sample templates, then start the server:
```bash
node seed.js
npm run dev
```
Server runs on http://localhost:5000

### Frontend
```bash
cd client
npm install
npm run dev
```
App runs on http://localhost:5173

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/templates
- GET /api/templates/:id
- GET /api/favorites (auth)
- POST /api/favorites/:templateId (auth)
- DELETE /api/favorites/:templateId (auth)

## Author
Sasima Parvin S
Email: sasimaparvin23@gmail.com
GitHub: https://github.com/Sasima23
LinkedIn: https://www.linkedin.com/in/sasima-parvin-s