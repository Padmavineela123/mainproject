# AI Interview Preparation Platform

A full-stack, AI-powered interview preparation portal designed to train candidates across all technical and behavioral hiring stages: Aptitude (Basics, Advanced, Verbal), Technical MCQs, Live Placement Coding with dynamic multi-language code compilation, and AI-evaluated HR interviews with audio voiceover capture.

---

## 🌟 Key Features

- **Full Auth & Role-Based Access Control**: Student signup/login + separate Admin authentication and management dashboard.
- **Aptitude Mastery**: 3 distinct tracks — Basic Aptitude, Advanced Aptitude, and Verbal Aptitude with timers, automated grading, and instant scorecards.
- **Technical Knowledge Tests**: Core CS topics, database, networking, and language questions with feedback.
- **Placement Coding Practice**:
  - Over 80 placement-level DSA problems categorized by difficulty (Easy, Medium, Difficult, Advanced).
  - Code compiler supporting **C, Java, and Python** with execution time analysis and test case comparisons.
  - Automatic progress tracking: Solved problems are instantly recorded and highlighted with a **`✓ Solved`** indicator.
- **AI-Powered HR Interview Round**:
  - Pinned question: *"Tell me about yourself."*
  - **Audio Recording**: Record real audio answers directly without speech-to-text distortion; replay recorded audio before submitting.
  - Sequential progression: candidate's response is validated by AI before the next question unlocks.
  - Multi-metric NLP evaluation: Relevance (TF-IDF Cosine Similarity), Tone Confidence, and Speech Fluency.
- **Student Dashboard & Practice History**: Tracks complete performance history, tests taken, completion status, and scores.
- **Dark Glassmorphic UI**: High-contrast, modern UI crafted with responsive layout across all pages.

---

## 🏗 Tech Stack

- **Frontend**: React 19, Vite, React Router 7, Lucide Icons
- **Backend**: Node.js, Express 5, Mongoose, JWT, BcryptJS
- **Database**: MongoDB Atlas
- **NLP / ML Engine**: Pure Node.js TF-IDF vector similarity, sentiment lexicon, and fluency evaluator (`minor/server/utils/nlpEvaluator.js`)
- **Compilers**: Local GCC, Java JDK (`javac`/`java`), Python

---

## 📂 Project Architecture

```
mainproject/
├── .gitignore
├── README.md
└── minor/
    ├── client/                 # React frontend
    │   ├── src/
    │   │   ├── admin/          # Admin login and dashboard
    │   │   ├── data/           # Question banks and coding problem definitions
    │   │   ├── pages/          # All round pages (Aptitude, Coding, HR, Dashboard, History)
    │   │   └── App.jsx         # Routes and guards
    │   └── package.json
    └── server/                 # Express backend
        ├── config/             # Database connection
        ├── controllers/        # Auth, compiler, questions, tests, admin controllers
        ├── middleware/         # JWT auth & admin guards
        ├── models/             # Mongoose schemas (User, Question, TestResult)
        ├── routes/             # API routes
        ├── seed/               # Question & problem seeders
        ├── utils/              # NLP evaluation engine
        └── server.js           # Server entry point
```

---

## 🚀 Local Setup

### 1. Backend

```bash
cd minor/server
npm install
# Configure your .env file (see .env.example)
npm start
```

### 2. Frontend

```bash
cd minor/client
npm install
npm run dev
```

---

## 🌐 Cloud Deployment Guide

### Frontend Deployment (Vercel)
1. Go to [Vercel](https://vercel.com) and import the repository.
2. Set **Root Directory** to `minor/client`.
3. Add Environment Variable:
   - `VITE_API_URL`: Your deployed backend URL (e.g. `https://your-api.onrender.com`)
4. Click **Deploy**.

### Backend Deployment (Render / Railway)
1. Go to [Render](https://render.com) or [Railway](https://railway.app) and create a new Web Service from this repository.
2. Set **Root Directory** to `minor/server`.
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Configure Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas URI
   - `JWT_SECRET`: Your JWT secret
   - `PORT`: `5000`
   - `CLIENT_ORIGINS`: Your Vercel frontend URL
