import React, { useEffect } from "react";
import "../Service/Service.css"
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const navigate = useNavigate()

  useEffect(() => {

    gsap.from(".services", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.25,
      ease: "power3.out",

      scrollTrigger: {
        trigger: ".services",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

  }, []);

  return (
    <>
      <section className="services">

        <h1   
          style={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: "5rem",
          }}
        >
          Our Services
        </h1>

        <div className="container py-5">
          <div className="row g-4">

            <div className="col-md-4">
              <div className="service-card card h-100 shadow border-0 rounded-4 p-3">
                <div  onClick={()=> navigate("/MyAppointments")}className="card-body text-center">
                  <h1>📅</h1>
                  <h4  >Appointment Booking</h4>
                  <p>Book appointments with experienced doctors in seconds.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="service-card card h-100 shadow border-0 rounded-4 p-3">
                <div className="card-body text-center">
                  <h1>📹</h1>
                  <h4>Video Consultation</h4>
                  <p>Consult doctors through secure HD video calls.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="service-card card h-100 shadow border-0 rounded-4 p-3">
                <div className="card-body text-center">
                  <h1>🤖</h1>
                  <h4>AI Transcription</h4>
                  <p>Automatically convert doctor-patient conversations into text.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4"  onClick={()=> navigate("/MyPrescription")}>
              <div className="service-card card h-100 shadow border-0 rounded-4 p-3">
                <div className="card-body text-center">
                  <h1>📄</h1>
                  <h4>Medical Report Upload</h4>
                  <p>Securely upload prescriptions, lab reports, and medical images.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="service-card card h-100 shadow border-0 rounded-4 p-3">
                <div className="card-body text-center">
                  <h1>📝</h1>
                  <h4>AI Consultation Summary</h4>
                  <p>Receive AI-generated summaries with diagnosis and recommendations.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="service-card card h-100 shadow border-0 rounded-4 p-3">
                <div className="card-body text-center">
                  <h1>📚</h1>
                  <h4>Consultation History</h4>
                  <p>Access previous appointments, transcripts and shared documents anytime.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>
    </>
  );
}

export default Services;