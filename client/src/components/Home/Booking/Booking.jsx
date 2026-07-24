import React from "react";
import "./Booking.css";
import { FaUserPlus, FaHospital, FaUserMd, FaCalendarAlt,
  FaCheckSquare,
} from "react-icons/fa";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger)


function Booking() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    gsap.from(".booking-section" , {
      y:150,
      opacity:0,
      duration:1,
      scale:0.8,
      stagger:0.5,
      ease:"circ.out",
      scrollTrigger:{
        trigger:".booking-section",
        start: "top 80%",
      toggleActions: "play none none none",

      }
    })
  },[])
  return (
    <section className="booking-section">

      <div className="booking-box">

        <h1 className="booking-heading">
          <span>Booking</span> Made Simple
        </h1>

        <div className="booking-content">

           <div className="booking-image">
            <img           src="https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg"
 alt="" />
          </div> 

          <div className="booking-steps">

            <div className="step">
              <div className="icon active">
                <FaUserPlus />
              </div>

              <div>
                <h3>Register Online</h3>
                <p>Sign up with basic details.</p>
              </div>
            </div>

            <div className="step">
              <div className="icon">
                <FaHospital />
              </div>

              <div>
                <h3>Explore Services</h3>
                <p>Find the right healthcare service.</p>
              </div>
            </div>

            <div className="step">
              <div className="icon">
                <FaUserMd />
              </div>

              <div>
                <h3>Choose a Provider</h3>
                <p>Select your preferred healthcare professional.</p>
              </div>
            </div>

            <div className="step">
              <div className="icon">
                <FaCalendarAlt />
              </div>

              <div>
                <h3>Pick a Time</h3>
                <p>Choose a convenient appointment slot.</p>
              </div>
            </div>

            <div className="step">
              <div className="icon">
                <FaCheckSquare />
              </div>

              <div>
                <h3>Confirm Booking</h3>
                <p>Review and confirm your appointment.</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Booking;