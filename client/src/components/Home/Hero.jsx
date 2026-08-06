import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Hero() {

  // Page top par le jane ke liye
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hero Animation
  useGSAP(() => {
    gsap.from(".hero-left", {
      x: -120,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(".hero-right", {
      x: 120,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2,
    });
  });

  return (
    <section className="hero">

      {/* Left Side */}
      <div className="hero-left">

        <span className="badge">
          🩺 Trusted Healthcare Platform
        </span>

        <h1>
          Your Health,
          <br />
          Just One Click Away
        </h1>

        <p>
          Connect with experienced doctors through secure video consultations,
          book appointments online, and receive AI-powered consultation
          summaries from the comfort of your home.
        </p>

        <div className="hero-buttons">

          <Link to="/DoctorList">
            <button className="primary-btn">
              Book Appointment
            </button>
          </Link>

          <button className="secondary-btn">
            Explore More
          </button>

        </div>

        <div className="hero-stats">

          <div className="stat-card">
            <h2>500+</h2>
            <p>Doctors</p>
          </div>

          <div className="stat-card">
            <h2>10K+</h2>
            <p>Patients</p>
          </div>

          <div className="stat-card">
            <h2>24/7</h2>
            <p>Support</p>
          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="hero-right-ladki">

        <img
          src="https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg"
          alt="Doctor"
          className="doctor-image"
        />

      </div>

    </section>
  );
}

export default Hero;