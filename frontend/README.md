Gemini Chatbot 🤖

An AI-powered chatbot built with React (Vite) on the frontend and Node.js/Express on the backend. It provides an interactive conversational interface, with support for modern API integrations and a clean, responsive UI.

✨ Features

🗣️ Conversational AI — real-time question answering.

⚡ Vite + React frontend for fast performance.

🛠️ Node.js + Express backend with REST API endpoints.

🌍 Deployed on Render (frontend + backend).

🔑 Easy configuration with environment variables.

📂 Project Structure
Gemini-chatbot/
│── frontend/      # Vite React app (UI)
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
│── backend/       # Express server (API logic)
│   ├── routes/
│   ├── models/
│   └── server.js
│
└── README.md

🚀 Getting Started
Prerequisites

Node.js
 (v18 or v20 recommended)

npm or yarn package manager

Clone Repository
git clone https://github.com/marycathline/Gemini-chatbot.git
cd Gemini-chatbot

🔹 Backend Setup
cd backend
npm install
npm start


The server will start at:

http://localhost:3000

🔹 Frontend Setup
cd frontend
npm install
npm run dev


The app will run at:

http://localhost:5173

⚙️ Environment Variables
Backend (/backend/.env)
PORT=3000
API_KEY=your_api_key_here

Frontend (/frontend/.env)
VITE_API_URL=http://localhost:5173


For production (Render deployment), set environment variables via Render Dashboard → Settings → Environment Variables.

📦 Build & Deploy
Frontend
cd frontend
npm run build


Deploy /dist as a Static Site on Render.

Backend

Deploy /backend as a Web Service on Render.

🖼️ Screenshots
Chat Interface

🤝 Contributing

Contributions are welcome!

Fork the repo

Create a new branch (feature/my-feature)

Commit changes

Push and open a Pull Request

