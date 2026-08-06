import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaCalendarCheck,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

import "./SideBar.css";


function Sidebar({ open, setOpen, isDashboard }) {


  const navigate = useNavigate();



  const logout = () => {

    localStorage.removeItem("doctorId");
    localStorage.removeItem("doctorName");
    localStorage.removeItem("role");

    navigate("/");

  };



  return (
    <>


      {/* Hamburger - Other Pages */}
      {!isDashboard && (

        <button
          className="hamburger-btn"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      )}



      {/* Overlay */}

      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      ></div>




      {/* Sidebar */}

      <aside
        className={`
          sidebar
          ${!isDashboard ? "collapsed-layout" : ""}
          ${open ? "open" : ""}
        `}
      >



        <div>


          {/* Logo */}

          <div className="sidebar-logo">

            <h2>
              QuickCare
            </h2>

            <p>
              Doctor Panel
            </p>

          </div>




          {/* Menu */}

          <ul className="sidebar-menu">


            <li>

              <NavLink 
                to="/DoctorDashboard"
                onClick={() => setOpen(false)}
              >

                <FaHome />

                Dashboard

              </NavLink>

            </li>





            <li>

              <NavLink
                to="/doctor/view-all-appointments"
                onClick={() => setOpen(false)}
              >

                <FaCalendarCheck />

                Appointments

              </NavLink>

            </li>





            <li>

              <NavLink
                to="/DoctorProfile"
                onClick={() => setOpen(false)}
              >

                <FaUser />

                Profile

              </NavLink>

            </li>





         



          </ul>


        </div>





        {/* Logout */}

        <button
          className="logout-btn"
          onClick={logout}
        >

          <FaSignOutAlt />

          Logout


        </button>



      </aside>



    </>
  );
}


export default Sidebar;