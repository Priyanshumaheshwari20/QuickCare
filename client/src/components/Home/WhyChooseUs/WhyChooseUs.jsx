import React, { useEffect } from "react";
import "./WhyChooseUs.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function WhyChooseUs() {

  useEffect(() => {

    gsap.from(".why-choose-us", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",

      scrollTrigger: {
        trigger: ".why-choose-us",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

  }, []);

  return (
    <section className="why-choose-us">

      <p className="section-tag">WHY CHOOSE US</p>

      <h1 className="section-title">
        Why Patients Trust Our Platform
      </h1>

      <div className="choose-container">

        <div className="choose-card">
          <div className="icon">👨‍⚕️</div>

          <h3>Verified Doctors</h3>

          <p>
            Consult experienced and verified specialists from trusted hospitals.
          </p>
        </div>

        <div className="choose-card">
          <div className="icon">📹</div>

          <h3>Secure Video Consultation</h3>

          <p>
            HD quality online consultation with complete privacy and security.
          </p>
        </div>

        <div className="choose-card">
          <div className="icon">🤖</div>

          <h3>AI Consultation Summary</h3>

          <p>
            Automatically receive AI-generated consultation notes and advice.
          </p>
        </div>

        <div className="choose-card">
          <div className="icon">📄</div>

          <h3>Medical Report Upload</h3>

          <p>
            Upload prescriptions and reports before your appointment.
          </p>
        </div>

        <div className="choose-card">
          <div className="icon">🛡️</div>

          <h3>100% Secure Data</h3>

          <p>
            Your medical information is protected using secure encryption.
          </p>
        </div>

        <div className="choose-card">
          <div className="icon">⏰</div>

          <h3>24/7 Support</h3>

          <p>
            Our support team is always available whenever you need assistance.
          </p>
        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;