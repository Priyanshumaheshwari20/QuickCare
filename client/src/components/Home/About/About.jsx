import React from "react";
import "./About.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../../Footer/Footer";

function About() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="about-hero">
        <div className="container text-center">
          <h1>About Us</h1>
          <p>Home / About</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section container py-5">

        <div className="row align-items-center">

          {/* Left */}
          <div className="col-lg-6">

            <img
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=900"
              className="img-fluid rounded shadow mb-4"
              alt=""
            />

            <div className="row">

              <div className="col-7">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900"
                  className="img-fluid rounded shadow"
                  alt=""
                />
              </div>

             

            </div>

          </div>

          {/* Right */}

          <div className="col-lg-6">

            <span className="about-tag">
              ABOUT TELECARE
            </span>

            <h2>
              Excellence In Healthcare <br />
              Rooted In Trust.
            </h2>

            <p>
              TeleCare connects patients with certified doctors through
              secure online consultations. Our mission is to provide
              quality healthcare that is accessible anytime and
              anywhere.
            </p>

            <ul className="about-list">
              <li>✔ Trusted & Verified Doctors</li>
              <li>✔ Secure Medical Records</li>
              <li>✔ AI Consultation Summary</li>
              <li>✔ 24/7 Online Support</li>
            </ul>

            <button className="btn btn-primary btn-lg mt-3">
              Learn More
            </button>

          </div>

        </div>
  
<h3  style={{marginTop:"5rem" , color:"gray"  , letterSpacing:"2px"}}> What is QuickCare ?</h3> 
<h4 className="QuickCareAns"> QuickCare is an innovative digital healthcare platform dedicated to transforming the way patients access quality medical services. By bringing together highly qualified healthcare professionals across a wide range of medical specialties, we create a seamless bridge between patients and trusted medical expertise.

Our platform is thoughtfully designed to simplify the healthcare journey—from discovering the right specialist and exploring verified doctor profiles to scheduling appointments with confidence. At QuickCare, we combine technology, trust, and compassionate care to deliver a healthcare experience that is efficient, reliable, and patient-centered.

Whether you're seeking preventive care, specialist consultations, or expert medical guidance, QuickCare ensures that professional healthcare is always accessible, convenient, and just a few clicks away.</h4>
      </section>

      <Footer />
    </>
  );
}

export default About;