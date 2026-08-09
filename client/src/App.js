import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IncomingCallListener from "./Socket/IncomingCallListener";
import Home from "./components/Home/Home";
import DoctorSignup from "./components/Home/AddDoctor/AddDoctor";
import DoctorList from "./components/Doctor/DoctorList";
import DoctorDetails from "./components/DoctorDetails/DoctorDetails";
import About from "./components/Home/About/About";
import SelectRole from "./components/SelectRole/SelectRole";

import PatientSignup from "./components/LoginPatientandDoctor/PatientSignup";
import RoleLogin from "./components/LoginPatientandDoctor/Patient/PatientandDoctor";

import MyAppointments from "./components/MyAppointments/MyAppointments";
import MyProfile from "./DoctorDashBoard/MyProfile/MyProfile";

import DoctorDashboard from "./DoctorDashBoard/DoctorDashboard";
import PrescriptionPage from "./DoctorDashBoard/Prescription/PrescriptionPage";

import PatientDashboard from "./PatientDashboard/PatientDashboard";
import MyPrescription from "./PatientDashboard/MyPrescription/MyPrescription";

import FavouriteDoctors from "./components/FavouriteDoctors/FavouriteDoctors";

import VideoCall from "./VideoCall/VideoCall";
import CallingScreen from "./DoctorCalling/CallingScreen";

import ViewAllAppointment from "./DoctorDashBoard/ViewAllAppointment/ViewAllAppointment";
import ViewAppointment from "./PatientDashboard/PatientSidebar/ViewAppointment/ViewAppointment";

import MedicalHistory from "./DoctorDashBoard/MedicalHistory/MedicalHistory";
import ProfileCard from "./PatientDashboard/ProfileCard/ProfileCard";


function App() {

  return (
    <>
    <IncomingCallListener/>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/DoctorSignup" element={<DoctorSignup />} />

        <Route path="/DoctorList" element={<DoctorList />} />

        <Route 
          path="/DoctorDetails/:id" 
          element={<DoctorDetails />} 
        />

        <Route path="/About" element={<About />} />

        <Route path="/SelectRole" element={<SelectRole />} />


        {/* Authentication */}
        <Route 
          path="/patient-signup" 
          element={<PatientSignup />} 
        />

        <Route 
          path="/login" 
          element={<RoleLogin />} 
        />


        {/* Patient */}
        <Route 
          path="/PatientDashboard" 
          element={<PatientDashboard />} 
        />

        <Route 
          path="/PatientProfile" 
          element={<ProfileCard />} 
        />

        <Route 
          path="/myappointments" 
          element={<MyAppointments />} 
        />

        <Route 
          path="/MyAppointments" 
          element={<MyAppointments />} 
        />

        <Route 
          path="/MyPrescription" 
          element={<MyPrescription />} 
        />


        {/* Doctor */}
        <Route 
          path="/DoctorDashboard" 
          element={<DoctorDashboard />} 
        />

        <Route 
          path="/DoctorProfile" 
          element={<MyProfile />} 
        />

        <Route 
          path="/MyProfile" 
          element={<MyProfile />} 
        />

        <Route 
          path="/prescription" 
          element={<PrescriptionPage />} 
        />

        <Route 
          path="/prescription/:appointmentId" 
          element={<PrescriptionPage />} 
        />

        <Route 
          path="/doctor/view-all-appointments" 
          element={<ViewAllAppointment />} 
        />

        <Route 
          path="/medical-history/:patientId" 
          element={<MedicalHistory />} 
        />


        {/* Other */}
        <Route 
          path="/favourites" 
          element={<FavouriteDoctors />} 
        />


        {/* Video Call */}
        <Route 
          path="/video/:appointmentId" 
          element={<VideoCall />} 
        />

        <Route 
          path="/calling/:appointmentId" 
          element={<CallingScreen />} 
        />


        {/* Patient Appointment View */}
        <Route 
          path="/view-appointment" 
          element={<ViewAppointment />} 
        />


      </Routes>
    </>
  );
}


export default App;