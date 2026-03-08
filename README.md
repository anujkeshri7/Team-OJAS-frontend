<div align="center">

<img src="https://team-ojas-nith.vercel.app/favicon.ico" width="60" alt="OJAS Logo" />

# Team OJAS — Official Website (Frontend)

**Departmental Club of Electrical Engineering · NIT Hamirpur**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-team--ojas--nith.vercel.app-00d4ff?style=for-the-badge&logo=vercel)](https://team-ojas-nith.vercel.app/)
[![Frontend Repo](https://img.shields.io/badge/Frontend-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/anujkeshri7/Team-OJAS-frontend)
[![Backend Repo](https://img.shields.io/badge/Backend-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/anujkeshri7/Team-OJAS-backend)
[![Uptime Robot](https://img.shields.io/badge/Monitor-UptimeRobot-4CAF50?style=for-the-badge&logo=uptimerobot)](https://uptimerobot.com/)

</div>

---

## ⚡ Overview

The **Team OJAS** website is the official digital presence of the Electrical Engineering departmental club at **NIT Hamirpur**. Built with **React.js** and **Tailwind CSS**, it showcases the club's projects, domains, and members — with a protected admin panel to manage content, and a self-serve member registration flow.

| | |
|---|---|
| 🌐 **Live Site** | [team-ojas-nith.vercel.app](https://team-ojas-nith.vercel.app/) |
| 🖥️ **Frontend** | React.js, Tailwind CSS, Vite |
| 🔧 **Backend** | Node.js, Express.js, MongoDB, Cloudinary |
| 🚀 **Deployed** | Vercel (frontend) · Render (backend) · UptimeRobot (monitor) |

> 📦 **Backend Repository:** [Team-OJAS-backend](https://github.com/anujkeshri7/Team-OJAS-backend)

---

## 📁 Project Structure

```
frontend/
├── public/
└── src/
    ├── assets/
    ├── components/
    │   ├── adminPanel/       # Admin & super-admin dashboard
    │   ├── Footer/
    │   ├── Header/
    │   ├── hero-section/
    │   ├── Home/             # Home page sections
    │   ├── Loader/
    │   ├── Project/          # Project detail pages
    │   ├── Team/             # Our Team page
    │   └── ConformPopup.jsx
    ├── config/
    ├── Pages/
    ├── App.jsx
    ├── main.jsx
    └── Protected.jsx
```

---

---

## 📖 Detailed Documentation

### 1. Public Pages

#### 🏠 Home Page (`/`)
The home page is composed of five stacked sections:

| Section | Description |
|---|---|
| **Hero** | Club name "TEAM OJAS", tagline *"Fuelled by Innovation. Driven by Determination."*, stats (50+ members, 20+ projects, 100% passion), and an *Explore Projects* CTA button |
| **About OJAS** | Origin story of the club, its growth, and current strength — with a team photo |
| **Our Domains** | Seven domains covered: IoT, Embedded Systems, Machine Learning, Graphic Designing, Web Development, App Development, Video Editing |
| **Featured Projects** | 3 highlighted projects with images, domain tags, and *View Detail* buttons; followed by a *View All Projects* button |
| **Contact Us** | Left side: club email & location. Right side: a message form (Name, Email, Message) |

#### 🏗️ Projects Page (`/projects`)
Full listing of all club projects. Each project card can contain the following fields *(only title, image, and domain are required; all others are optional)*:

```
Title · Domain · Short Description · Problem Statement · Objectives
Solution · Architecture · Hardware · Software · Algorithms
Implementation · Results · Challenges · Applications
Future Scope · Tech Stack · GitHub Link · Demo Link
```

#### 👥 Our Team Page (`/members`)
Displays member profile cards organized into sections by role:

1. Faculty Incharge
2. Final Year
3. Club Coordinators
4. Coordinators
5. Executives
6. Volunteers

Each card shows: Profile photo, Name, Role, Short Bio, and social links (LinkedIn, Instagram, GitHub).

---

### 2. Member Self-Registration (`/add-member`)

A **temporarily open secret route** that allows members to submit their own details. The form includes:

- Full Name & Position (dropdown)
- Profile Image upload (stored via Cloudinary)
- Short Bio (max 70 characters)
- Social links: Instagram, LinkedIn, GitHub

Once submitted, the member's profile card **automatically appears** in the correct section on the `/members` page — no manual intervention needed.

---

### 3. Admin Panel

Access is restricted to authorized users only (JWT-based authentication).

**Admin capabilities:**
- ➕ Add new projects with full detail fields
- ✏️ Edit existing project details
- 🗑️ Remove team members

**Super Admin capabilities (elevated role):**
- All admin features, plus:
- 👤 Grant or revoke admin access to other users

---

### 4. Tech Stack

#### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| Tailwind CSS | Styling |
| Vite | Build tool |
| React Router | Client-side routing |

#### Backend *(see [backend repo](https://github.com/anujkeshri7/Team-OJAS-backend))*
| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| MongoDB | Database |
| Cloudinary | Image storage |
| Multer | File uploads |
| JWT + bcrypt | Auth & password hashing |
| CORS, dotenv, cookie-parser | Middleware & config |

---

### 5. Deployment & Monitoring

| Service | Role |
|---|---|
| **Vercel** | Frontend hosting with CI/CD on every push |
| **Render** | Backend server hosting |
| **UptimeRobot** | Uptime monitoring — pings the server to prevent cold starts and ensure zero downtime |

> UptimeRobot is especially important here because Render's free tier spins down inactive services. UptimeRobot keeps the backend alive by sending periodic requests.

---

### 6. Environment Variables

Create a `.env` file in the root of the frontend project:

```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

---

### 7. Getting Started (Local Setup)

```bash
# 1. Clone the repo
git clone https://github.com/anujkeshri7/Team-OJAS-frontend.git
cd Team-OJAS-frontend

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env
# → Fill in VITE_BACKEND_URL

# 4. Start development server
npm run dev
```

---

## 🤝 Contributing

This is an internal club project. For changes, open a PR and tag a coordinator for review.

---

<div align="center">

© 2024 · Departmental Club of Electrical Engineering · NIT Hamirpur

*Built by students, powered by passion.*

</div>
