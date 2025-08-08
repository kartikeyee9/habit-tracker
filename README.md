# 🧠 Habit Tracker

A beautifully designed full-stack habit tracker built with Next.js 14 (App Router), Tailwind CSS, Prisma, and NextAuth. Track your habits visually with calendars, charts, and a polished UI. Users can securely log in with email and get personalized dashboards.

---

## ✨ Features

- ✅ Email-based login using NextAuth
- 📆 Calendar view to visualize habit completions
- 📊 Bar chart for weekly habit tracking
- 🧩 Modular component structure (Form, List, Chart, etc.)
- 🗃️ Prisma ORM with PostgreSQL
- 🎨 Tailwind CSS styling
- 🔐 Auth-protected pages

---

## 🛠️ Tech Stack

- [Next.js (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Recharts](https://recharts.org/)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/kartikeyee9/habit-tracker.git
cd habit-tracker/frontend
```

### 2. Install Dependencies 
```bash
cd frontend
npm install
```
### 3. Set up environment variables
Create a .env.local file in the /frontend directory: 
```bash
# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3001

# Email Provider (use Ethereal or your SMTP service)
EMAIL_SERVER_USER=your@email.com
EMAIL_SERVER_PASSWORD=your-password
EMAIL_SERVER_HOST=smtp.ethereal.email
EMAIL_SERVER_PORT=587
EMAIL_FROM=your@email.com

# Prisma
DATABASE_URL=your_postgresql_database_url
```
### 4. Set up the database
```bash
npx prisma db push
npx prisma generate
```
To open Prisma Studio: 
```bash
npx prisma studio
```

### 5. Start the app
```bash
npm run dev
```
The app will be running at: 
http://localhost:3001

## Author
Kartikeyee Gurav
