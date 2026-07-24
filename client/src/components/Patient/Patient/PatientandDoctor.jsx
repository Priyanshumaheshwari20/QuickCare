import React, { useState } from "react";
import Navbar from "../../Home/Navbar/Navbar";
import PatientLogin from "./PatientLogin";
import DoctorLogin from "../DoctorLogin";

function RoleLogin() {

  const [loginType, setLoginType] = useState("doctor");

  return (
    <>
      <Navbar />

      {loginType === "doctor" ? (
        <DoctorLogin changeRole={() => setLoginType("patient")} />
      ) : (
        <PatientLogin changeRole={() => setLoginType("doctor")} />
      )}
    </>
  );
}

export default RoleLogin;