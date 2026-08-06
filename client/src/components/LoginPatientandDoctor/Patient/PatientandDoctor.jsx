import React, { useState } from "react";
import PatientLogin from "./PatientLogin";
import DoctorLogin from "../DoctorLogin";
import Navbar from "../../Home/Navbar/Navbar";
import "../RoleLogin.css";
function RoleLogin() {

  const [loginType, setLoginType] = useState("doctor");

  return (
    <>
      <Navbar/>
      {loginType === "doctor" ? (
        <DoctorLogin changeRole={() => setLoginType("patient")} />
      ) : (
        <PatientLogin changeRole={() => setLoginType("doctor")} />
      )}
    </>
  );
}

export default RoleLogin;