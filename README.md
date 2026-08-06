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
http://localhost:5000
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












# 🔄 QuickCare Complete Workflow (Start to End)

## 1. Application Start

When a user opens the QuickCare application, the home page is displayed.  
The application provides two different user roles:

- Patient
- Doctor

Both users have separate dashboards and features according to their roles.


## 2. User Registration

### Patient Registration

Patients can create their account by providing basic information.

After successful registration, patient details are stored securely in the database and the patient can login to access healthcare services.


### Doctor Registration

Doctors can create their professional profile by providing details such as:

- Name
- Specialization
- Qualification
- Experience
- Hospital Details
- Consultation Fee

After registration, doctors can access their dedicated dashboard.


## 3. Login Process

Patients and doctors can login using their registered email and password.

After successful authentication:

- Patients are redirected to the Patient Dashboard.
- Doctors are redirected to the Doctor Dashboard.


## 4. Patient Dashboard Flow

The Patient Dashboard allows patients to manage their healthcare activities.

Patients can:

- View available doctors
- Check doctor profiles
- Search doctors according to specialization
- Book appointments
- View appointment history
- Join online video consultations
- View digital prescriptions


## 5. Doctor Selection and Appointment Booking

Patients can select a doctor based on their requirements.

The appointment process includes:

- Selecting a doctor
- Choosing available date
- Selecting available time slot
- Confirming appointment

After successful booking, the appointment details are stored and displayed on the doctor dashboard.


## 6. Doctor Dashboard Flow

The Doctor Dashboard helps doctors manage their consultations.

Doctors can:

- View upcoming appointments
- Check patient details
- Manage appointments
- Start online consultations
- Create digital prescriptions
- Update profile information


## 7. Video Consultation Flow

QuickCare provides real-time video consultation between doctors and patients.

The video consultation process works as follows:

1. Doctor starts a video call from the dashboard.
2. Patient receives an incoming call notification.
3. Patient accepts the call.
4. Doctor and patient are connected to a secure video room.
5. Both users can communicate through live audio and video.

Video calling is implemented using:

- Agora RTC SDK for real-time audio and video communication.
- Socket.io for real-time call notifications and events.


## 8. Prescription Creation Flow

After completing the consultation, the doctor creates a digital prescription.

Doctor can add:

- Patient symptoms
- Medicines
- Dosage details
- Instructions

The prescription is saved and becomes available for the patient.


## 9. Patient Prescription Flow

Patients can access their prescriptions from the dashboard.

Patients can view:

- Doctor information
- Symptoms
- Medicines
- Dosage instructions
- Prescription details


## 10. Complete Healthcare Journey

The complete QuickCare workflow is:

User Registration  
↓  
Login  
↓  
Doctor Search  
↓  
Appointment Booking  
↓  
Doctor Consultation  
↓  
Video Call  
↓  
Prescription Creation  
↓  
Patient Prescription Access  


QuickCare provides a complete digital healthcare experience where patients can connect with doctors, attend online consultations, and receive digital prescriptions from anywhere.
