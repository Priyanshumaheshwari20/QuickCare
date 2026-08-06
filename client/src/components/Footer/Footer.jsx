import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <footer className="qc-footer">

      <div className="qc-footer-top">

        {/* Image */}
        <div className="qc-footer-image">
          <img
            src="https://plus.unsplash.com/premium_photo-1673953510158-174d4060db8b?q=80&w=687&auto=format&fit=crop"
            alt="QuickCare"
          />
        </div>


        {/* Links */}
        <div className="qc-footer-links">


          {/* Company */}
          <div className="qc-footer-column">

            <h4>Company</h4>

            <Link to="/About">
              <p>About</p>
            </Link>

            <Link to="/">
              <p>Home</p>
            </Link>

            <Link to="/DoctorList">
              <p>Find Doctors</p>
            </Link>

          </div>



          {/* Contact */}
          <div className="qc-footer-column">

            <h4>Contact Us</h4>


            <Link to="/HelpSupport">
              <p>Help & Support</p>
            </Link>


            <Link to="/Privacy">
              <p>Privacy Policy</p>
            </Link>


            <Link to="/contact">
              <p>Contact</p>
            </Link>


          </div>



          {/* Legal */}
          <div className="qc-footer-column">

            <h4>Legal</h4>


            <Link to="/termsandcondition">
              <p>Terms & Conditions</p>
            </Link>


            <Link to="/cookiepolicy">
              <p>Cookie Policy</p>
            </Link>


          </div>



          {/* QuickCare */}
          <div className="qc-footer-column">

            <h4>QuickCare</h4>

            <p>Online Consultation</p>
            <p>Book Appointment</p>
            <p>Secure Healthcare</p>

          </div>


        </div>


      </div>



      <hr />


      <div className="qc-footer-bottom">

        <h5>
          © 2026 QuickCare • Built with ❤️ using MERN STACK
        </h5>

      </div>


    </footer>
  );
}

export default Footer;