# 🎨 Referral & Reward System – Frontend

This is the **frontend application** for the **Referral & Reward System**, built using **React + TypeScript**.

It provides:
- User authentication
- User dashboard
- Admin dashboard with reports, leaderboard, and payouts
- CSV & PDF export support

---

## 🚀 Features

### 👤 Authentication
- Login & Signup
- JWT-based authentication
- Refresh-token handling via Axios interceptors
- Logout support

---

### 👥 User Dashboard
- View user details
- View referral code (copyable)
- View total referrals
- View total earnings
- Works for both **NORMAL** and **OMNI** users

---

### 🧑‍💼 Admin Panel  
*(Admin-only access)*

#### 📊 Referral Commission Report
- Search by name or email
- Filter by:
  - User type (NORMAL / OMNI)
  - Minimum earnings
- Pagination
- Export reports:
  - CSV
  - PDF

---

#### 🏆 Leaderboard
- Displays top referrers
- Sorted by total earnings
- Shows rank, referrals, and earnings

---

#### 💸 Payout Management
- View users with pending payouts
- Process payouts
- Real-time UI update after payout

---

## 🛠 Tech Stack
- React
- TypeScript
- React Router
- Axios
- Tailwind CSS
- Zod
- React Hook Form

---

## 🔐 Routing Overview

### Public Routes
- `/login`
- `/signup`

### User Routes
- `/dashboard`

### Admin Routes
- `/admin/referral-report`
- `/admin/payouts`
- `/admin/leaderboard`

Routes are protected using:
- **ProtectedRoute** → authenticated users
- **AdminRoute** → admin-only access

---

## 🔌 API Integration

The frontend communicates with backend APIs using a **centralized Axios instance**.

### Axios Features
- Automatically attaches access token
- Refreshes token on `401 Unauthorized`
- Redirects to login on session expiry

---

Make sure the backend is running on the same base URL.

---

## ▶️ Running the Frontend

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
