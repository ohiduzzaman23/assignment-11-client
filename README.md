# Digital Life Lessons

Digital Life Lessons is a full-stack web platform where users can create, preserve, and share meaningful life lessons, personal growth insights, and wisdom gathered through real experiences. The platform encourages reflection, learning, and community engagement through structured content and premium features.

### Link

- Live Website: https://life-lessons-acc17.web.app
- Github Server Link: https://github.com/ohiduzzaman23/assignment-11-server
- Github Client Link: https://github.com/ohiduzzaman23/assignment-11-client

---

## Key Features

- Secure authentication with Email/Password & Google (Firebase Auth)
- Create, update, delete, and manage personal life lessons
- Public & Private lesson visibility with Free and Premium access control
- Premium subscription system with Stripe one-time payment (৳1500 lifetime)
- Premium lessons locked/blurred for Free users with upgrade prompt
- Like, comment, favorite, report life lessons
- Search, filter, sort & paginate public lessons
- User & Admin dashboards with analytics and management tools
- Firebase Admin SDK token verification for secure APIs
- Modern, responsive, and visually consistent UI across all devices

---

## Project Purpose

People often learn powerful lessons from life but forget them over time.  
**Digital Life Lessons** helps users:

- Preserve personal wisdom
- Reflect mindfully on experiences
- Track learning progress
- Learn from community-shared insights

---

## Tech Stack

### Frontend

- React
- React Router DOM
- TanStack Query
- Firebase Authentication
- Tailwind CSS
- Lottie React
- React Hot Toast / SweetAlert
- Stripe JS

### Backend

- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK
- Stripe API
- JWT Token Verification

---

## Authentication & Security

- Firebase Authentication for login & registration
- Firebase Admin SDK for token verification on protected routes
- Role-based access (User / Admin)
- MongoDB is the single source of truth for user roles & subscription status
- Environment variables used for all sensitive credentials

---

## Premium Subscription

- Free plan by default for all users
- One-time Stripe payment: **৳1500 (Lifetime Premium)**
- Premium users can:
  - View premium public lessons
  - Create premium lessons
  - Access full lesson content without restrictions

---

## Dashboard Features

### User Dashboard

- Lesson overview & analytics
- Add / Update / Delete lessons
- Manage favorites
- Profile management
- Premium badge display

### Admin Dashboard

- Manage users & roles
- Moderate lessons
- Review reported content
- Feature lessons
- Platform analytics & activity insights

---

### Pages & Routes

- Home
- Login / Register
- Public Lessons
- Lesson Details (Protected)
- Pricing / Upgrade (Protected)
- Dashboard (User & Admin)
- Add / Update Lesson (Protected)
- Favorites (Protected)
- Profile
- Payment Success / Cancel
- 404 Not Found

---

### login id & password

- id: nabila1@gmail.com ---(admin)
- password: nabila1@gmail.com

- id: kabila2@gmail.com
  -password:kabila2@gmail.com

- id: gabila3@gmail.com
  -password:gabila3@gmail.com

- id: pabila@gmail.com
  password:pabila@gmail.com
