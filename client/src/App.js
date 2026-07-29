import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/Home";
import DoctorSignup from "./components/Home/AddDoctor/AddDoctor";
import DoctorList from "./components/Doctor/DoctorList";
import DoctorDetails from "./components/DoctorDetails/DoctorDetails";
import About from "./components/Home/About/About";
import SelectRole from "./components/SelectRole/SelectRole";
import PatientSignup from "./components/Patient/PatientSignup";
import RoleLogin from "./components/Patient/Patient/PatientandDoctor";
import MyAppointments from "./components/MyAppointments/MyAppointments";
import MyProfile from "./components/MyProfile/MyProfile";
import DoctorDashboard from "./DoctorDashBoard/│      DoctorDashboard";
import PrescriptionPage from "./DoctorDashBoard/Prescription/PrescriptionPage";
import PatientDashboard from "./PatientDashboard/PatientDashboard";
import MyPrescription from "./PatientDashboard/MyPrescription/MyPrescription";
import FavouriteDoctors from "./components/FavouriteDoctors/FavouriteDoctors";
import VideoCall from "./VideoCall/VideoCall"
import CallingScreen from "./DoctorCalling/CallingScreen";
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />

      <Routes>
        <Route path="/" element={<Home />} />


        <Route path="/DoctorSignup" element={<DoctorSignup />} />

        <Route path="/DoctorList" element={<DoctorList />} />

        <Route path="/DoctorDetails/:id" element={<DoctorDetails />} />

        <Route path="/About" element={<About />} />

        <Route path="/SelectRole" element={<SelectRole />} />

        <Route path="/patient-signup" element={<PatientSignup />} />

<Route path="/login" element={<RoleLogin />} />
        <Route path="/myappointments" element={<MyAppointments />} />

        <Route path="/MyProfile" element={<MyProfile />} />

        <Route path="/DoctorDashboard" element={<DoctorDashboard />} />

        <Route path="/prescription" element={<PrescriptionPage />} />


<Route path="/PatientDashboard"element={<PatientDashboard/>}/>
<Route
path="/MyPrescription"
element={<MyPrescription/>}
/>


<Route path="/PatientDashboard" element={<PatientDashboard />} />

<Route path="/MyAppointments" element={<MyAppointments />} />

<Route path="/MyProfile" element={<MyProfile />} />

<Route path="/MyPrescription" element={<MyPrescription />} />
  <Route path="/favourites" element={<FavouriteDoctors />} />
<Route path="/video/:appointmentId" element={<VideoCall />} />
<Route
path="/calling/:appointmentId"
element={<CallingScreen/>}
/>


<Route
  path="/prescription/:appointmentId"
  element={<PrescriptionPage />}
/>
      </Routes>
    </>
  );
}


export default App;