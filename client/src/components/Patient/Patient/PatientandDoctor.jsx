import React, { useState } from "react";
import PatientLogin from "./PatientLogin";
import DoctorLogin from "../DoctorLogin";

function RoleLogin() {

  const [loginType, setLoginType] = useState("doctor");

  return (
    <>

      {loginType === "doctor" ? (
        <DoctorLogin changeRole={() => setLoginType("patient")} />
      ) : (
        <PatientLogin changeRole={() => setLoginType("doctor")} />
      )}
    </>
  );
}

export default RoleLogin;