# 🧠 System Design - MedBook Slot Booking System

---

## 📌 Overview

MedBook is a full-stack application that allows users to:
- View available slots
- Book appointments
- Automatically expire unused slots

---

## 🏗️ Architecture

Client-Server Architecture:


Frontend (React)
↓
Backend (Node.js + Express)
↓
Database (PostgreSQL)


---

## 🔧 Components

### 1. Frontend
- Built using React + TypeScript
- Handles UI and API communication
- Displays slot data and booking actions

---

### 2. Backend
- REST API using Express.js
- Handles:
  - Slot creation
  - Booking logic
  - Expiry updates

---

### 3. Database
- PostgreSQL
- Stores slot information

---

## 🗄️ Database Schema

### Slots Table

| Column      | Type      | Description            |
|------------|----------|------------------------|
| id         | UUID     | Primary Key           |
| start_time | TIMESTAMP| Slot start time       |
| end_time   | TIMESTAMP| Slot end time         |
| status     | TEXT     | available/booked/expired |
| created_at | TIMESTAMP| Creation time         |

---

## 🔄 Booking Flow

1. User views available slots
2. User clicks "Book"
3. API updates slot status to "booked"
4. UI refreshes automatically

---

## ⏱️ Expiry Mechanism

- Background job using `setInterval`
- Runs every 30 seconds
- Checks:

if (current_time - created_at > 2 minutes)

- Updates status → `expired`

---

## ⚡ Design Decisions

### Why setInterval?
- Simple and effective for assignment
- Avoids complexity of cron jobs

---

### Why PostgreSQL?
- Relational data structure
- Strong consistency

---

### Why React + TypeScript?
- Type safety
- Component-based architecture

---

## 🚧 Limitations

- No authentication
- No concurrency handling (race conditions possible)
- Not optimized for high-scale

---

## 🚀 Scalability Improvements

- Use Redis for caching
- Replace `setInterval` with cron jobs
- Add message queues (Bull / RabbitMQ)
- Load balancing for backend

---

## 🔐 Security Improvements

- JWT Authentication
- Input validation
- Rate limiting

---

## 📈 Future Enhancements

- Admin panel
- Email/SMS notifications
- Slot reminders
- Payment integration

---

## 📊 Summary

The system is designed to be:
- Simple
- Scalable (with improvements)
- Easy to understand

Suitable for:
- Small to medium booking systems