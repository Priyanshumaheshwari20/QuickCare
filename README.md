# 🏥 QuickCare - Healthcare Platform

QuickCare is a full-stack tele-consultation healthcare platform developed using the MERN stack.

The main purpose of this project is to provide a digital healthcare solution where patients can connect with doctors, view doctor profiles, book appointments, and manage their healthcare activities online.

The project consists of two major parts:

1. Client (Frontend Application)
2. Backend (Server Side Application)

---

# 📂 Project Structure

## 📁 Client (Frontend)

The **Client** folder contains the complete frontend application of QuickCare.

The frontend is developed using **React.js** and is responsible for creating an interactive user interface, handling user interactions, managing application routes, and communicating with backend APIs.

### Inside the Client folder:

- Modern and responsive healthcare user interface
- Patient and Doctor authentication
- Home page with healthcare services
- Doctor listing with specialization filtering
- Doctor profile page
- Appointment booking system
- Patient Dashboard
- Doctor Dashboard
- Favourite Doctors feature
- Appointment management
- Online prescription viewing
- Medical document upload
- Protected routes for authenticated users
- API integration using Axios
- Reusable React components with modular folder structure

The frontend is designed to provide a smooth, responsive, and user-friendly healthcare experience across different devices.

---

## 📁 Backend (Server)

The **Backend** folder contains the server-side application of QuickCare.

The backend is developed using **Node.js**, **Express.js**, and **MongoDB**. It handles business logic, authentication, database operations, API development, and secure communication between the frontend and database.

### Inside the Backend folder:

- RESTful API development
- Patient and Doctor authentication using JWT
- MongoDB database integration with Mongoose
- Appointment booking and management APIs
- Prescription management APIs
- Medical document upload using Multer
- Doctor and Patient profile management
- Password encryption using Bcrypt
- Input validation and error handling
- CORS configuration
- Environment variable management using dotenv
- Modular MVC architecture (Models, Routes, Controllers)

The backend ensures secure data management, efficient API responses, and reliable communication between users and the healthcare platform.


# 🚀 How to Run the Project

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Priyanshumaheshwari20/QuickCare.git
```

## 2️⃣ Navigate to the Project Folder

```bash
cd QuickCare
cd client
```

---

## 3️⃣ Start the Backend Server

Open a new terminal:

```bash
cd client
cd Backend
npm install
npm start
```

The backend server will start on:

```
https://quickcare-3.onrender.com
```

---

## 4️⃣ Start the Frontend

Open another terminal:

```bash
cd client
npm install
npm start
```

The frontend will start on:

```
http://localhost:3000
```

---

## 5️⃣ Open the Application

Visit:

```
http://localhost:3000
```

Make sure MongoDB is running and the required `.env` file is configured before starting the backend.
