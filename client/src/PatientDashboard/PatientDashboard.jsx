import React from "react";
import PatientSidebar from "./PatientSidebar/PatientSidebar";
import Header from "./Header/Header";
import StatsCards from "./StatsCards/StatsCards";
import AppointmentTable from "./AppointmentTable/AppointmentTable";
import PrescriptionList from "./PrescriptionList/PrescriptionList";
import ProfileCard from "./ProfileCard/ProfileCard";

import "./PatientDashboard.css";

function PatientDashboard(){

return(

<div className="patient-dashboard">

<PatientSidebar/>

<div className="patient-main">

<Header/>

<StatsCards/>


<div className="patient-grid">

<div className="left-section">

<AppointmentTable/>

<PrescriptionList/>

</div>


<div className="right-section">

<ProfileCard/>

</div>


</div>


</div>


</div>

);

}

export default PatientDashboard;