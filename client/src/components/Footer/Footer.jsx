import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container-fluid footer">
        <div className="footer-top">
          {/* Left Image */}
          <div className="footer-image">
            <img
              src="https://plus.unsplash.com/premium_photo-1673953510158-174d4060db8b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Food Delivery"
            />
          </div>

          {/* Right Content */}
          <div className="footer-links">
            {/* Company */}
            <div>
              <h4>Company</h4>

              <Link to="/About">
                <p>About</p>
                <p> Blogs</p>
                <p> Minis</p>
              </Link>



              <Link to="/">
                <p>Home</p>
              </Link>

              <p>Minis</p>
            </div>

            {/* Contact */}
            <div>
              <div>
                <h4>Contact Us</h4>

                <Link to="/HelpSupport">
                  <p>Help & Support</p>
                </Link>

                <Link to="/Privacy">
                  <p>Privacy Policy</p>
                </Link>

                <p>Ride with us</p>
              </div>

              <div className="legal">
                <h4>Legal</h4>

                <Link to="/termsandcondition">
                  <p>Terms & Conditions</p>
                </Link>

                <Link to="/cookiepolicy">
                  <p>Cookie Policy</p>
                </Link>
              </div>
            </div>

    
           

            {/* QuickBite */}
          
          </div>
        </div>

        <hr />

        <div className="footer-bottom">
          <h5>© 2026 QuickCare • Built with ❤️ using MERN STACK</h5>
        </div>
      </div>
    </>
  );
}

export default Footer;