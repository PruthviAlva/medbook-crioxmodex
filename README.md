# 🏥 MedBook - Slot Booking System

A full-stack web application to book, view, and manage appointment slots.

---

## 🚀 Features

### Backend
- Create booking slots
- View all slots
- Auto-expire slots after 2 minutes
- REST APIs built with Node.js & Express
- PostgreSQL database

### Frontend
- View available slots
- Book a slot
- Real-time UI updates
- Built with React + TypeScript

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Axios

### Backend
- Node.js
- Express.js
- PostgreSQL

---

## 📂 Project Structure
medbook-crioxmodex/
│
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── db.js
│ └── index.js
│
├── frontend/
│ ├── src/
|   |── pages/
|   |── services/
│   |── App.tsx
│
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo

git clone https://github.com/PruthviAlva/medbook-crioxmodex.git
cd medbook-crioxmodex


---

### 2️⃣ Backend Setup


cd backend
npm install


Create `.env` file:

DATABASE_URL=postgresql://neondb_owner:npg_gSDXAPMGeY45@ep-ancient-pond-adsb6zfx-pooler.c-2.us-east-1.aws.neon.tech/medbook-db?sslmode=require&channel_binding=require
PORT=8081


Run server:

npm start


---

### 3️⃣ Frontend Setup


cd frontend
npm install
npm start


---

## 🔌 API Endpoints

### Create Slot

POST /admin/slots


### Get Slots

GET /slots


### Book Slot

POST /book/:id


---

## ⏱️ Auto Expiry Logic

- Slots expire after **2 minutes**
- Implemented using `setInterval`
- Runs every 30 seconds

---

## 🧪 Testing

- Tested using Postman
- Verified:
  - Slot creation
  - Booking
  - Expiry functionality

---

## 🌟 Future Improvements

- Authentication (JWT)
- Admin dashboard
- Notifications
- Cron-based job scheduling

---

## 👨‍💻 Author

Pruthvi Alva