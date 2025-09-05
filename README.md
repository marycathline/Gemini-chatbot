Gemini Chatbot

Live demo: https://gemini-chatbot-1-6zmb.onrender.com/

A modern web-based chatbot interface that integrates with multiple AI providers (like Gemini and  Azure,). Built with a React frontend and a secure Node.js backend deployed on Render.

Features

Multi-provider support: Dynamically select from available AI providers.

Real-time chat UI: Smooth, responsive chatbot interface with scroll handling, dark mode, and topic suggestions.

Built for deployment: Modular frontend and backend, ready for production deployment on Render.

Healthy and monitored: Backend includes a /health endpoint for uptime checks.

Tech Stack

Frontend: React (Vite), Tailwind CSS

Backend: Node.js 

Hosting: Render (separate services for frontend and backend)

Environment-aware config: VITE_API_BASE_URL and runtime fallback for ease of local development and production

Quick Start
Prerequisites

Node.js (≥ 18)

npm 

An Azure or Gemini API key and deployment backend

Clone the repo
git clone https://github.com/marycathline/Gemini-chatbot.git
cd Gemini-chatbot

Backend Setup
cd backend
cp .env.example .env  # Add your API keys and config


Backend .env (example):

GEMINI_OPENAI_ENDPOINT=...
GEMINI_OPENAI_API_KEY=...
DEPLOYMENT_NAME=...
PORT=3000
or AZURE_OPENAI
# Optional: set CORS origins if customizing


Run locally:

npm install
npm run dev


Endpoints:

GET /health → service health status

GET /api/providers → available AI providers

POST /api/chat → send chat messages

Frontend Setup
cd frontend
cp .env.example .env  # Provide VITE_API_BASE_URL here


Frontend .env (local example):

VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=30000


Run locally:

npm install
npm run dev

Deploy on Render

Backend service:

Set health check path to /health

No need to expose the root / unless desired

Frontend service:

Add environment variable:

VITE_API_BASE_URL=https://<your-backend-service>.onrender.com


Deploy and confirm Fetch / WebSocket calls route correctly to your backend.

Testing the Integration

Visit the deployed frontend.

Open browser DevTools → Network tab.

Send a message—observe requests going to:

https://<your-backend-service>/api/chat


Backend must return JSON with success, message, and provider/model info.

